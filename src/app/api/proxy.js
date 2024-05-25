// pages/api/proxy.js

export default async function handler(req, res) {
  const response = await fetch("http://rccna.net/moroccosoresult.php", {
    method: req.method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...req.headers,
    },
    body: req.body,
  });

  const data = await response.text();
  res.status(response.status).send(data);
}
