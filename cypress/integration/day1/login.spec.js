import { LoginPage } from "../../pageObjects/pages/LoginPage";
import { BasePage } from "../../pageObjects/BasePage";
import { ProductsPage } from "../../pageObjects/pages/ProductsPage";

describe("Login test cases", () => {
  before(() => {
    cy.request(
      "POST",
      "https://discord.com/api/webhooks/955086226547965952/WuaK1GMcRDVkOexPEz60OETIorJOvQeX4L1ftw7jDn_NuDM_g5J20FkMAcY_mMoUmXPr",
      {
        username: "Selenium is dead",
        content: "Starting login test cases",
        tts: true,
      }
    );
  });

  after(() => {
    cy.request(
      "POST",
      "https://discord.com/api/webhooks/955086226547965952/WuaK1GMcRDVkOexPEz60OETIorJOvQeX4L1ftw7jDn_NuDM_g5J20FkMAcY_mMoUmXPr",
      {
        username: "Selenium is dead",
        content: "Ended login test cases",
        tts: true,
      }
    );
  });

  it("Logging in with a valid user", () => {
    LoginPage.openLoginPage();
    LoginPage.inputUsername("standard_user");
    LoginPage.inputPasswordAndSubmit();
    ProductsPage.inventoryContainerIsVisible();
  });

  it("Trying to log in with an invalid user", () => {
    LoginPage.openLoginPage();
    LoginPage.inputUsername("RandomNotRealUser");
    LoginPage.inputPasswordAndSubmit();
    LoginPage.verifyErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Trying to log in without any credential input", () => {
    LoginPage.openLoginPage();
    LoginPage.clickSubmitButton();
    LoginPage.verifyErrorMessage("Epic sadface: Username is required");
  });

  it("Trying to log in without inputting password", () => {
    LoginPage.openLoginPage();
    LoginPage.inputUsername("RandomNotRealUser");
    LoginPage.clickSubmitButton();
    LoginPage.verifyErrorMessage("Epic sadface: Password is required");
  });

  it("Trying to log in with a locked out user", () => {
    LoginPage.openLoginPage();
    LoginPage.inputUsername("locked_out_user");
    LoginPage.inputPasswordAndSubmit();
    LoginPage.verifyErrorMessage(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  it("Closing the error message", () => {
    LoginPage.openLoginPage();
    LoginPage.clickSubmitButton();
    LoginPage.closeAndVerifyNoErrorMessage();
  });

  it("User with cookies is logged in", () => {
    BasePage.loginWithoutUi();
    ProductsPage.inventoryContainerIsVisible();
  });

  it("Starting the tests in mobile view", () => {
    cy.viewport("iphone-x");
    BasePage.loginWithoutUi();
    ProductsPage.inventoryContainerIsVisible();
  });
});
