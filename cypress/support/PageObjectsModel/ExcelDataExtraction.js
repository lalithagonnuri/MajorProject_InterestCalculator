import HomeLoan from "./HomeLoan";
class ExcelExtraction
{
    
    headerLocator='.row.no-margin';
    yearsLocator='.row.no-margin.yearlypaymentdetails';

    getYearlyEMIData(price,margin,amount,interestRate,loanTenure,fee) {
        HomeLoan.navigateToHomeLoanPage();
        HomeLoan.fillDetails(price,margin,amount,interestRate,loanTenure,fee);
        const data = [];
        cy.get(this.headerLocator).eq(1).find('th').then(($headers) => {
            const headerTexts = [];
            $headers.each((index, header) => {
                headerTexts.push(Cypress.$(header).text().trim());
            });
            cy.get(this.yearsLocator).each(($row) => {
                const rowData = {};
                cy.wrap($row).find('td').each(($cell, index) => {
                    rowData[headerTexts[index]] = $cell.text().trim();
                }).then(() => {
                    data.push(rowData);
                });
            }).then(() => {
                cy.writeFile('cypress/fixtures/year_on_year.json', data);
            });
        });
    }
   
}
export default new ExcelExtraction