import Api from "../../support/api"

var values
var api = new Api()


describe('API Automation',()=>{
    before(()=>{
        cy.clearCookies()
        cy.fixture('api').then((data)=>{
        values=data
        })
    })
    it('Health Check',()=>{
        api.healthCheck()
    })

    it('Register User',()=>{
        api.registerUser(values.name,values.email,values.password)
    })

    it('Login User',()=>{
        api.loginUser(values.email,values.password)  
    })

    it("Get User Profile",()=>{
        api.getUserProfile()
    })

    it("Edit User Profile",()=>{
        api.getUserProfile(values.name,values.phone,values.company)
    })

    it("Reset Password",()=>{
        api.forgotPassword(values.email)
    })

    // it("Verify Reset Password Token",()=>{
    //     api.verifyResetToken(values.reset_token)
    // })

    it("Change Password",()=>{
        api.changePassword(values.password,values.new_password)
    })

    it("Logout User",()=>{
        api.logoutUser()
        api.loginUser(values.email,values.new_password)
    })
    
    it("Delete Account",()=>{
        api.deleteAccount()
        api.registerUser(values.name,values.email,values.password)
        api.loginUser(values.email,values.password) 
    })

    it("Create Notes",()=>{     
        api.addNote()
    })

    it("Get All Notes",()=>{
        api.getAllNotes()
    })

    it("Get Note by ID",()=>{
        api.getNote()
    })

    it("Update Note",()=>{
        api.updateNote()
    })

    it("Update Note Status",()=>{
        api.updateNoteStatus()
    })

    it("Delete Note",()=>{
        api.deleteNote()
    })
})