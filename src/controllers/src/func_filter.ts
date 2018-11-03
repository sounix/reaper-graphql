
/**
 *
 * @param input String de entrada para el filtrado
 * @param data Array de objetos
 * @param nameIndex Indice de los objetos para realizar el filtrado
 */

export const FILTER_ARRAY_OBJECTS = (input: string, data: object[], nameIndex: string) => {
	return data.filter((el: any) => el[`${nameIndex}`].toLowerCase().indexOf(input.toLowerCase()) > -1);
};

export const FILTER_SIMPLE_ARRAY = (input: string, data: []) => {
	data.filter((el: string | number) => {
		if (typeof el === "string") {
			return el.toLowerCase().indexOf(input.toLowerCase()) > - 1;
		} else if (typeof el === "number") {
			return el.toString().toLowerCase().indexOf(input.toString().toLowerCase()) > -1;
		} else {
			throw new Error("No se ha ingresado un tipo valido: Number or String");
		}
	});
};
