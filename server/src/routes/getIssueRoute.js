import dotenv from "dotenv-defaults";
import fetch from "../fetch";
dotenv.config();

exports.GetIssue = async (req, res) => {
  const authorization = req.get("Authorization");
  const user = req.query.user;
  const page = req.query.page;
  const per_page = "10";
  const params = `?q=user:${user}+is:open+is:issue&sort=created&per_page=${per_page}&page=${page}`;
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
