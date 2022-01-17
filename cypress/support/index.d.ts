/// <reference types="cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Chainable {
    /**
     * Custom command to select an option in a dropdown
     * @example cy.get('select').selectByText('Text')
     */
    selectByText(text: string): Chainable<JQuery>;
  }
}
