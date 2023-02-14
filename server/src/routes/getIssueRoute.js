import dotenv from "dotenv-defaults";
import fetch from "../fetch";
dotenv.config();

exports.GetIssue = async (req, res) => {
  const authorization = req.get("Authorization");
  const owner = req.query.owner;
  const repo = req.query.repo;
  // const repoURL = `${owner}/${repo}`;
  const per_page = "10";
  const params = `?q=user:${owner}+is:issue+is:open&sort=created&per_page=${per_page}`;
  await fetch(`https://api.github.com/search/issues` + params, {
    method: "GET",
    headers: {
      Authorization: authorization,
      Accept: "application/vnd.github+json",
    },
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
