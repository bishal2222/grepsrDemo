class Notes{
    addNote(){
        cy.get('button[data-testid="add-new-note"]').click()
        cy.get('[data-testid="note-category"]').select('Home')
        cy.fixture('note').then((note)=>{
            cy.get('[data-testid="note-title"]').type(note.title)
            cy.get('[data-testid="note-description"]').type(note.description)
        })
    }

    submitNote(){
        cy.get('button[data-testid="note-submit"]').click()
    }

    updateNote(){
        cy.get('[data-testid="notes-list"]').each(()=>{
            cy.fixture('note').then((note)=>{
                var x = cy.get('[data-testid="note-card-title"]').then(($x)=>{
                    var title = $x.text()
                    if (title == note.title){
                            cy.get('[data-testid="note-edit"]').click()
                            cy.get('[data-testid="note-category"]').select('Work')
                            cy.get('[data-testid="note-title"]').clear().type(note.update_title)
                            cy.get('[data-testid="note-description"]').clear().type(note.update_description)    
                        }
                })
               
            })
      
        })
    }

    submitUpdateNote(){
        cy.get('button[data-testid="note-submit"]').click()
        cy.fixture('note').then((note)=>{
        cy.contains(note.update_title).should('exist')
        })
    }
    
    deleteNote(){
        cy.get('[data-testid="notes-list"]').each(()=>{
            cy.fixture('note').then((note)=>{
                var x = cy.get('[data-testid="note-card-title"]').then(($x)=>{
                    var title = $x.text()
                    if (title == note.update_title){
                    cy.get('[data-testid="note-delete"]').click()
                    cy.get('[data-testid="note-delete-confirm"]').click()          
                }
            })
        cy.contains(note.update_title).should('not.exist')
            })
      
        })
    }


}

export default Notes;