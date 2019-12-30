const xlsxj = require('xlsx-to-json');
const multer = require('multer');
const path = require('path');
const util = require('util');

class UploadExcel {
	static async uploadFile(req, fileName, fileLocation, fieldName) {
		const startUpload = await this.prepareFileUpload(fileName, fileLocation, fieldName);


		await startUpload(req, fileName);

		const { path: filePath } = req.file;
		const { path: routePath } = req.route;
		const converted = await this.convertExcelToJson(filePath, routePath);
		return converted;
	}

	/** Multer disk storage settings, file naming and storing location */
	static async prepareFileUpload(fileName, folderName, fieldName) {
		const uploadedExcelFilePath = path.join(__dirname + folderName);
		const storage = multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, uploadedExcelFilePath);
			},
			filename: (req, file, cb) => {
				const { originalname } = file;
				const uploadedExcelFileDate = Date.now();
				const uploadedExcelFileName = `${fileName}-${uploadedExcelFileDate}.${originalname.split('.')[
					originalname.split('.').length - 1
				]}`;
				if ([ 'xls', 'xlsx' ].indexOf(originalname.split('.')[originalname.split('.').length - 1]) === -1) {
					return cb('Wrong file type (it should be .xls or .xlsx');
				}
				cb(null, uploadedExcelFileName);
			}
		});
		const uploadedFile = util.promisify(
			multer({
				storage: storage
			}).single(fieldName)
		);
		return uploadedFile;
	}

	static convertExcelToJson(filePath) {
		return new Promise((resolve, reject) => {
			xlsxj(
				{
					input: filePath,
					output: null
				},
				(error, file) => {
					if (error) {
						reject(new Error('Error while converting file from xlss to json'));
					} else {
						console.log('USO SAAM DA CONVERTUJEM 2', file);
						resolve(file);
					}
				}
			);
		});
	}
}

module.exports = {
	UploadExcel
};
