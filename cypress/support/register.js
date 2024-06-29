class Register{
    visit(){
        cy.visit(Cypress.env('url'))
        cy.get('[data-testid="open-login-view"]').contains('Create an account').click()
        cy.url().should('include','/register')
        cy.get('div[id="root"]').should('contain','Register')
    }
    signIn(){
        cy.fixture('register').then((register)=>{
            cy.get('input[data-testid="register-email"]').type(register.valid_email)
            cy.get('input[data-testid="register-name"]').type(register.valid_name)
            cy.get('input[data-testid="register-password"]').type(register.valid_password)
            cy.get('input[data-testid="register-confirm-password"]').type(register.valid_confirmPassword)
        })   
    }

    userExists(){
        cy.get('div[id="root"]')
        .should('contain','An account already exists with the same email address') 
    }

    submit(){
        cy.get('button[data-testid="register-submit"]').click()
    }
}

class invalidRegister extends Register{
    invalidSignIn(){
        cy.fixture('register').then((register)=>{
            cy.get('input[data-testid="register-email"]').type(register.invalid_email)
            cy.get('input[data-testid="register-name"]').type(register.invalid_name)
            cy.get('input[data-testid="register-password"]').type(register.invalid_password)
            cy.get('input[data-testid="register-confirm-password"]').type(register.invalid_confirmPassword)
        }) 
    }
    errorMessage(){
        cy.get('div[id="root"]')
        .should('contain','Email address is invalid')
        .and('contain','Password should be between 6 and 30 characters')    
        .and('contain','User name should be between 4 and 30 characters')    
        .and('contain','User name should be between 4 and 30 characters')    
    }
    
}

export default {Register,invalidRegister};