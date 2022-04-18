const path = require("path");
const multer = require("multer");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
	destination: tempDir,
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: multerConfig,
	fileFilter: (req, file, cb) => {
		const fileSize = parseInt(req.headers["content-length"]);

		if (file.mimetype !== "image/png") {
			if (file.mimetype !== "image/jpeg") {
				req.fileValidationError = "File mimetype should be png or jpeg only";
				return cb(null, false);
			}
		}
		if (fileSize > 1000000) {
			req.fileValidationError = "File size should be under 1 Mb";
			return cb(null, false);
		}

		cb(null, true);
	},
});

module.exports = upload;
