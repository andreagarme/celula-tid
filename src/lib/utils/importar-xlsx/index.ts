import exceljs from 'exceljs';

export function importarXlsx<T extends Record<string, unknown>[]>(file: File, options: { indexEncabezado: number }): Promise<T> {
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
