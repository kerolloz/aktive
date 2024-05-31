import axios from 'axios';
import ordinal from 'ordinal';
import YAML from 'yamljs';

export async function getOrdinalRank(username: string, country: string) {
  const githubTopRepo = 'ashkulz/committers.top';
  const countryPath = `gh-pages/_data/locations/${country}.yml`;

  const { data } = await axios<string>({
    url: `https://raw.githubusercontent.com/${githubTopRepo}/${countryPath}`,
  });

  const userData = data.split('\n\n').find((u) => u.includes(username));
  if (!userData) return null;
  const json = YAML.parse(userData)[0];
  return ordinal(json.rank);
}
