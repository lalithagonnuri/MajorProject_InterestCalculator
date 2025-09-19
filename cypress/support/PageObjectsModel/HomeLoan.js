class HomeLoan
{
    menuLocator='#menu-item-dropdown-2696';
    homeLoanLocator='#menu-item-3294>.dropdown-item';
    homeValueLocator='[name="homeprice"]';
    marginLocator='[name="downpayment"]';
    amountLocator='[name="homeloanamount"]';
    intrLocator='[name="homeloaninterest"]';
    tenureLocator='[name="homeloanterm"]';
    feeLocator='[name="loanfees"]';
    headerLocator='.row.no-margin';
    yearsLocator='.row.no-margin.yearlypaymentdetails';
    navigateToHomeLoanPage() {
        cy.get(this.menuLocator).click();
        cy.get(this.homeLoanLocator).click();
    }
    fillDetails(price,margin,amount,interestRate,loanTenure,fee){
        cy.get(this.homeValueLocator).clear().type(price).blur();
        cy.get(this.marginLocator).clear().type(margin).blur();
        cy.get(this.amountLocator).clear().type(amount).blur();
        cy.get(this.intrLocator).clear().type(interestRate).blur();
        cy.get(this.tenureLocator).clear().type(loanTenure).blur();
        cy.get(this.feeLocator).clear().type(fee).blur();
    }
    getYearlyEMIData() {
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
export default new HomeLoan