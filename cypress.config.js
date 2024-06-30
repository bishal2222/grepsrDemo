const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  env:{
    url: 'https://practice.expandtesting.com/notes/app/',
    api: 'https://practice.expandtesting.com/notes/api'
  },
  watchForFileChanges: false,
  failOnStatusCode: false
});
