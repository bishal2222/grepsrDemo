import Notes from "../support/notes"
import {Login} from "../support/login"
 
var note = new Notes()
var login = new Login()

describe('Create, Update and Delete Notes',()=>{
    it('TC01: Creating Notes',()=>{
        login.visit()
        login.logIn()
        login.submit()
        note.addNote()
        note.submitNote()
        cy.TestPass()
    })
    it('TC02: Updating Notes',()=>{
        login.visit()
        login.logIn()
        login.submit()
        note.updateNote()
        note.submitUpdateNote()
        cy.TestPass()
    })

    it('TC03: Deleting Notes',()=>{
        login.visit()
        login.logIn()
        login.submit()
        note.deleteNote()
        cy.TestPass()
    })
})