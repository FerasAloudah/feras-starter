/// <reference types="cypress" />

context('Index Page', () => {
  beforeEach(() => {
    cy.visit('/en');
  });

  it('has title', () => {
    cy.contains('Home Page');
  });
});
