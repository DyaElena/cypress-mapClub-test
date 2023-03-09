const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.bother.com",
    experimentalStudio: true,
    setupNodeEvents(on, config) {},
    specPattern: "cypress/**/*.spec.{js,jsx,ts,tsx}",
  },
  defaultCommandTimeout: 60000,
});
