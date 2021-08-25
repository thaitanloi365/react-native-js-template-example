const UserTokenActions = require("./UserTokenActions")
// @ponicode
describe("UserTokenActions.default.saveUserToken", () => {
    test("0", () => {
        let callFunction = () => {
            UserTokenActions.default.saveUserToken("oAuthToken")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            UserTokenActions.default.saveUserToken("u7djsl186ksk99-DsklLk89")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            UserTokenActions.default.saveUserToken(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
