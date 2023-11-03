import * as exceljs from 'exceljs';
import { saveAs } from 'file-saver';

type ExportXlsxOptions = {
	filename: string;
	sheets: {
		name: string;
		data: any[];
	}[];
};

export async function exportarXlsx({ filename, sheets }: ExportXlsxOptions) {
	console.log(sheets);
	try {
		const workbook = new exceljs.Workbook();

		for (const sheet of sheets) {
			const worksheet = workbook.addWorksheet(sheet.name);

			worksheet.columns = Object.keys(sheet.data[0]).map((header) => ({
				header,
				key: header,
				width: 30,
			}));

			for (const item of sheet.data) {
				worksheet.addRow(item);
			}
		}

		const buffer = await workbook.xlsx.writeBuffer();
		const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		saveAs(blob, `${filename}.xlsx`);
	} catch (error) {
		console.error(error);
	}
}
