<h1 align="left">Aktive 🟩
<a target="_blank" href="https://fastify.io"><img alt="fastify" align="right" src="https://t.ly/0o1a"/></a>
<a target="_blank" href="https://deta.sh"><img alt="Deta" align="right" src="https://t.ly/-g08" /></a>
</h1>

Aktive is a simple web-service. It returns a badge (or JSON) that shows your rank among other GitHub users from your country according to your GitHub contributions.

> **Note**  
>  
> Aktive depends on the data provided by [lauripiispanen/github-top](//github.com/lauripiispanen/github-top).  
> So please make sure that your name appears on your country list here [commits.top](https://commits.top).

## Docs

Aktive is powered by _Fastify_ and is designed to run on _Deta_.  

### Endpoints

> Base URL: <https://aktive.tk>

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
- `color` - Set background of the right part (hex, rgb, rgba, hsl, hsla and css named colors supported). Defaults to `brightgreen`.
- `labelColor` -  Set background of the left part (hex, rgb, rgba, hsl, hsla and css named colors supported). Defaults to `grey`.
- `rnkPrefix` - Set prefix to display before the rank value. Defaults to `""` empty string.
- `rnkSuffix` - Set suffix to display after the rank value. Defaults to `""` empty string.

##### Examples

> `![badge](https://aktive.tk/egypt/kerolloz)`  
> ![badge](https://aktive.tk/egypt/kerolloz)

> `![badge](https://aktive.tk/egypt/kerolloz?style=flat-square&color=blue)`  
> ![badge](https://aktive.tk/egypt/kerolloz?style=flat-square&color=blue)  

> `![badge](https://aktive.tk/egypt/kerolloz?label=Most%20Active%20GitHub%20User%20In%20Egypt&labelColor=white&rnkPrefix=Rank%20)`  
> ![badge](https://aktive.tk/egypt/kerolloz?label=Most%20Active%20GitHub%20User%20In%20Egypt&labelColor=white&rnkPrefix=Rank%20)

> `![badge](https://aktive.tk/egypt/kerolloz?label=&color=cyan&style=for-the-badge&rnkPrefix=Ranked%20&rnkSuffix=%20In%20Egypt)`  
> ![badge](https://aktive.tk/egypt/kerolloz?label=&color=cyan&style=for-the-badge&rnkPrefix=Ranked%20&rnkSuffix=%20In%20Egypt)

---

#### GET `/rank/:country/:username`

<a target="_blank" href="https://reqbin.com/c-1lldzybw ">
  <img align="right" alt="Try it" src="https://img.shields.io/badge/-Try%20it-white?style=for-the-badge" />
</a>

- Returns a JSON object with your rank.

**Same parameters** as [GET `/:country/:username`](#get-countryusername)

##### Example

```bash
$ curl https://aktive.tk/rank/egypt/kerolloz

{
    "rank": "154th"
}
```

### Deployment

Feel free to use my version at <https://aktive.tk>.

You can also deploy Aktive to your own Deta account by clicking the button below.  
<a href="https://go.deta.dev/deploy?repo=https://github.com/kerolloz/aktive">
  <img width="15%" alt="Deta Deploy Button" src="https://button.deta.dev/1/svg" />
</a>

<sub>This service is provided for free thanks to [Deta Micros](https://docs.deta.sh/docs/micros/about) and [Deta Base](https://docs.deta.sh/docs/base/about).</sub>
