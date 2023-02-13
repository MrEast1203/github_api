import dotenv from "dotenv-defaults";
dotenv.config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.GetUserData = async (req, res) => {
  const authorization = req.get("Authorization");
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(
        "🚀 ~ file: getUserRoute.js:17 ~ exports.GetUserData= ~ data",
        data
      );
      res.json(data);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: getUserRoute.js:21 ~ exports.GetUserData= ~ err",
        err
      );
    });
};
