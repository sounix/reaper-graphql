import db from "../SQL/bin";

export interface ISuc {
	suc: "vc" | "zr" | "ou" | "jl";
}

export interface ILastDB {
	name: string;
}

export interface IValuesofConfDb {
	name: string;
	suc: string;
	port: number;
	user: string;
	pwd: string;
	database: string;
	remote: string;
	local: string;
	tienda: number;
	almacen: number;
  }
export interface INewConnDb {
	_Almacen: number;
	_Tienda: number;
	neW: db;
}
