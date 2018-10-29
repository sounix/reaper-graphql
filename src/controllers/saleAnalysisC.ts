
import moment from "moment";
import getVentaSubfamilia from "./src/get_venta_subfamilia";
import getDbNameforClosing from "./src/get_select_db_of_closing";
import { ISuc, ILastDB } from "./TSInterfaces";

/**
 *
 * @param { object } obj
 * @param { suc: string } args
 * @param context
 * @param info
 */
async function getPreviousDetailVenta(obj: any, { suc }: ISuc, context: any, info: any) {
	if (suc === "vc" || "zr" || "ou" || "jl" || "bo") {
		try {
			const lastDB = await getDbNameforClosing("201808", "remote", suc);
			const nameLastDb: ILastDB = lastDB[0];
			return await getVentaSubfamilia("remote", suc, nameLastDb.name, undefined, -1);
		} catch (e) {
			throw new Error(`analisisArticulos: \n ${e}`);
		}
	} else {
		throw new Error("Solo se aceptan valores como los sig: vc | zr | ou | jl | bo ");
	}
}

/**
 * 
 * @param obj
 * @param param1
 * @param context
 * @param info
 */
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

export {
	getPreviousDetailVenta,
	getLatestDetailVenta,
};
