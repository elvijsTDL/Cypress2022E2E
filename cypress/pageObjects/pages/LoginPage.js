import {BasePage} from "../BasePage";

//CSS selector with data-test attribute - Best way to find elements if available
const USERNAME_FIELD = "[data-test=username]"
//Ids next best thing after having a specific testing attribute
const PASSWORD_FIELD = "#password"
const SUBMIT_BUTTON = ".submit-button"
const ERROR_MESSAGE = "[data-test=error]"
const CLOSE_ERROR_BUTTON = "[data-test=error] > button"

export class LoginPage extends BasePage {

    static openLoginPage(){
        this.openBasePage()
    }

    static inputUsername(username){
        this.type(USERNAME_FIELD,username)
    }

    static inputPasswordAndSubmit(password = "secret_sauce") {
        this.type(PASSWORD_FIELD,password)
        this.click(SUBMIT_BUTTON)
    }

    static verifyErrorMessage(text) {
        this.hasText(ERROR_MESSAGE,text)
    }

    static clickSubmitButton(){
        this.click(SUBMIT_BUTTON)
    }

    static closeAndVerifyNoErrorMessage() {
        this.click(CLOSE_ERROR_BUTTON)
        this.doesNotExist(ERROR_MESSAGE)
    }
}