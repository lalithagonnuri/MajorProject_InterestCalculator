class util{
     calculateAmount() {
        cy.get('#emiamount > p', { timeout: 10000 })
            .should('be.visible')
            .invoke('text')
            .then((emiText) => {
                const emiAmount = parseFloat(emiText.replace(/[^\d.]/g, ''));
                const loanAmount = 1500000;
                const annualInterestRate = 9.5;
                const monthlyInterestRate = annualInterestRate / 12 / 100;
                const firstMonthInterest = loanAmount * monthlyInterestRate;
                const firstMonthPrincipal = emiAmount - firstMonthInterest;
 
                cy.log(`EMI Amount: ₹${emiAmount.toFixed(2)}`);
                cy.log(`First Month Interest: ₹${firstMonthInterest.toFixed(2)}`);
                cy.log(`First Month Principal: ₹${firstMonthPrincipal.toFixed(2)}`);
            });
    }
}
 
export default new util;