import { findOne } from "../src/components/questionnaires/Model.js";

async function getBySlug(req, res) {
  const { questionnaireSlug } = req.params;

  const result = await findOne({ key: "slug", value: questionnaireSlug })

  return res
    .status(200)
    .json(result);
}

export default {
  getBySlug
};
