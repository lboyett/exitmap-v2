import * as Redis from "redis";

const redisClient = Redis.createClient();
redisClient.connect();
redisClient.on("connect", () => [
  console.log("\x1b[41m Redis connected\x1b[0m"),
]);
redisClient.on("error", () => [console.log("\x1b[41m REDIS ERROR\x1b[0m")]);

export default redisClient;
