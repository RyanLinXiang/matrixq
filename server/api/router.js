import express  from "express"
import bodyParser from "body-parser"
import { getById, update } from "./questionnaires.js"

export const router = express.Router()

router.use(bodyParser.json())

router.get("/questionnaires/:questionnaireId", getById)
router.post("/questionnaires/:questionnaireId", update)
