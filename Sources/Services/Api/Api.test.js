const Api = require("./Api")
// @ponicode
describe("Api.default.login", () => {
    test("0", () => {
        let callFunction = () => {
            Api.default.login("TestUpperCase@Example.com", "NoWiFi4you")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            Api.default.login("TestUpperCase@Example.com", "accessdenied4u")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            Api.default.login("email@Google.com", "!Lov3MyPianoPony")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            Api.default.login("user1+user2@mycompany.com", "accessdenied4u")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            Api.default.login("something.example.com", "!Lov3MyPianoPony")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            Api.default.login(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
