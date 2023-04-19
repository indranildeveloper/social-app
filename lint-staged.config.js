module.exports = {
  "*.{js, jsx, ts,tsx}": [
    "yarn lint",
    "bash -c 'yarn types:check'",
    "yarn format:check",
  ],
};
