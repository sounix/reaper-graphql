import { Tsuc } from "../TSTypes";
import newQuery from "../../SQL/dinamicConn";
/**
 * 
 * @param suc especificar sucursal
 * @param i_d_year incrementar o decrementar años por defecto sera 0 ¡opcional!
 * @param database base de datos ¡opcional!
 */
export default async function getAimLatestSale(suc: Tsuc, i_d_year?: number | 0, database?: string) {
	const { neW } = await newQuery("remote",suc, database)
	const _SQLQUERY: string = `
		SELECT
			((SUM(VentaValorNeta)/6.8) + SUM(VentaValorNeta)) TOTAL FROM dbo.QVDEMovAlmacen
		WHERE TipoDocumento = 'V' AND Estatus = 'E'	/* add search conditions here */
		AND CONVERT(DATE, Fecha) = CAST(DATEADD(YEAR,${i_d_year}, GETDATE()) AS DATE)
		GO
	`;
	return await neW.rawQuery(_SQLQUERY);
}
 