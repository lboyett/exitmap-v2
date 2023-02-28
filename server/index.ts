import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import indexRouter from "./routes/index";
import cors from "cors";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.status(404).send("<div>404: Not Found</div>");
    return;
  }
  if (req.accepts("json")) {
    res.status(404).send({ error: "Not Found" });
    return;
  }
  res.type("txt").send("Not found");
});

app.listen(port, () => {
  console.log(`Now listening on port: ${port}`);
});

// _____  ____    ______ _    _  _____ _  __ __     ______  _    _ _____   _____ ______ _      ______   _     _    _ _  ________ 
// / ____|/ __ \  |  ____| |  | |/ ____| |/ / \ \   / / __ \| |  | |  __ \ / ____|  ____| |    |  ____| | |   | |  | | |/ /  ____|
// | |  __| |  | | | |__  | |  | | |    | ' /   \ \_/ / |  | | |  | | |__) | (___ | |__  | |    | |__    | |   | |  | | ' /| |__   
// | | |_ | |  | | |  __| | |  | | |    |  <     \   /| |  | | |  | |  _  / \___ \|  __| | |    |  __|   | |   | |  | |  < |  __|  
// | |__| | |__| | | |    | |__| | |____| . \     | | | |__| | |__| | | \ \ ____) | |____| |____| |      | |___| |__| | . \| |____ 
// \_____|\____/  |_|     \____/ \_____|_|\_\    |_|  \____/ \____/|_|  \_\_____/|______|______|_|      |______\____/|_|\_\______|
