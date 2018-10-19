import { Tsuc } from "../Types";
import newQuery from "../../SQL/dinamicConn";

export default async function getMetaDeHoy({ suc }:{ suc: Tsuc }, year?: number, database?: string) {
	const {  } = await newQuery("remote",suc, database)
	const _SQLQUERY: string = `
		SELECT
			((SUM(VentaValorNeta)/6.8) + SUM(VentaValorNeta)) TOTAL FROM dbo.QVDEMovAlmacen
		WHERE TipoDocumento = 'V' AND Estatus = 'E'	/* add search conditions here */
		AND CONVERT(DATE, Fecha) = CAST(DATEADD(YEAR,-1, GETDATE()) AS DATE)
		GO
	`;
	//	TODO
}
