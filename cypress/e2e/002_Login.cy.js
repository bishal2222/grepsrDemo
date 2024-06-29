import {Login,invalidLogin} from "../support/login"

var login = new Login()
var invalid_login = new invalidLogin()

describe('login User',()=>{
    it('TC01: login user with valid cred',()=>{
        login.visit()
        login.logIn()
        login.submit()
        cy.TestPass()
    })

    it('TC02: login user with invalid cred',()=>{
        invalid_login.visit()
        invalid_login.invalidLogIn()
        invalid_login.submit()
        invalid_login.errorMessage()
        cy.TestPass()
    })

})

