import { findOne, updateOne } from "../src/components/questionnaires/Model.js";

async function getBySlug(req, res) {
  const { questionnaireSlug } = req.params;

  const result = await findOne({ key: "slug", value: questionnaireSlug });

  return res.status(200).json(result);
}

async function updateById(req, res) {
  const { questionnaireId } = req.params;
  const { docs } = req.body;

  await updateOne({ doc: { ...docs[0], _id: questionnaireId } });

  return res.status(200);
}

export default {
  getBySlug,
  updateById
};
