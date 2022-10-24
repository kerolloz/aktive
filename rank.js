const axios = require("axios");
const atob = require("atob");
const ordinal = require("ordinal");
const YAML = require("yamljs");

async function getOrdinalRank(username, country) {
  const githubTopRepo = "lauripiispanen/github-top";
  const countryPath = `_data/locations/${country}.yml`;

  const { data } = await axios({
    url: `https://api.github.com/repos/${githubTopRepo}/contents/${countryPath}`,
  });

  const decodedContent = atob(data.content);
  const userData = decodedContent
    .split("\n\n")
    .find((u) => u.includes(username));
  const json = YAML.parse(userData)[0];
  return ordinal(json.rank);
}

module.exports = { getOrdinalRank };
