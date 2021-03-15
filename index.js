const app = require("./server");
const { appConfig } = require("./app/config");

app.listen(appConfig.PORT, () => {
  console.log(`Running on ${appConfig.HOST}:${appConfig.PORT}...`);
});
