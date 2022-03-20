import { BasePage } from "../BasePage";

const INVENTORY_CONTAINER = "#inventory_container";
const ITEM_NAMES = ".inventory_item_name";
const ADD_TO_CART_BUTTONS = ".inventory_item_price + button";
const CART_BUTTON = "#shopping_cart_container";

export class ProductsPage extends BasePage {
  static inventoryContainerIsVisible() {
    this.isVisible(INVENTORY_CONTAINER);
  }

  static addFirstItemToTheCart() {
    this.clickFirst(ADD_TO_CART_BUTTONS);
    cy.get(ITEM_NAMES)
      .first()
      .then((el) => {
        cy.wrap(el.text()).as("addedItem");
      });
  }

  static goToCart() {
    this.click(CART_BUTTON);
  }

  static verifyRemoveButton() {
    cy.get(ADD_TO_CART_BUTTONS)
      .first()
      .should("have.text", "Remove")
      .and("have.css", "color", "rgb(71, 76, 85)");
  }
}
