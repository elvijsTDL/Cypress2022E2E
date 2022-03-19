import {BasePage} from "../../pageObjects/BasePage";
import {ProductsPage} from "../../pageObjects/pages/ProductsPage";
import {CartPage} from "../../pageObjects/pages/CartPage";

describe("Test cases with buying and adding to cart the products" , () => {
    it("Adding an item to the cart", () => {
        BasePage.loginWithoutUi()
        ProductsPage.addFirstItemToTheCart()
        ProductsPage.goToCart()
        CartPage.verifyLastAddedItem()
    })
})