import AimLatestSale from "./src/get_aim_latest_sale";
import { Tsuc } from "./TSTypes";

export default async function getMetadelDia ( obj: any, { suc }: { suc: Tsuc }, context: any, info: any ) {
    const _result_ = await AimLatestSale(suc);
    console.log(_result_);
    return _result_;
}
