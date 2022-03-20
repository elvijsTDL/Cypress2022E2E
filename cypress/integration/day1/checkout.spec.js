import { BasePage } from "../../pageObjects/BasePage";
import { ProductsPage } from "../../pageObjects/pages/ProductsPage";
import { CartPage } from "../../pageObjects/pages/CartPage";
import { LoginPage } from "../../pageObjects/pages/LoginPage";

describe("Test cases with buying and adding to cart the products", () => {
  it("Adding an item to the cart", () => {
    BasePage.loginWithoutUi();
    ProductsPage.addFirstItemToTheCart();
    ProductsPage.goToCart();
    CartPage.verifyLastAddedItem();
  });

  it("Add to cart buttons turn into remove buttons", () => {
    BasePage.loginWithoutUi();
    ProductsPage.addFirstItemToTheCart();
    ProductsPage.verifyRemoveButton();
  });

  it("Sorting items by low to high prices", () => {
    BasePage.loginWithoutUi();
    ProductsPage.sortProductsBy("lohi");
    ProductsPage.verifyLowToHighPrices();
  });

  it("Sorting items by high to low prices", () => {
    BasePage.loginWithoutUi();
    ProductsPage.sortProductsBy("hilo");
    ProductsPage.verifyHighToLowPrices();
  });

  it("Removing items from the cart", () => {
    CartPage.setupForCartsTests();
    CartPage.removeAllItems();
    CartPage.verifyEmptyCart();
  });

  //Showcasing loading data from fixtures
  it("Doing checkout with Bob", () => {
    CartPage.setupForCartsTests();
    CartPage.continueCheckout();
    CartPage.inputUserDataAndSubmit("bob");
    CartPage.verifyTotalPrice();
    CartPage.finishCheckout();
    CartPage.verifyThankYouMessage();
  });

  it("Doing checkout with Alice", () => {
    CartPage.setupForCartsTests();
    CartPage.continueCheckout();
    CartPage.inputUserDataAndSubmit("alice");
    //Should be in common elements class , but would be overkill for this course
    LoginPage.verifyErrorMessage("Error: Postal Code is required");
  });
});
