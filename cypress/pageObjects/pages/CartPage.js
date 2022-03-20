import { BasePage } from "../BasePage";
import lodash from "lodash";

const ITEM_NAMES = ".inventory_item_name";
const REMOVE_BUTTONS = ".inventory_item_price + button";
const CHECKOUT_BUTTON = "[data-test=checkout]";
const FIRST_NAME_FIELD = "[data-test=firstName]";
const LAST_NAME_FIELD = "[data-test=lastName]";
const POSTAL_CODE_FIELD = "[data-test=postalCode]";
const CONTINUE_BUTTON = "[data-test=continue]";
const ERROR_MESSAGE = "[data-test=error]";
const ITEM_PRICES = ".inventory_item_price";
const ITEM_TOTAL_PRICE = ".summary_subtotal_label";
const FINISH_BUTTON = "[data-test=finish]";
const THANK_YOU_MESSAGE = ".complete-header";

export class CartPage extends BasePage {
  static verifyLastAddedItem() {
    cy.get(ITEM_NAMES)
      .first()
      .then((el) => {
        cy.get("@addedItem").then((addedItem) => {
          cy.wrap(el.text()).should("equal", addedItem);
        });
      });
  }

  static setupForCartsTests() {
    window.localStorage.setItem("cart-contents", "[0,1,2,3,4,5]");
    cy.loginWithCookies("standard_user", "/cart.html");
  }

  static removeAllItems() {
    cy.get(REMOVE_BUTTONS).click({ multiple: true });
  }

  static verifyEmptyCart() {
    this.doesNotExist(ITEM_NAMES);
  }

  static continueCheckout() {
    this.click(CHECKOUT_BUTTON);
  }

  static inputUserDataAndSubmit(user) {
    cy.fixture("users").then((fixture) => {
      this.type(FIRST_NAME_FIELD, fixture[user].firstName);
      this.type(LAST_NAME_FIELD, fixture[user].lastName);
      if (fixture[user].postCode) {
        this.type(POSTAL_CODE_FIELD, fixture[user].postCode);
      }
      this.click(CONTINUE_BUTTON);
    });
  }

  static verifyTotalPrice() {
    let priceArray = [];
    cy.get(ITEM_PRICES).each((product) => {
      priceArray.push(parseFloat(product.text().replace("$", "")));
    });
    cy.get(ITEM_TOTAL_PRICE).then((totalPrice) => {
      expect(totalPrice.text().replace("Item total: $", "")).to.eq(
        lodash.sum(priceArray).toString()
      );
    });
  }

  static finishCheckout() {
    this.click(FINISH_BUTTON);
  }

  static verifyThankYouMessage() {
    this.hasText(THANK_YOU_MESSAGE, "THANK YOU FOR YOUR ORDER");
  }
}
