describe('CRUD operations for product', () => {
    it('should create, edit and delete a product', () => {
     
//Log In
    cy.visit('http://localhost:5000/');
      
    cy.get('#Input_Email')
      .type('dragica.stricevic@gmail.com', {force : true}) // type a valid email

    cy.get('#Input_Password')
      .type('1234567', {force : true}) // type a valid password

    cy.get('#login-submit').click() // click the Log In button

// Navigate to the "Create New Product" page
      cy.get('.text-center > :nth-child(2) > a').click();
      cy.get('p > .btn').click();
  
// Create a new product
      cy.get('#Product_Code').type('1234567new');
      cy.get('#Product_Description').type('Describe new product.');
      cy.get('#Product_Price').type('11.90');
      cy.get('#weightField').type('15.00');
      cy.get(':nth-child(5) > .btn').contains('Create').click();
  
// Edit the product
      cy.get('.card-body > .btn-primary').contains('Edit').click();
      cy.get('#Product_Code').clear().type('123');
      cy.get('#Product_Description').clear().type('Updated descr');
      cy.get('#Product_Price').clear().type('10');
      cy.get('#weightField').clear().type('15');
      cy.get(':nth-child(6) > .btn').contains('Save').click();
  
    // Delete the product
      cy.get(':nth-child(1) > .card > .card-body > .btn-danger').contains('Delete').click();
      cy.get('div > form > .btn').contains('Delete').click();

        });
     });
  
     
      
  