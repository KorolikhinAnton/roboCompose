const elastic = require("./elastic");
const data    = require("./data");
                require("dotenv").config();


(async function main() {

  const isElasticReady = await elastic.checkConnection();

  if (isElasticReady) {

    const elasticIndex = await elastic.esclient.indices.exists({index: elastic.index});

    if (!elasticIndex.body) {
      console.log(elastic.index);
      await elastic.createIndex(elastic.index);
      await elastic.setSymptomsMapping();
      await data.populateDatabase()
    }
  }

})();