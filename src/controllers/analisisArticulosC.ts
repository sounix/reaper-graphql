
import moment from "moment";
import newQuery from "../SQL/dinamicConn";
import getVentaSubfamilia from "./src/get_venta_subfamilia";
import getDbNameforClosing from "./src/get_select_db_of_closing";
import { ISuc, ILastDB } from "./Interfaces";

/**
 *
 * @param { object } obj
 * @param { suc: string } args
 * @param context
 * @param info
 */

async function getPreviousDetailVenta(obj: any, { suc }: ISuc, context: any, info: any) {
	if (suc === "vc" || "zr" || "ou" || "jl" || "bo") {
		if (moment().month() === moment("20171001").month() &&
			suc === "jl" && moment("20171001").year() === moment().year() - 1) {
			try {
				// getVentaSubfamilia(type,sucursal,db,year)
				return await getVentaSubfamilia("remote", suc, "JALTIPAN2", 1, -1);
			} catch (e) {
				throw new Error(`${e}`);
			}
		} else {
			try {
				const lastDB = await getDbNameforClosing("201808", "remote", suc);
				const nameLastDb: ILastDB = lastDB[0];
				return await getVentaSubfamilia("remote", suc, nameLastDb.name, undefined, -1);
			} catch (e) {
				throw new Error(`analisisArticulos: \n ${e}`);
			}
		}
	} else {
		throw new Error("Solo se aceptan valores como los sig: vc | zr | ou | jl | bo ");
	}
}

async function getLatestDetailVenta(obj: any, { suc }: ISuc, context: any, info: any) {
	if (suc === "zr" || "vc" || "ou" || "jl") {
		try {
			return await getVentaSubfamilia("remote", suc);
		} catch (e) {
			throw new Error(`latestDetailVenta: \n ${e}`);
		}
	} else {
		throw new Error(`latestDetailVenta: \n`);
	}
}

async function getAllArticulos() {
	const _SQLQUERY: string = `
        SELECT Articulo
          ,Nombre
          ,Descripcion
          ,Relacion = '['+ CAST(CAST(FactorCompra AS INT) AS VARCHAR) + UnidadCompra + ' / '
            + CAST(CAST(FactorVenta AS INT) AS VARCHAR) + UnidadVenta +']'
        FROM Articulos
      `;
	try {
		const { neW } = await newQuery("remote", "bo");
		return await neW.rawQuery(_SQLQUERY);
	} catch (e) {
		throw new Error(`getAllArticulos:\n \t ${e}`);
	}
}

export {
	getAllArticulos,
	getPreviousDetailVenta,
	getLatestDetailVenta,
};
