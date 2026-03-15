import YAML from 'yaml';

/**
 * Returns the ordinal suffix for a given number.
 * @param n - The number to get the suffix for.
 */
function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Fetches the ordinal rank of a GitHub user in a specific country.
 * @param username - GitHub username.
 * @param country - Country name.
 */
export async function getOrdinalRank(username: string, country: string) {
  const githubTopRepo = 'ashkulz/committers.top';
  const countryPath = `gh-pages/_data/locations/${country}.yml`;
  const url = `https://raw.githubusercontent.com/${githubTopRepo}/${countryPath}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.text();
    const userData = data.split('\n\n').find((u) => u.includes(username));

    if (!userData) return null;

    const parsed = YAML.parse(userData);
    const rank = parsed?.[0]?.rank;

    return rank ? getOrdinalSuffix(rank) : null;
  } catch (error) {
    console.error('Error fetching rank:', error);
    return null;
  }
}
