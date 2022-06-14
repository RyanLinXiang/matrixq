import express from "express";
import bodyParser from "body-parser";
import questionnaires from "./questionnaires.js";
import answers from "./answers.js";

export const router = express.Router();

router.use(bodyParser.json());

router.get("/answers/:questionnaireId", answers.getByQuestionnaireId);
router.post("/answers/:questionnaireId", answers.recreate);

router.get("/questionnaires/:questionnaireSlug", questionnaires.getBySlug);
router.post("/questionnaires/:questionnaireId", questionnaires.updateById);
