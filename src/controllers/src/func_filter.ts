
/** 
*
*   @param input_ask cadena de caracteres para filtar
*   @param data array de objetos para filtrar
*   @param nameIndex nombre del indice donde se hara la busqueda
*/
export const filter_array_objects = (input_ask: string, data: any, nameIndex: string ) => {
    data.filter((el: any) => {
       return el[nameIndex].toLowerCase().indexOf(input_ask.toLowerCase()) > -1
    });
}

export const filter_simple_array = (input_ask: string, data: []) => {
    data.filter( (el: string | number) => {
        if(typeof el === "string"){
            return el.toLowerCase().indexOf(input_ask.toLowerCase()) > - 1
        } else if(typeof el === "number") {
            return el.toString().toLowerCase().indexOf(input_ask.toString().toLowerCase()) > -1
        } else {
            throw new Error('No se ha ingresado un tipo valido: Number or String');
        }
    })
}
