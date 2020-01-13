const model = require("../models");

/**
 * @function getSymptoms
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

async function getSymptoms(req, res) {
  const query  = req.query;

  if (!query.text) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter: text"
    });

    return;
  }

  try {

    const result = await model.getSymptoms(req.query);
    res.json({ success: true, data: result });

  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error."});
  }
}

/**
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

async function addSymptom(req, res) {

  const body = req.body;

  if (!body.symptom || !body.solutions) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter(s): 'body' or 'symptom'"
    });

    return;
  }

  try {

    const result = await model.insertNewSymptom(body.symptom, body.solutions);
    res.json({ 
      success: true, 
      data: {
        id:     result.body._id,
        solutions: body.solutions,
        symptom:  body.symptom
      } 
    });

  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error."});
  }

}

module.exports = {
  getSymptoms,
  addSymptom
};