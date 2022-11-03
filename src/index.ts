import axios from "axios";
import * as dotenv from "dotenv";
import path from "path";
import { addresses } from "./config";
import fs from "fs";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const baseUrl = process.env.URL || "http://localhost:3000/";

const main = (): void => {
  setInterval(async () => {
    for (const address of addresses) {
      await axios
        .get(`${baseUrl}api/balance/${address}`)
        .then((data) => {
          fs.writeFileSync(`${__dirname}/../logs/${address}.json`, JSON.stringify({ time: data.headers.date, ...data.data }));
        })
        .catch(console.error);
    }
  }, 1000 * 60);
};

main();
