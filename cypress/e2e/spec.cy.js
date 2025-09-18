import CarLoan from "../support/PageObjectsModel/CarLoan";
 
 
describe('EMI Calculator Automation Suite', () => {
  beforeEach(() => {
    cy.visit('https://emicalculator.net/');
    cy.fixture('carLoanData').as('data');
   
   
  });
 
  it('Car Loan EMI Calculation - First Month Breakdown', function () {
    CarLoan.navigateToCarLoanPage() ;
    CarLoan. fillDetails(this.data.amount, this.data.interestRate, this.data.loanTenure);
    CarLoan.calculateEMI();
  });
});