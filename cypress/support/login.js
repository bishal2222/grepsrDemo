class Login{
    visit(){
        cy.visit(Cypress.env('url'))
        cy.get('[data-testid="open-login-view"]').contains('Login').click()
        cy.url().should('include','/login')
        cy.get('div[id="root"]').should('contain','Login')
    }
    logIn(){
        cy.fixture('register').then((register)=>{
            cy.get('input[data-testid="login-email"]').type(register.valid_email)
            cy.get('input[data-testid="login-password"]').type(register.valid_password)
        })   
    }

    submit(){
        cy.get('button[data-testid="login-submit"]').click()
    }
}

class invalidLogin extends Login {
    invalidLogIn(){
        cy.fixture('register').then((register)=>{
            cy.get('input[data-testid="login-email"]').type(register.valid_email)
            cy.get('input[data-testid="login-password"]').type(register.invalid_confirmPassword)
        }) 
    }
    errorMessage(){
        cy.get('div[id="root"]')
        .should('contain','Incorrect email address or password')
    }
}

export  default {Login, invalidLogin};