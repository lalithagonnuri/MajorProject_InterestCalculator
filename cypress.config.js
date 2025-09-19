const { defineConfig } = require("cypress");
const xlsx=require('xlsx');
const path = require('path');

 
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Test Report',
    embeddedScreenshots: true,
    inlineAssets: true
  },
  video: true,

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      on('task', {
        writeExcel(data) {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = xlsx.utils.book_new();
          xlsx.utils.book_append_sheet(workbook, worksheet, 'Loan Summary');
          const filePath = path.join(__dirname,'cypress','fixtures','yearOnYear.xlsx');
          xlsx.writeFile(workbook, filePath);
          return null;
        }
      });
 
    },
  },
});