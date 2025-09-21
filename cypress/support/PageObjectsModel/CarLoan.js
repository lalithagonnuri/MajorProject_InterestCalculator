import util from "./util";
class CarLoan {
    visit(){
        cy.visit('https://emicalculator.net');
    }
    navigateToCarLoanPage() {
        cy.get('#car-loan').click();
    }
 
    fillDetails(amount,interestRate,loanTenure) {
        cy.get('[name="loanamount"]').clear().type(amount);
        cy.get('[name="loaninterest"]').clear().type(interestRate);
        cy.get('[name="loanterm"]').clear().type(loanTenure);
        cy.get('.input-group-append .btn-group .btn.active').click();
 
    }
    calculateEMI()
    {
 
    util.calculateAmount();
    }
}
export default new CarLoan;