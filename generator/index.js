const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);

(async () => {
  await buildSetup();
  await startCreating();
})();

