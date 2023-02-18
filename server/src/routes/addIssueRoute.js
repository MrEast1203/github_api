import dotenv from "dotenv-defaults";
import fetch from "../fetch";
dotenv.config();

exports.AddIssue = async (req, res) => {
  const authorization = req.get("Authorization");
  const owner = req.query.owner;
  console.log(
    "🚀 ~ file: addIssueRoute.js:8 ~ exports.AddIssue= ~ owner",
    owner
  );
  const repo = req.query.repo;
  console.log(
    "🚀 ~ file: addIssueRoute.js:10 ~ exports.AddIssue= ~ repo",
    repo
  );
  const title = req.query.title;
  console.log(
    "🚀 ~ file: addIssueRoute.js:18 ~ exports.AddIssue= ~ title",
    title
  );
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
      console.log("🚀 ~ file: getIssueRoute.js:25 ~ .then ~ data", data);
      res.json(data);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: getIssueRoute.js:28 ~ exports.GetIssue= ~ err",
        err
      );
    });
};
