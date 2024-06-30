var token,note_id

class Api{
    healthCheck(){
        cy.request({
            method: 'GET',
            url:`${Cypress.env('api')}/health-check`
        } 
        ).then((responseBody)=>{
            cy.expect(responseBody.body.status).to.equal(200)
        })
       
    }

    registerUser(user_name,user_email,user_password){
        cy.request({
            method: 'POST',
            url:`${Cypress.env('api')}/users/register`,
            body:{
               name:user_name,
               email:user_email,
               password:user_password
            }
        } 
        ).then((responseBody)=>{
            cy.expect(responseBody.body.status).to.equal(201)
            cy.expect(responseBody.body.message).to.equal("User account created successfully")
            cy.expect(responseBody.body.data.email).to.equal(user_email)
        })
    }
    
    loginUser(user_email,user_password){
        cy.request({
            method: 'POST',
            url:`${Cypress.env('api')}/users/login`,
            body:{
               email:user_email,
               password:user_password
            }
        } 
        ).then((responseBody)=>{
            cy.expect(responseBody.body.status).to.equal(200)
            cy.expect(responseBody.body.message).to.equal("Login successful")
            token =  responseBody.body.data.token
        })         
    }

    getUserProfile(){
        cy.request({
            method: 'GET',
            url:`${Cypress.env('api')}/users/profile`,
            headers : {
                'x-auth-token' : token 
            }
        } 
        ).then((responseBody)=>{
            cy.expect(responseBody.body.status).to.equal(200)
            cy.expect(responseBody.body.message).to.equal("Profile successful")
        })
    }

    editUserProfile(user_name,user_phone,user_company){
        cy.request({
            method: 'PATCH',
            url:`${Cypress.env('api')}/users/profile`,
            headers: {
                'x-auth-token' : token 
            },
            body: {
                name: user_name,
                phone: user_phone,
                company: user_company
            } 
        } 
        ).then((responseBody)=>{
            cy.expect(responseBody.body.status).to.equal(200)
            cy.expect(responseBody.body.message).to.equal("Profile updated successful")
        }) 
    }

    forgotPassword(user_email){
        cy.request({
            method: 'POST',
            url:`${Cypress.env('api')}/users/forgot-password`,
            body: {
                email: user_email
            } 
        } 
        ).then((responseBody)=>{
            cy.expect(responseBody.body.status).to.equal(200)
            cy.expect(responseBody.body.message).to.equal(`Password reset link successfully sent to ${user_email}. Please verify by clicking on the given link`)
        }) 
    }

    verifyResetToken(user_reset_token){
        cy.request({
            method: 'POST',
            url:`${Cypress.env('api')}/users/verify-reset-password-token`,
            body: {
                token: user_reset_token
            }
        } 
        ).then((responseBody)=>{
            if(responseBody.body.status == 200){
                cy.expect(responseBody.body.status).to.equal(200)
                cy.expect(responseBody.body.message).to.equal("The provided password reset token is valid")
            }else{
                cy.log('error')
            }
        }) 
    }

    changePassword(user_password,user_newPassword){
        cy.request({
            method: 'POST',
            url:`${Cypress.env('api')}/users/change-password`,
            headers: {
                'x-auth-token' : token 
            },
            body: {
                currentPassword: user_password,
                newPassword: user_newPassword
            }
        } 
        ).then((responseBody)=>{
                cy.expect(responseBody.body.status).to.equal(200)
                cy.expect(responseBody.body.message).to.equal("The password was successfully updated")
            
        }) 
    }

    logoutUser(){
        cy.request({
            method: 'DELETE',
            url:`${Cypress.env('api')}/users/logout`,
            headers: {
                'x-auth-token' : token 
            }
        } 
        ).then((responseBody)=>{
                cy.expect(responseBody.body.status).to.equal(200)
                cy.expect(responseBody.body.message).to.equal("User has been successfully logged out")
            
        }) 
    }

    deleteAccount(){
        cy.request({
            method: 'DELETE',
            url:`${Cypress.env('api')}/users/delete-account`,
            headers: {
                'x-auth-token' : token 
            }
        } 
        ).then((responseBody)=>{
                cy.expect(responseBody.body.status).to.equal(200)
                cy.expect(responseBody.body.message).to.equal("Account successfully deleted")
            
        }) 
    }

    addNote(){
        cy.request({
            method: 'POST',
            url:`${Cypress.env('api')}/notes`,
            headers: {
                'x-auth-token' : token 
            },
            body:{
                'title':'test title one',
                'description':'test description one',
                'category':'Home'
            }
        } 
        ).then((responseBody)=>{
                cy.expect(responseBody.body.status).to.equal(200)
                cy.expect(responseBody.body.message).to.equal("Note successfully created")
                note_id = responseBody.body.data.id 
        }) 
    }

    getAllNotes(){
        cy.request({
            method: 'GET',
            url:`${Cypress.env('api')}/notes`,
            headers: {
                'x-auth-token' : token 
            }
        } 
        ).then((responseBody)=>{
                cy.expect(responseBody.body.status).to.equal(200)
                cy.expect(responseBody.body.message).to.equal("Notes successfully retrieved")
        }) 
    }

    getNote(){
        cy.request({
            method: 'GET',
            url:`${Cypress.env('api')}/notes/${note_id}`,
            headers: {
                'x-auth-token' : token 
            }
        } 
        ).then((responseBody)=>{
                cy.expect(responseBody.body.status).to.equal(200)
                cy.expect(responseBody.body.message).to.equal("Note successfully retrieved")
        }) 
    }

    updateNote(){
        cy.request({
            method: 'PUT',
            url:`${Cypress.env('api')}/notes/${note_id}`,
            headers: {
                'x-auth-token' : token 
            },
            body:{
                id:`${note_id}`,
                title:'updated title',
                description:'updated description',
                completed:false,
                category:'Personal'
            }
        } 
        ).then((responseBody)=>{
                cy.expect(responseBody.body.status).to.equal(200)
                cy.expect(responseBody.body.message).to.equal("Note successfully Updated")
                cy.expect(responseBody.body.data.id).to.equal(note_id)
        }) 
    }

    updateNoteStatus(){
        cy.request({
            method: 'PATCH',
            url:`${Cypress.env('api')}/notes/${note_id}`,
            headers: {
                'x-auth-token' : token 
            },
            body:{
                id:`${note_id}`,
                completed:true,
                
            }
        } 
        ).then((responseBody)=>{
                cy.expect(responseBody.body.status).to.equal(200)
                cy.expect(responseBody.body.message).to.equal("Note successfully Updated")
                cy.expect(responseBody.body.data.id).to.equal(note_id)
        }) 
    }

    deleteNote(){
        cy.request({
            method: 'DELETE',
            url:`${Cypress.env('api')}/notes/${note_id}`,
            headers: {
                'x-auth-token' : token 
            },
        } 
        ).then((responseBody)=>{
                cy.expect(responseBody.body.status).to.equal(200)
                cy.expect(responseBody.body.message).to.equal("Note successfully deleted")
        }) 
    }
}

export default Api