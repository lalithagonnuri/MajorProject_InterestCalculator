class LoanCalMenuPage{

    menuLocator='#menu-item-dropdown-2696';
    loanCalLocator='#menu-item-2423>.dropdown-item'
    emiCalLocator='#emi-calc>.hidden-ts';
    loanAmountCal='#loan-amount-calc>.hidden-ts';
    loanTenureCalculator='#loan-tenure-calc>.hidden-ts';
    loanAmountLocator='[name="loanamount"]';
    loanInterestLocator='[name="loaninterest"]';
    loanTenureLocator='[name="loanterm"]';
    loanFeeLocator='#loanfees';
    loanFeeSlider='#loanfeesslider>span'
    loanAmtSlider='#loanamountslider>span';
    loanIntrSlider='#loaninterestslider>span';
    loanTenureSlider="#loantermslider>span";
    scaleLocator='#loantermsteps';
    monthLocator='.input-group-append>.btn-group';
    loanEmiLocator='[name="loanemi"]';
    loanEmiSlider='#loanemislider>span';

    getAmount(){
        return cy.get(this.loanAmountLocator);
    }
    
    getFee(){
        return cy.get(this.loanFeeLocator);
    }

    getTenure(){
        return cy.get(this.loanTenureLocator);
    }

    getInt(){
        return cy.get(this.loanInterestLocator);
    }

    getEmi(){
        return cy.get(this.loanEmiLocator);
    }

    getAmtSlider(){
        return cy.get(this.loanAmtSlider)
    }

    getIntSlider(){
        return cy.get(this.loanIntrSlider)
    }

    getFeeSlider(){
        return cy.get(this.loanFeeSlider)
    }

    getTenureSlider(){
        return cy.get(this.loanTenureSlider)
    }

    getScale(){
        return cy.get(this.scaleLocator);
    }

    getEmiSlider(){
        return cy.get(this.loanEmiSlider);
    }

    clickMenu(){
        cy.get(this.menuLocator).click();
        cy.get(this.loanCalLocator).click()
    }

    clickEmi(){
        cy.get(this.emiCalLocator).click({force:true})
    }
    
    clickLaonAmtCal(){
        cy.get(this.loanAmountCal).click({force:true})
    }

    clickLoanTenureCal(){
        cy.get(this.loanTenureCalculator).click({force:true})
    }

    enterAmount(amt){
        this.getAmount().clear().type(amt,{delay:100}).blur();
    }

    checkTxtAmt(){
        this.getAmount().should('exist')
    }

    enterInterest(intr){
        this.getInt().clear().type(intr,{delay:100}).blur();
    }

    checkTxtInt(){
        this.getInt().should('exist')
    }

    enterFee(fee){
        this.getFee().clear().type(fee,{delay:100}).blur();
    }

    checkTxtFee(){
        this.getFee().should('exist')
    }

    enterEmi(emi){
        this.getEmi().clear().type(emi,{delay:100}).blur();
    }

    checkTxtEmi(){
        this.getEmi().should('exist')
    }

    enterTenureYear(year){
        this.getTenure().clear().type(year,{delay:100}).blur();
    }

    checkTxtTenure(){
        this.getTenure().should('exist');
    }

    checkTxtEmi(){
        this.getEmi().should('exist')
    }

    checkSliderAmt(amt){
        let initialStyle=null;
        this.getAmtSlider().invoke('attr','style').then((data)=>{
            initialStyle=data;
        })
        cy.wait(1000)
        this.enterAmount(amt);
        cy.wait(1000)
        this.getAmtSlider().invoke('attr','style').then((data)=>{
            expect(initialStyle).not.to.eq(data);
        })
    }

    checkSliderInt(intr){
        let initialStyle=null;
        this.getIntSlider().invoke('attr','style').then((data)=>{
            initialStyle=data;
        })
        cy.wait(1000);
        this.enterInterest(intr);
        cy.wait(3000)
        this.getIntSlider().invoke('attr','style').then((data)=>{
            expect(initialStyle).not.to.eq(data);
        })
    }
    
    checkSliderFee(fee){
        let initialStyle=null;
        this.getFeeSlider().invoke('attr','style').then((data)=>{
            initialStyle=data;
        })
        cy.wait(1000);
        this.enterFee(fee);
        cy.wait(1000);
        this.getFeeSlider().invoke('attr','style').then((data)=>{
            expect(initialStyle).not.to.eq(data);
        })
    }

    checkTenureSlider(year){
        let initialStyle=null;
        this.getTenureSlider().invoke('attr','style').then((data)=>{
            initialStyle=data;
        })
        cy.wait(1000);
        this.enterTenureYear(year);
        cy.wait(1000);
        this.getTenureSlider().invoke('attr','style').then((data)=>{
            expect(initialStyle).not.to.eq(data);
        })
    } 

    checkScaleForYearAndMonth(year){
        let yearScale=null;
        this.getScale().invoke('text').then((data)=>{
            yearScale=data;
            cy.log(`The Scale when we choose Year ${yearScale}`);
        })
        cy.get(this.monthLocator).find('label').eq(1).scrollIntoView().click();
        this.getScale().invoke('text').then((data)=>{
            cy.log(`The Scale when we choose Month ${data}`);
            expect(yearScale).not.to.eq(data)
        })
    }

    checkSliderEmi(emi){
        let initialStyle=null;
        this.getEmiSlider().invoke('attr','style').then((data)=>{
            initialStyle=data;
        })
        cy.wait(1000);
        this.enterEmi(emi);
        cy.wait(1000);
        this.getEmiSlider().invoke('attr','style').then((data)=>{
            expect(initialStyle).not.to.eq(data);
        })
 
    }
}
export default new LoanCalMenuPage();