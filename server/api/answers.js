import {
  deleteMany,
  findMany,
  insertMany
} from "../src/components/answers/Model.js";

async function getByQuestionnaireId(req, res) {
  const { questionnaireId } = req.params;

  const result = await findMany({
    key: "questionnaireId",
    value: questionnaireId
  });

  return res.status(200).json(result);
}

async function recreate(req, res) {
  const { questionnaireId } = req.params;
  const { docs } = req.body;

  await deleteMany({ key: "questionnaireId", value: questionnaireId });
  await insertMany({ docs });

  return res.status(200);
}

async function upload(req, res) {
  return res.status(200).send(req.files);
}

export default {
  getByQuestionnaireId,
  recreate,
  upload
};
