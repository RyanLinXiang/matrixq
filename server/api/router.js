import express  from "express"
import bodyParser from "body-parser"
import questionnaires from "./questionnaires.js"
import answers from "./answers.js"

export const router = express.Router()

router.use(bodyParser.json())

router.get("/questionnaires/:questionnaireSlug", questionnaires.getBySlug)
router.get("/answers/:questionnaireId", answers.getById)
