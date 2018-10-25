
import AimLatestSale from "./src/get_aim_latest_sale";
import moment from "moment";
import { Tsuc } from "./TSTypes";

async function getMetadelDia ( obj: any, { suc }: { suc: Tsuc }, context: any, info: any ): Promise<number> { 
    return await AimLatestSale(suc);
}

async function getAimDayofPreviousYear(obj: any, { suc }: {suc: Tsuc }, context: any, info: any): Promise<number> {
    if(moment().month() === moment("20171001").month() && suc === "jl" && moment().year() - 1 === moment("20171001").year()) {
        return await AimLatestSale(suc, -1,"JALTIPAN2");
    } else {
        return await AimLatestSale(suc, -1);
    }
}

export {
    getMetadelDia,
    getAimDayofPreviousYear,
}
