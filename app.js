const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
