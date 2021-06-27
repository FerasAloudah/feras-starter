/// <reference types="cypress" />

context('Index Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('has title', () => {
    cy.contains('Home Page');
  });
});
