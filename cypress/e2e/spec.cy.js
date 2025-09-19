import CarLoan from "../support/PageObjectsModel/CarLoan";
import HomeLoan from "../support/PageObjectsModel/HomeLoan";
 
 
describe('EMI Calculator Automation Suite', () => {
  beforeEach(() => {
    cy.visit('https://emicalculator.net/');
    cy.fixture('carLoanData').as('data');
    cy.fixture('homeLoanData').as('homeData');
   
  });
  it('Car Loan EMI Calculation - First Month Breakdown', function () {
    CarLoan.navigateToCarLoanPage() ;
    CarLoan. fillDetails(this.data.amount, this.data.interestRate, this.data.loanTenure);
    CarLoan.calculateEMI();
  });
  it('Home Loan Emi Cal---Extract Yearly Data to Excel', function(){
    HomeLoan.navigateToHomeLoanPage();
    HomeLoan.fillDetails(this.homeData.price,this.homeData.margin,this.homeData.amount, this.homeData.interestRate, this.homeData.loanTenure,this.homeData.fee);
  
  })
});