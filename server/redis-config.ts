import dotenv from "dotenv";
import * as Redis from "redis";
dotenv.config();

const redisClient = Redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: +(process.env.REDIS_PORT as string),
  },
});
(async () => {
  try {
    await redisClient.connect();
  } catch {
    console.log("there is an error connecting to redis");
  }
})();
redisClient.on("connect", () => [
  console.log("\x1b[41m Redis connected\x1b[0m"),
]);
redisClient.on("error", () => {
  console.log("\x1b[41m REDIS ERROR\x1b[0m");
  redisClient.disconnect();
});

export default redisClient;
