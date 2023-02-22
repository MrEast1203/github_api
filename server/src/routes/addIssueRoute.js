import dotenv from "dotenv-defaults";
import fetch from "../fetch";
dotenv.config();

exports.AddIssue = async (req, res) => {
  const authorization = req.get("Authorization");
  const owner = req.query.owner;
  const repo = req.query.repo;
  const title = req.query.title;
  const body = req.query.body;
  await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: authorization,
      Accept: "application/vnd.github+json",
    },
    body: `{ "title":"${title}","body":"${body}" }`,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log("🚀 ~ file: addIssueRoute.js:24 ~ .then ~ data", data);
      res.json(data);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: addIssueRoute.js:27 ~ exports.AddIssue= ~ err",
        err
      );
    });
};
