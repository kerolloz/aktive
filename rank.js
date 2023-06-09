const axios = require("axios");
const ordinal = require("ordinal");
const YAML = require("yamljs");

async function getOrdinalRank(username, country) {
  const githubTopRepo = "ashkulz/committers.top";
  const countryPath = `gh-pages/_data/locations/${country}.yml`;

  const { data } = await axios({
    url: `https://raw.githubusercontent.com/${githubTopRepo}/${countryPath}`,
  });

  const userData = data.split("\n\n").find((u) => u.includes(username));
  const json = YAML.parse(userData)[0];
  return ordinal(json.rank);
}

module.exports = { getOrdinalRank };
