function root(req, res) {
  res.json({
    status: true,
    response: "Welcome",
  });
}

module.exports = root;
