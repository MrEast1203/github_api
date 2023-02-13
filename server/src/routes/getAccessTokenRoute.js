import dotenv from "dotenv-defaults";
import fetch from "../fetch";
dotenv.config();

exports.GetAccessToken = async (req, res) => {
  const code = req.query.code;
  const AccessTokenURL = "https://github.com/login/oauth/access_token";
  const params =
    "?client_id=" +
    process.env.CLIENT_ID +
    "&client_secret=" +
    process.env.CLIENT_SECRETS +
    "&code=" +
    code;
  console.log(
    "🚀 ~ file: getAccessTokenRoute.js:8 ~ exports.GetAccessToken= ~ params",
    params
  );
  await fetch(AccessTokenURL + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("🚀 ~ file: getAccessTokenRoute.js:31 ~ .then ~ data", data);
      res.json(data);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: getAccessTokenRoute.js:30 ~ exports.GetAccessToken= ~ err",
        err
      );
    });
};
