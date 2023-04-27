///<reference types = "cypress" />

describe('Log In form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/Identity/Account/Login');
  });

  it('requires all mandatory fields', () => {
// Try to submit the form with empty fields
    cy.get('#Input_Email').clear({force:true});
    cy.get('#Input_Password').clear({force:true});
    cy.get('#login-submit')
      .should('be.visible')
      .click({force:true});

// Verify that error messages appear next to mandatory fields
    cy.get('#Input_Email + [data-val-required]', {force:true})
      .should('be.visible')
      .and('contain', 'The Email field is required.');
    cy.get('#Input_Password + [data-val-required]', {force:true})
      .should('be.visible')
      .and('contain', 'The Password field is required.');
  });

  // Verify the other requirements
  it('displays an error message if invalid email is entered', () => {
    cy.get('#Input_Email').
      type('dragica.stricevic', {force : true}); // type an invalid email
    cy.get('#Input_Password')
      .type('1234567', {force : true}); // type a valid password

    cy.get('#login-submit')
      .click({force : true}); // click the Log in button

    cy.contains('The Email field is not a valid e-mail address.')
      .should('be.visible');
  });

  it('displays an error message if invalid password is entered', () => {
    cy.get('#Input_Email')
      .type('dragica.stricevic@gmail.com', {force : true}); // type a valid email
    cy.get('#Input_Password')
      .type('12345', {force : true}); // type an invalid password

    cy.get('#login-submit')
      .click({force : true}); // click the Log in button
  });

//All fields are valid - successful login
  it('login a user if all fields are valid', () => {
    cy.get('#Input_Email')
      .type('dragica.stricevic@gmail.com', {force : true}) // type a valid email

    cy.get('#Input_Password')
      .type('1234567', {force : true}) // type a valid password

    cy.get('#login-submit').click() // click the Log In button

    cy.location().should((loc) => {
    expect(loc.host).to.eq('http://localhost:5000/');
    expect(loc.pathname).to.eq('http://localhost:5000/Product')
})

    //cy.url().should('include', 'http://localhost:5000/') // assert that the URL contains the dashboard page path
  });
});




