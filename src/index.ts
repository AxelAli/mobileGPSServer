import express from "express";
// Create a new express application instance
const app: express.Application = express();

app.get("/", function(req, res): void {
  res.send("Hello World!");
});

app.listen(3000, function(): void {
  console.log("Example app listening on port 3000!");
});

module.exports = {
  testFn: (): string => "jest works",
};
