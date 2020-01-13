const { esclient, index, type } = require("../../elastic");

async function getSymptoms(req) {

  const query = {
    query: {
      match: {
        symptom: {
          query: req.text,
          operator: "and",
          fuzziness: "auto"
        }
      }
    }
  };

  const { body: { hits } } = await esclient.search({
    from:  req.page  || 0,
    size:  req.limit || 100,
    index: index, 
    type:  type,
    body:  query
  });

  const results = hits.total.value;
  const values  = hits.hits.map((hit) => {
    return {
      id:     hit._id,
      symptom:  hit._source.symptom,
      solutions: hit._source.solutions,
      score:  hit._score
    }
  });

  return {
    results,
    values
  }

}

async function insertNewSymptom(symptom, solutions) {
  return esclient.index({
    index,
    type,
    body: {
      symptom,
      solutions
    }
  })
}

module.exports = {
  getSymptoms,
  insertNewSymptom
};