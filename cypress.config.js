const { defineConfig } = require("cypress");
const xlsx=require('xlsx');
const path = require('path');
 
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
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