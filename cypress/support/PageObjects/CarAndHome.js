class CarAndHomePage{
    carLoanLocator="#car-loan > a";
    loanAmountLocator='[name="loanamount"]';
    loanInterestLocator='[name="loaninterest"]';
    loanTenureLocator='[name="loanterm"]';
    emiLocator='#emiamount > p > span';
    homeLoanLocator='#home-loan > a'
    visit(){
        cy.visit("https://emicalculator.net")
    }
    getCarLoan(){
        return cy.get(this.carLoanLocator);
    }
    getHomeLoan(){
        return cy.get(this.homeLoanLocator)
    }
    clickCarLoan(){
        this.getCarLoan().click();
    }
    clickHomeLoan(){
        this.getHomeLoan().click();
    }
    getAmount(){
        return cy.get(this.loanAmountLocator);
    }
    enterAmount(amt){
        this.getAmount().clear().type(amt,{delay:100}).type('{enter}')
    }
    getInt(){
        return cy.get(this.loanInterestLocator);
    }
    enterInterest(intr){
        this.getInt().clear().type(intr,{delay:100}).type('{enter}')
    }
    getTenure(){
        return cy.get(this.loanTenureLocator);
    }
    enterTenure(time){
        this.getTenure().clear().type(time,{delay:100}).type('{enter}')
    }
    calculateInterest(intr,amt){
        let r=(intr)/(100*12);
        return (amt*r).toFixed(2);
    }
    calculatePrincipal(intMonth) {
        return new Cypress.Promise((resolve) => {
            cy.get(this.emiLocator).invoke('text').then((data) => {
                const result = parseFloat(data.replace(/[^\d.]/g, "")) - intMonth;
                resolve(result);
            });
        });
    }

    display(interestPerMonth,principalPerMonth){
        cy.log(`Interest Per Month is ${interestPerMonth}`)
        principalPerMonth.then((data)=>{
            cy.log(`Principal Amount Per Month is ${parseFloat(data).toFixed(2)}`);
        })
    }
    getYearlyEMIData() {
        const data = [];

        cy.get('.row.no-margin').first().find('th').then(($headers) => {
            const headerTexts = [];
            $headers.each((index, header) => {
                headerTexts.push(Cypress.$(header).text().trim());
            });
            cy.get('.row.no-margin.yearlypaymentdetails').each(($row) => {
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
export default new CarAndHomePage();