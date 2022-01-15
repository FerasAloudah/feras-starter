/// <reference types="cypress" />

context('Index Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/en');
  });

  it('has title', () => {
    cy.contains('Home Page');
  });
});
