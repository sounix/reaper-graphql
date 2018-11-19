
import db from "../SQL/bin";
import conf from "../SQL/conf";

async function ventaTiempoAireAll(obj: any, args: any) {
	const { where, orderBy } = args;
	let _SQLQUERY: string = ventaTiempoAireQueryBase(where);

	_SQLQUERY += ventaTiempoAireOrderBy(orderBy);

	try {
		const _BODEGA = conf[1];
		const _MSSQL = new db(_BODEGA.local, _BODEGA.database, _BODEGA.user, _BODEGA.pwd, _BODEGA.port);
		const _TIPOS = await _MSSQL.rawQuery(_SQLQUERY);
		return {
			total: ventaTiempoAireTotal(_TIPOS),
			// tslint:disable-next-line:object-literal-sort-keys
			Tipos: _TIPOS,
		};
	} catch (e) {
		throw new Error(`ventaTiempoAireAll: \n ${e}`);
	}
}

function ventaTiempoAireQueryBase(where: any) {
	const { FechaInicio, FechaFinal } = where;
	return `
        SELECT
            Fecha,Articulo,Nombre,Precio = PrecioNeto,Cantidad = COUNT(*),VentaNeta = SUM(VentaValorNeta)
        FROM QVDEMovAlmacen
        WHERE TipoDocumento = 'V' AND Estatus = 'E'
            AND (Fecha BETWEEN CAST('${FechaInicio}' AS DATETIME) AND CAST('${FechaFinal}' AS DATETIME))
            AND Subfamilia = 'SRecargas'
        GROUP BY Fecha,Articulo,Nombre,PrecioNeto
	`;
}

function ventaTiempoAireTotal(_TIPOS: any) {
	let total = 0.00;
	_TIPOS.map((item: any) => {
		total += item.VentaNeta;
	});
	return total;
}

function ventaTiempoAireOrderBy(orderBy: any) {
	if (orderBy) {
		switch (orderBy) {
			case "Fecha_ASC":
				return ` ORDER BY Fecha ASC`;
			case "Fecha_DESC":
				return ` ORDER BY Fecha DESC`;
			case "Cantidad_ASC":
				return ` ORDER BY Cantidad ASC`;
			case "Cantidad_DESC":
				return ` ORDER BY Cantidad DESC`;
			case "VentaNeta_ASC":
				return ` ORDER BY VentaNeta ASC `;
			case "VentaNeta_DESC":
				return ` ORDER BY VentaNeta DESC`;
			default:
				return ` ORDER BY Fecha ASC`;
		}
	} else {
		return ` ORDER BY Fecha ASC`;
	}
}

export default ventaTiempoAireAll;
