const app = require("fastify")();

const { getCountBadge } = require("./badge");
const { getOrdinalRank } = require("./rank");

const GITHUB_REPO = "https://github.com/kerolloz/aktive";

app.get("/", async (_, reply) => reply.redirect(GITHUB_REPO));

app.get("/rank/:country/:username", async (request, reply) => {
  const { username, country } = request.params;

  if (!username) {
    return reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "username is required",
    });
  }

  if (!country) {
    return reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "country is required",
    });
  }

  try {
    const rank = await getOrdinalRank(username, country);
    return { rank };
  } catch (error) {
    return reply.status(400).send({
      statusCode: 400,
      error: "Bad Requeset",
      message:
        "Username not found. Please check your username and country here https://commits.top",
    });
  }
});

// GET https://aktive.tk/egypt/kerolloz
app.get("/:country/:username", async (request, reply) => {
  const { username, country } = request.params;

  if (!username) {
    return reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "username is required",
    });
  }

  if (!country) {
    return reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "country is required",
    });
  }

  let userRank;

  try {
    userRank = await getOrdinalRank(username, country);
  } catch (error) {
    return reply.status(400).send({
      statusCode: 400,
      error: "Bad Requeset",
      message:
        "Username not found. Please check your username and country here https://commits.top",
    });
  }

  const {
    style = "flat",
    label = "Most Active GitHub User Rank",
    labelColor = "",
    color = "",
    rnkPrefix = "",
    rnkSuffix = "",
  } = request.query;

  try {
    const badge = getCountBadge({
      style,
      label,
      labelColor,
      color,
      message: rnkPrefix + userRank + rnkSuffix,
    });

    reply
      .code(200)
      .headers({
        "Content-Type": "image/svg+xml",
        "Cache-Control": "max-age=86400", // 1 day
      })
      .send(badge);
  } catch (err) {
    reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: err.message,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen({ port, host: "0.0.0.0" }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on port ${port}`);
});
