import exceljs from 'exceljs';


/**
 * Importa datos de un archivo xlsx y devuelve una promesa que resuelve en un arreglo de objetos.
 * @param file - El archivo xlsx que se va a importar.
 * @param options - Un objeto que contiene el índice del encabezado para poder validar que no lo lleve al arreglo.
 * @returns Una promesa que resuelve en un arreglo de objetos.
 * @remarks
 * - T es un tipo generico de tipescript que con extends le estoy agregando un diccionario que tiene clave:valor y que se le aplicará a la función. 
 * - Primero se instancia la clase Workbook de la librería y luego se cargan los datos con load y se crea el arreglo de bytes con arraybuffer
 * - Luego se asigna la variable hoja y se toma la número uno con indice 0.
 */
export function importarXlsx<T extends Record<string, unknown>[]>(
	file: File,
	options: { indexEncabezado: number }
  ): Promise<T> {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
	  try {
		const datosImportados: Record<string, unknown>[] = [];
		const libro = new exceljs.Workbook();
		await libro.xlsx.load(await file.arrayBuffer());
		const hoja = libro.worksheets[0];
  
		hoja.eachRow((row, rowNumber) => {
		  const rowValue: Record<string, any> = {};
  
		  row.eachCell((cell, colNumber) => {
			rowValue[hoja.getRow(options.indexEncabezado).getCell(colNumber).value as string] = cell.value;
		  });
  
		  if (rowNumber !== options.indexEncabezado) {
			datosImportados.push(rowValue);
		  }
		});
  
		resolve(datosImportados as T);
	  } catch (error) {
		reject(error);
	  }
	});
  }
  