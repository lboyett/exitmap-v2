import express, {Express, Request, Response} from "express";
import { getExit } from "../controllers/exitController";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("This is the / route from the routes/index.js file");
});

router.get("/exits/:id", (req, res, next) => {
  getInfoFromSpecific(req, res, getExit);
});

async function getInfoFromSpecific(req: Request, res: Response, _function: (_id: string) => any) {
  try {
    const info = await _function(req.params.id);
    res.json(info);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

export default router;

// _____   _    _  ____  _____  ______  __     ______  _    _   ______ _    _  _____ _  _______ _   _  _____   _____ _____ ______   _     _    _ _  ________ 
// |_   _| | |  | |/ __ \|  __ \|  ____| \ \   / / __ \| |  | | |  ____| |  | |/ ____| |/ /_   _| \ | |/ ____| |  __ \_   _|  ____| | |   | |  | | |/ /  ____|
// 	| |   | |__| | |  | | |__) | |__     \ \_/ / |  | | |  | | | |__  | |  | | |    | ' /  | | |  \| | |  __  | |  | || | | |__    | |   | |  | | ' /| |__   
// 	| |   |  __  | |  | |  ___/|  __|     \   /| |  | | |  | | |  __| | |  | | |    |  <   | | | . ` | | |_ | | |  | || | |  __|   | |   | |  | |  < |  __|  
//  _| |_  | |  | | |__| | |    | |____     | | | |__| | |__| | | |    | |__| | |____| . \ _| |_| |\  | |__| | | |__| || |_| |____  | |___| |__| | . \| |____ 
// |_____| |_|  |_|\____/|_|    |______|    |_|  \____/ \____/  |_|     \____/ \_____|_|\_\_____|_| \_|\_____| |_____/_____|______| |______\____/|_|\_\______|
