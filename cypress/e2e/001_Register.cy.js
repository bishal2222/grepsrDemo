import {Register,invalidRegister} from "../support/register"

var register = new Register()
var invalid_register = new invalidRegister()

describe('Register User',()=>{
    it('TC01: Register user with valid cred',()=>{
        register.visit()
        register.signIn()
        register.submit()
        cy.TestPass()
    })

    it('TC02: Register user with invalid cred',()=>{
        invalid_register.visit()
        invalid_register.invalidSignIn()
        invalid_register.submit()
        invalid_register.errorMessage()
        cy.TestPass()
    })

    it('TC03: User Exits',()=>{
        register.visit()
        register.signIn()
        register.submit()
        register.userExists()
        cy.TestPass()
    })

})

