import CarLoan from "../support/PageObjectsModel/CarLoan";
import HomeLoan from "../support/PageObjectsModel/HomeLoan";
import LoanCal from "../support/PageObjectsModel/LoanCalMenuPage";
describe('EMI Calculator Automation Suite', () => {
  beforeEach(() => {
    cy.visit('https://emicalculator.net');
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
    HomeLoan.getYearlyEMIData();
    cy.fixture('year_on_year.json').then((data) => {
      cy.task('writeExcel', data);
    });
  })
});

describe("UI Check",()=>{
    let commonData=null;
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    before("Getting data from fixtures",()=>{
        cy.fixture('CommonData.json').then((data)=>{
            commonData=data
        })
    })
    beforeEach("Visiting Page",()=>{
        cy.visit('https://emicalculator.net');
        LoanCal.clickMenu();
    })
    it("UI Check for EMI calculator",()=>{
        LoanCal.clickEmi();
        LoanCal.checkTxtAmt();
        LoanCal.checkTxtInt();
        LoanCal.checkTxtTenure();
        LoanCal.checkTxtFee();
        LoanCal.checkSliderAmt(commonData.price);
        LoanCal.checkSliderInt(commonData.interestRate);
        LoanCal.checkSliderFee(commonData.fee);
        LoanCal.checkTenureSlider(commonData.tenureYr);
    })
    it("UI Check for Loan Tenure Calculator",()=>{
        LoanCal.clickLoanTenureCal();
        LoanCal.checkTxtAmt();
        LoanCal.checkTxtInt();
        LoanCal.checkTxtFee();
        LoanCal.checkSliderAmt(commonData.price);
        LoanCal.checkSliderInt(commonData.interestRate);
        LoanCal.checkSliderFee(commonData.fee);
    })
})