/// <reference types="cypress" />

context('Index Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/index');
  });

  it('has title', () => {
    cy.contains('Index Page');
  });
});
