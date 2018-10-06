
interface ILabelledValue {
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

const confExport: ILabelledValue[] = [
  {
    name: "bodega",
    suc: "BO",
    // tslint:disable-next-line:object-literal-sort-keys
    port: 1433,
    user: "sa",
    pwd: "wincaja",
    database: "SPABODEGA",
    remote: "SPABODEGA.DYNDNS.ORG",
    local: "192.168.1.212",
    tienda: 6,
    almacen: 21,
  },
  {
    name: "zaragoza",
    suc: "ZR",
    // tslint:disable-next-line:object-literal-sort-keys
    port: 1433,
    user: "sa",
    pwd: "wincaja",
    database: "SPASUPER1",
    remote: "SPASUPERUNO.DYNDNS.ORG",
    local: "192.168.123.100",
    tienda: 1,
    almacen: 2,
  },
  {
    name: "victoria",
    suc: "VC",
    // tslint:disable-next-line:object-literal-sort-keys
    port: 1433,
    user: "sa",
    pwd: "wincaja",
    database: "SPACENTRO",
    remote: "SPACENTRO.DYNDNS.ORG",
    local: "192.168.123.100",
    tienda: 2,
    almacen: 3,
  },
  {
    name: "oluta",
    suc: "OU",
    // tslint:disable-next-line:object-literal-sort-keys
    port: 1433,
    user: "sa",
    pwd: "wincaja",
    database: "SPAOLUTA",
    remote: "SPAOLUTA.DYNDNS.ORG",
    local: "192.168.123.100",
    tienda: 5,
    almacen: 19,
  },
  {
    name: "jaltipan",
    suc: "JL",
    // tslint:disable-next-line:object-literal-sort-keys
    port: 1433,
    user: "sa",
    pwd: "wincaja",
    database: "SPAJALTIPAN",
    remote: "SPAJALTIPAN.DYNDNS.ORG",
    local: "192.168.123.100",
    tienda: 4,
    almacen: 7,
  },
];

export default confExport;
