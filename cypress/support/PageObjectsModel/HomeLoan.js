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
}
export default new HomeLoan