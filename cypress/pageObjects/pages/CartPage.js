import { BasePage } from "../BasePage";

const ITEM_NAMES = ".inventory_item_name";
const REMOVE_BUTTONS = ".inventory_item_price + button";
const CHECKOUT_BUTTON = "[data-test=checkout]"
const FIRST_NAME_FIELD = "[data-test=firstName]"
const LAST_NAME_FIELD = "[data-test=lastName]"
const POSTAL_CODE_FIELD = "[data-test=postalCode]"
const CONTINUE_BUTTON = "[data-test=continue]"
const ERROR_MESSAGE = "[data-test=error]"

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
        window.localStorage.setItem("cart-contents", "[0,1,2,3,4,5]")
        cy.loginWithCookies("standard_user","/cart.html")
    }

    static removeAllItems() {
        cy.get(REMOVE_BUTTONS).click({multiple:true})
    }

    static verifyEmptyCart() {
        this.doesNotExist(ITEM_NAMES)
    }

    static continueCheckout() {
        this.click(CHECKOUT_BUTTON)
    }

    static inputUserDataAndSubmit(user) {
        cy.fixture("users").then(fixture => {
            this.type(FIRST_NAME_FIELD,fixture[user].firstName)
            this.type(LAST_NAME_FIELD,fixture[user].lastName)
            if(fixture[user].postCode) {
                this.type(POSTAL_CODE_FIELD,fixture[user].postCode)
            }
            this.click(CONTINUE_BUTTON)
        })
    }
}
