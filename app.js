const express = require("express")
const app = express()

app.use(express.static('./public/static'));

app.get(["/", '/home', '/index'], (req, res) => {
  const options = {root: './public'}
  res.sendFile('/html/home.html', options);
});

app.get("/contact", (req, res) => {
  const options = {root: './public'}
  res.sendFile('/html/contact.html', options);
});

app.get("/robots.txt", (req, res) => {
  const options = {root: './public'}
  res.sendFile('/meta/robots.txt', options);
});

app.use((req, res) => {
  res.status(404).send("<h1> 404: Page not found! </h1>");
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('500: Oh no! Something\'s gone wrong...')
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
