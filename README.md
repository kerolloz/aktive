<h1 align="left">Aktive 🟩
<a target="_blank" href="https://fastify.io"><img alt="fastify" align="right" src="https://img.shields.io/static/v1?logo=fastify&label=&message=Fastify&style=for-the-badge&color=grey"/></a>
<a target="_blank" href="https://railway.app/"><img alt="Railway" align="right" src="https://img.shields.io/static/v1?label=&message=Railway&style=for-the-badge&color=grey&logo=railway" /></a>
</h1>

Aktive is a simple web service. It returns a badge (or JSON) that shows your rank among other GitHub users from your country according to your GitHub contributions.

> **Note**  
>  
> Aktive depends on the data provided by [ashkulz/committers.top](//github.com/ashkulz/committers.top).  
> So please make sure that your name appears on your country list here [committers.top](https://committers.top).

## Docs

> [!NOTE]
> You can also check the Swagger [API documentation](https://aktive.kerolloz.dev/swagger) for more details.

### Endpoints

> Base URL: <https://aktive.kerolloz.dev>

#### GET `/`

Redirects to this repository.

---

#### GET `/:country/:username`

- Returns a [shields.io](https://shields.io) badge (SVG image) with your rank.

##### Parameters

- `country` - The country you live in (make sure it's visible on your profile).
- `username` - Your GitHub username.

##### Query Parameters

- `style` - Set the style of the badge. Can be one of `flat`, `flat-square`, `for-the-badge`, or `plastic`. Defaults to `flat`.
- `label` - Set the left-hand-side text. Defaults to `Most Active GitHub User Rank`.
- `color` - Set the background of the right part (hex, rgb, rgba, hsl, hsla and css named colors supported). Defaults to `brightgreen`.
- `labelColor` -  Set the background of the left part (hex, rgb, rgba, hsl, hsla and css named colors supported). Defaults to `grey`.
- `rnkPrefix` - Set prefix to display before the rank value. Defaults to `""` empty string.
- `rnkSuffix` - Set suffix to display after the rank value. Defaults to `""` empty string.

##### Examples

> `![badge](https://aktive.kerolloz.dev/egypt/kerolloz)`  
> ![badge](https://aktive.kerolloz.dev/egypt/kerolloz)

> `![badge](https://aktive.kerolloz.dev/egypt/kerolloz?style=flat-square&color=blue)`  
> ![badge](https://aktive.kerolloz.dev/egypt/kerolloz?style=flat-square&color=blue)  

> `![badge](https://aktive.kerolloz.dev/egypt/kerolloz?label=Most%20Active%20GitHub%20User%20In%20Egypt&labelColor=white&rnkPrefix=Rank%20)`  
> ![badge](https://aktive.kerolloz.dev/egypt/kerolloz?label=Most%20Active%20GitHub%20User%20In%20Egypt&labelColor=white&rnkPrefix=Rank%20)

> `![badge](https://aktive.kerolloz.dev/egypt/kerolloz?label=&color=cyan&style=for-the-badge&rnkPrefix=Ranked%20&rnkSuffix=%20In%20Egypt)`  
> ![badge](https://aktive.kerolloz.dev/egypt/kerolloz?label=&color=cyan&style=for-the-badge&rnkPrefix=Ranked%20&rnkSuffix=%20In%20Egypt)

---

#### GET `/rank/:country/:username`

<a target="_blank" href="https://reqbin.com/c-1lldzybw ">
  <img align="right" alt="Try it" src="https://img.shields.io/badge/-Try%20it-white?style=for-the-badge" />
</a>

- Returns a JSON object with your rank.

**Same parameters** as [GET `/:country/:username`](#get-countryusername)

##### Example

```bash
$ curl https://aktive.kerolloz.dev/rank/egypt/kerolloz

{
    "rank": "108th"
}
```
