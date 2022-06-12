import { findMany } from "../src/components/answers/Model.js"

async function getById(req, res) {
   const { questionnaireId } = req.params

   const result = await findMany({ key: "questionnaireId", value: questionnaireId })

   return res
   .status(200)
   .json(result);
}

export default {
   getById
}