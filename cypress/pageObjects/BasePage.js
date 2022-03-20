export class BasePage {
  static click(selector) {
    cy.get(selector).click();
  }

  static hasText(selector, text) {
    cy.get(selector).should("have.text", text);
  }

  static doesNotExist(selector) {
    cy.get(selector).should("not.exist");
  }

  static isVisible(selector) {
    cy.get(selector).should("be.visible");
  }

  static type(selector, text) {
    cy.get(selector).type(text);
  }

  static openBasePage() {
    cy.visit("/");
  }

  static loginWithoutUi() {
    cy.loginWithCookies("standard_user");
  }

  static clickFirst(selector) {
    cy.get(selector).first().click();
  }

  static selectOption(selector, option) {
    cy.get(selector).select(option);
  }
}
