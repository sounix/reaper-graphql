
import db from "../SQL/bin";
import conf from "../SQL/confWincaja";

async function proveedorAddCompra(obj: any, args: any) {
	const { cuenta, nombre, rfc } = args;
	const _SQLQUERY = `
		INSERT INTO Proveedores
			(Num_Cta,Proveedor,RFC,Direccion,Telefono,Email)
		VALUES ('${cuenta.replace(/-/g, "").substring(0, 10).concat("0000000000", "3")}','${nombre}','${rfc}','','','')
	`;
	try {
		const _CONF = conf.SPACOMPRAS;
		const _MSSQL = new db(_CONF.host, _CONF.database, _CONF.user, _CONF.pwd, _CONF.port);
		const _PROVEEDOR = await _MSSQL.rawInsert(_SQLQUERY);
		return 0;
	} catch (e) {
		throw new Error(`proveedorAddCompra: \n ${e}`);
	}
}

async function proveedorAddBitacora(obj: any, args: any) {
	const { cuenta, nombre, rfc } = args;
	const _SQLQUERY = `
		INSERT INTO BitacoraDigital.Proveedores
			(Cuenta,Proveedor,RFC,Direccion,Telefono,Email)
		VALUES ('${cuenta.replace(/-/g, "").substring(0, 10).concat("0000000000", "3")}','${nombre}','${rfc}','','','')
	`;
	try {
		const _CONF = conf.SPABITACORA;
		const _MSSQL = new db(_CONF.host, _CONF.database, _CONF.user, _CONF.pwd, _CONF.port);
		const _PROVEEDOR = await _MSSQL.rawInsert(_SQLQUERY);
		return 0;
	} catch (e) {
		throw new Error(`proveedorAddCompra: \n ${e}`);
	}
}

async function proveedorAddWincaja(obj: any, args: any) {
	const { Origen, Proveedor } = args.insert;

	const _SQLQUERY = `
		INSERT INTO Proveedores
			(Proveedor,Nombre,RFC,Representante)
		VALUES ('${Proveedor.cuenta}','${Proveedor.nombre}','${Proveedor.rfc}','${Proveedor.nombre}')
	`;
	try {
		let _CONF;
		switch (Origen) {
			case "WINCAJA_BO":
				_CONF = conf.SPABODEGA;
				break;
			case "WINCAJA_ZR":
				_CONF = conf.SPAZARAGOZA;
				break;
			case "WINCAJA_VC":
				_CONF = conf.SPAVICTORIA;
				break;
			case "WINCAJA_OU":
				_CONF = conf.SPAOLUTA;
				break;
			case "WINCAJA_JL":
				_CONF = conf.SPAJALTIPAN;
				break;
			default:
				_CONF = conf.SPABODEGA;
		}
		const _MSSQL = new db(_CONF.host, _CONF.database, _CONF.user, _CONF.pwd, _CONF.port);
		const _PROVEEDOR = await _MSSQL.rawInsert(_SQLQUERY);
		return 0;
	} catch (e) {
		throw new Error(`proveedorAddWincaja: \n ${e}`);
	}
}

async function proveedoresAll(obj: any, args: any) {
	const { where } = args;

	switch (where.Origen) {
		case "COMPRAS":
			return await ComprasOrigen(args);
		case "BITACORA":
			return BitacoraOrigen(args);
		case "WINCAJA_BO":
			return WincajaOrigen(args, "BO");
		case "WINCAJA_ZR":
			return WincajaOrigen(args, "ZR");
		case "WINCAJA_VC":
			return WincajaOrigen(args, "VC");
		case "WINCAJA_OU":
			return WincajaOrigen(args, "OU");
		case "WINCAJA_JL":
			return WincajaOrigen(args, "JL");
		default:
			return ComprasOrigen(args);
	}
}

async function ComprasOrigen(args: any) {
	const { where, orderBy } = args;
	let _SQLQUERY: string = `
		SELECT
			Cuenta = Num_Cta, Nombre = Proveedor, RFC
		FROM Proveedores
	`;

	if (where.Cuenta) {
		const valor = where.Cuenta.replace(/-/g, "").substring(0, 10).concat("0000000000", "3");
		_SQLQUERY += ` WHERE Num_Cta = '${valor}'`;
	}

	try {
		const _CONF = conf.SPACOMPRAS;
		const _MSSQL = new db(_CONF.host, _CONF.database, _CONF.user, _CONF.pwd, _CONF.port);
		const _PROVEEDORES = await _MSSQL.rawQuery(_SQLQUERY);
		return {
			count: _PROVEEDORES.length,
			// tslint:disable-next-line:object-literal-sort-keys
			Proveedores: _PROVEEDORES,
		};
	} catch (e) {
		throw new Error(`ComprasOrigen: \n ${e}`);
	}
}

async function BitacoraOrigen(args: any) {
	const { where, orderBy } = args;
	let _SQLQUERY: string = `
		SELECT
			Cuenta, Nombre = Proveedor, RFC
		FROM BitacoraDigital.Proveedores
	`;

	if (where.Cuenta) {
		const valor = where.Cuenta.replace(/-/g, "").substring(0, 10).concat("0000000000", "3");
		_SQLQUERY += ` WHERE Cuenta = '${valor}'`;
	}

	try {
		const _CONF = conf.SPABITACORA;
		const _MSSQL = new db(_CONF.host, _CONF.database, _CONF.user, _CONF.pwd, _CONF.port);
		const _PROVEEDORES = await _MSSQL.rawQuery(_SQLQUERY);
		return {
			count: _PROVEEDORES.length,
			// tslint:disable-next-line:object-literal-sort-keys
			Proveedores: _PROVEEDORES,
		};
	} catch (e) {
		throw new Error(`ComprasOrigen: \n ${e}`);
	}
}

async function WincajaOrigen(args: any, suc: string) {
	const { where, orderBy } = args;
	let _SQLQUERY: string = `
		SELECT
			Cuenta = Proveedor, Nombre, RFC
		FROM Proveedores
	`;

	if (where.Cuenta) {
		const valor = where.Cuenta;
		_SQLQUERY += ` WHERE Proveedor = '${valor}'`;
	}

	try {
		let _CONF;
		switch (suc) {
			case "BO":
				_CONF = conf.SPABODEGA;
				break;
			case "ZR":
				_CONF = conf.SPAZARAGOZA;
				break;
			case "VC":
				_CONF = conf.SPAVICTORIA;
				break;
			case "OU":
				_CONF = conf.SPAOLUTA;
				break;
			case "JL":
				_CONF = conf.SPAJALTIPAN;
				break;
			default:
				_CONF = conf.SPABODEGA;
				break;
		}
		const _MSSQL = new db(_CONF.host, _CONF.database, _CONF.user, _CONF.pwd, _CONF.port);
		const _PROVEEDORES = await _MSSQL.rawQuery(_SQLQUERY);
		return {
			count: _PROVEEDORES.length,
			// tslint:disable-next-line:object-literal-sort-keys
			Proveedores: _PROVEEDORES,
		};
	} catch (e) {
		throw new Error(`ComprasOrigen: \n ${e}`);
	}
}

function ProveedoresOrderBy(orderBy: any) {
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

export {
	proveedoresAll,
	proveedorAddCompra,
	proveedorAddBitacora,
	proveedorAddWincaja,
};
