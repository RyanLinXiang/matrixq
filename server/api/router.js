import express from "express";
import bodyParser from "body-parser";
import questionnaires from "./questionnaires.js";
import answers from "./answers.js";
import multer from "multer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { NODE_ENV: environment } = process.env;

const {
  server: { allowedMimeTypes },
  client: { publicFolder }
} = require(`../config/${environment || "development"}.json`);

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, publicFolder);
  },
  filename: function (_req, file, cb) {
    if (!allowedMimeTypes[file.mimetype]) {
      return;
    }

    cb(null, `${file.originalname}.${allowedMimeTypes[file.mimetype]}`);
  }
});

const upload = multer({ storage }).array("file");

export const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/answers/:questionnaireId", answers.getByQuestionnaireId);
router.post("/answers/:questionnaireId", answers.recreate);
router.post("/upload", upload, answers.upload);

router.get("/questionnaires/:questionnaireSlug", questionnaires.getBySlug);
router.post("/questionnaires/:questionnaireId", questionnaires.updateById);
