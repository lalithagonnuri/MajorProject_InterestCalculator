class LoanCalMenuPage{
    menuLocator='#menu-item-3009 > a';
    emiCalLocator='#emi-calc > .hidden-ts';
    loanAmountLocator='[name="loanamount"]';
    loanInterestLocator='[name="loaninterest"]';
    loanTenureLocator='[name="loanterm"]';
    clickMenu(){
        cy.get(this.menuLocator).click();
    }
    clickEmi(){
        cy.get(this.emiCalLocator).click({force:true})
    }
    getAmount(){
        return cy.get(this.loanAmountLocator);
    }
    enterAmount(amt){
        this.getAmount().clear().type(amt,{delay:100}).type('{enter}')
    }
    checkTxtAmt(){
        this.getAmount().should('exist')
    }
    getInt(){
        return cy.get(this.loanInterestLocator);
    }
    enterInterest(intr){
        this.getInt().clear().type(intr,{delay:100}).type('{enter}')
    }
    checkTxtInt(){
        this.getInt().should('exist')
    }
}
export default new LoanCalMenuPage();