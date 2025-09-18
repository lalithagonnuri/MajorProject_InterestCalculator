import CarAndHomePage from "../support/PageObjects/CarAndHome";
import LoanCal from "../support/PageObjects/LoanCalMenuPage";
describe("Interest Amount Calculator for one Year",()=>{
    let carData=null;
    let homeData=null;
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    before("Getting Data from fixtures",()=>{
        cy.fixture("HomeLoanData.json").then((data)=>{
            homeData=data
        })
        cy.fixture("CarLoanData.json").then((data)=>{
            carData=data
        })
    })
    beforeEach("Visiting Page",()=>{
        CarAndHomePage.visit();
    })
    it("Car Loan---Calculate interest and principal for one month",()=>{
        CarAndHomePage.clickCarLoan();
        CarAndHomePage.enterAmount(carData.price);
        CarAndHomePage.enterInterest(carData.interestRate);
        CarAndHomePage.enterTenure(carData.tenure);
        let interestPerMonth=CarAndHomePage.calculateInterest(carData.interestRate,carData.price);
        let principalPerMonth=CarAndHomePage.calculatePrincipal(interestPerMonth);
        CarAndHomePage.display(interestPerMonth,principalPerMonth);
    })
    it("Home Loan---Extract data into excel",()=>{
        CarAndHomePage.clickHomeLoan();
        CarAndHomePage.enterAmount(homeData.price);
        CarAndHomePage.enterInterest(homeData.interestRate);
        CarAndHomePage.enterTenure(homeData.tenure);
        CarAndHomePage.getYearlyEMIData();
        cy.fixture('year_on_year.json').then((data) => {
            cy.task('writeExcel', data);
        });
    })
    it.only("UI Check for EMI calculator",()=>{
        LoanCal.clickMenu();
        LoanCal.clickEmi();
        LoanCal.checkTxtAmt();
        LoanCal.checkTxtInt();
        cy.get('#loanamountslider').invoke('val', 500).trigger('change');
    })
})