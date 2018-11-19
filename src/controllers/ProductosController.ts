
import db from "../SQL/bin";
import conf from "../SQL/conf";

async function productosAll(obj: any, args: any) {
	const { where, orderBy } = args;
	let _SQLQUERY: string = productosQueryBase();

	_SQLQUERY += productosWhere(where);
	_SQLQUERY += productosOrderBy(orderBy);

	try {
		const _BODEGA = conf[1];
		const _MSSQL = new db(_BODEGA.local, _BODEGA.database, _BODEGA.user, _BODEGA.pwd, _BODEGA.port);
		const _PRODUCTOS = await _MSSQL.rawQuery(_SQLQUERY);
		return {
			count: _PRODUCTOS.length,
			// tslint:disable-next-line:object-literal-sort-keys
			Articulos: _PRODUCTOS,
		};
	} catch (e) {
		throw new Error(`productosAll: \n ${e}`);
	}
}

function productosQueryBase() {
	return `
		SELECT TOP 1000
			Articulo,
			CodigoBarras,
			Nombre,
			Descripcion,
			Relacion =
				CAST(CAST(FactorCompra AS INT) AS NVARCHAR) + '/' + UnidadCompra
				+ ' - ' + CAST(CAST(FactorVenta AS INT) AS NVARCHAR) + '/' + UnidadVenta,
			href = ''
		FROM Articulos
	`;
}

function productosWhere(where: any) {
	if (where) {
		if (where.Articulo) {
			return ` WHERE Articulo = '${where.Articulo}'`;
		}
		if (where.Articulo_in) {
			return ` WHERE Articulo IN (${where.Articulo_in})`;
		}
		if (where.CodigoBarras) {
			return ` WHERE CodigoBarras = '${where.CodigoBarras}'`;
		}
		if (where.CodigoBarras_in) {
			return ` WHERE CodigoBarras IN (${where.CodigoBarras_in})`;
		}
		if (where.Nombre) {
			return ` WHERE Nombre = '${where.Nombre}'`;
		}
		if (where.Nombre_like) {
			return ` WHERE Nombre LIKE '${where.Nombre_like}'`;
		}
	}
}

function productosOrderBy(orderBy: any) {
	if (orderBy) {
		switch (orderBy) {
			case "Articulo_ASC":
				return ` ORDER BY Articulo ASC`;
			case "Articulo_DESC":
				return ` ORDER BY Articulo DESC`;
			case "Nombre_ASC":
				return ` ORDER BY Nombre ASC `;
			case "Nombre_DESC":
				return ` ORDER BY Nombre DESC`;
			default:
				return ` ORDER BY Articulo ASC`;
		}
	} else {
		return ` ORDER BY Articulo ASC`;
	}
}

export default productosAll;
