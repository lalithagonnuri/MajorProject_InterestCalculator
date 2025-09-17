describe('EMI Calculator Automation Suite', () => {
  beforeEach(() => {
    cy.visit('https://emicalculator.net/');
  });
 
  it('Car Loan EMI Calculation - Display First Month Interest & Principal', () => {
    // Navigate to Car Loan tab
    cy.get('#car-loan > a').click();
 
    // Fill in loan details
    cy.get('[name="loanamount"]').clear().type('1500000');
    cy.get('[name="loaninterest"]').clear().type('9.5');
    cy.get('[name="loanterm"]').clear().type('1');
    cy.get('.input-group-append > .btn-group > .active').click();
 
    // Wait for EMI to update and extract it
    cy.get('#emiamount > p', { timeout: 10000 }) // ✅ fixed syntax
      .should('be.visible')
      .invoke('text')
      .then((emiText) => {
        // Clean and parse EMI amount
        const emiAmount = parseFloat(emiText.replace(/[^\d.]/g, ''));
       
        // Loan details
        const loanAmount = 1500000;
        const annualInterestRate = 9.5;
        const monthlyInterestRate = annualInterestRate / 12 / 100;
 
        // First month interest
        const firstMonthInterest = loanAmount * monthlyInterestRate;
 
        // First month principal
        const firstMonthPrincipal = emiAmount - firstMonthInterest;
 
        // Log results
        cy.log(`EMI Amount: ₹${emiAmount.toFixed(2)}`);
        cy.log(`First Month Interest: ₹${firstMonthInterest.toFixed(2)}`);
        cy.log(`First Month Principal: ₹${firstMonthPrincipal.toFixed(2)}`);
      });
  });
  it('Home Loan EMI Calculator',()=>
  {
    cy.get('#home-loan > a').click();
    cy.get('[name="loanamount"]').clear().type('1500000');
    cy.get('[name="loaninterest"]').clear().type('9');
    cy.get('[name="loanterm"]').clear().type('1');
    cy.get('.input-group-append > .btn-group > .active').click();
    cy.get('#year2025').click();
  })
  it('Loan EMI Calculator',()=>
  {
    cy.get('#home-loan > a').click();
    cy.get('[name="loanamount"]').clear().type('1500000');
    cy.get('[name="loaninterest"]').clear().type('9');
    cy.get('[name="loanterm"]').clear().type('1');
    cy.get('.input-group-append > .btn-group > .active').click();
    cy.get('#year2025').click();
  })
  it('Emi calculator',()=>
  {
    cy.get('#menu-item-3009 > a').click();
    cy.get('[name="loanamount"]').clear().type('1500000');
    cy.get('[name="loaninterest"]').clear().type('9');
    cy.get('[name="loanterm"]').clear().type('1');
    cy.get('.input-group-append > .btn-group > .active').click();
     cy.get('[name="loanterm"]').clear().type('24');
    cy.get('.input-group-append > .btn-group > :nth-child(2)').click();
  })
  it('EMI Calculator - Tenure Scale Change', () => {
  cy.get('[name="loanterm"]').clear().type('1');
  cy.get('.input-group-append > .btn-group > :nth-child(1)').click(); // Year
  cy.get('[name="loanterm"]').should('have.value', '1');
 
  cy.get('[name="loanterm"]').clear().type('24');
  cy.get('.input-group-append > .btn-group > :nth-child(2)').click(); // Month
  cy.get('[name="loanterm"]').should('have.value', '24');
});
function validateLoanInputs() {
  cy.get('[name="loanamount"]').should('be.visible').and('have.attr', 'type', 'text');
  cy.get('[name="loaninterest"]').should('be.visible').and('have.attr', 'type', 'text');
  cy.get('[name="loanterm"]').should('be.visible').and('have.attr', 'type', 'text');
}
 
it('Loan Amount Calculator - UI Validation', () => {
  cy.get('#loan-amount-calc > a.hidden-ts').click();
   // Replace with actual selector
  validateLoanInputs();
});
 
it('Loan Tenure Calculator - UI Validation', () => {
  cy.get('#loan-tenure-calc > .hidden-ts').click(); // Replace with actual selector
  validateLoanInputs();
});
 
});