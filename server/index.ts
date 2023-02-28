import express from "express";
import bodyParser from "body-parser";

const app = express();
<<<<<<< HEAD
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {});
=======
var indexRouter = require('./routes/index');
>>>>>>> 60e37129e9d7ad479155e94db9ff29b64333173b

app.listen(port, () => {
  console.log(`Now listening on port: ${port}`);
});

app.use('/', indexRouter)
