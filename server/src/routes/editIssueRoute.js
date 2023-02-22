import dotenv from "dotenv-defaults";
import fetch from "../fetch";
dotenv.config();

exports.EditIssue = async (req, res) => {
  const authorization = req.get("Authorization");
  const owner = req.query.owner;
  const repo = req.query.repo;
  const issue_number = req.query.issue_number;
  const title = req.query.title;
  const body = req.query.body;
  const labels = req.query.labels;
  await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`,
    {
      method: "POST",
      headers: {
        Authorization: authorization,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        labels: labels,
      }),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log("🚀 ~ file: editIssueRoute.js:37 ~ .then ~ data", data);
      res.json(data);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: editIssueRoute.js:39 ~ exports.EditIssue= ~ err",
        err
      );
    });
};
exports.DeleteIssue = async (req, res) => {
  const authorization = req.get("Authorization");
  const owner = req.query.owner;
  const repo = req.query.repo;
  const issue_number = req.query.issue_number;
  await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`,
    {
      method: "POST",
      headers: {
        Authorization: authorization,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        state: "closed",
      }),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log("🚀 ~ file: editIssueRoute.js:37 ~ .then ~ data", data);
      res.json(data);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: editIssueRoute.js:39 ~ exports.EditIssue= ~ err",
        err
      );
    });
};
