import LoanCal from "../support/PageObjectsModel/LoanCalMenuPage";
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
        CarAndHomePage.visit();
        LoanCal.clickMenu()
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
        LoanCal.checkScaleForYearAndMonth(commonData.tenureYr);
    })
    it("UI Check for Loan Amount Calculator",()=>{
        LoanCal.clickLaonAmtCal();
        LoanCal.checkTxtEmi();
        LoanCal.checkTxtInt();
        LoanCal.checkTxtTenure();
        LoanCal.checkTxtFee();
        LoanCal.checkSliderEmi(commonData.emi)
        LoanCal.checkSliderInt(commonData.interestRate);
        LoanCal.checkSliderFee(commonData.fee);
        LoanCal.checkTenureSlider(commonData.tenureYr);
        LoanCal.checkScaleForYearAndMonth(commonData.tenureYr);
    })
    it("UI Check for Loan Tenure Calculator",()=>{
        LoanCal.clickLoanTenureCal();
        LoanCal.checkTxtAmt();
        LoanCal.checkTxtEmi();
        LoanCal.checkTxtInt();
        LoanCal.checkTxtFee();
        LoanCal.checkSliderAmt(commonData.price);
        LoanCal.checkSliderEmi(commonData.emi)
        LoanCal.checkSliderInt(commonData.interestRate);
        LoanCal.checkSliderFee(commonData.fee);
    })
})