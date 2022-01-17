import '@testing-library/cypress/add-commands';

Cypress.Commands.add('selectByText', (text) => cy.findByText(text));
