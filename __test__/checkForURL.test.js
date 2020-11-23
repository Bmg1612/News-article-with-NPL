import { checkForURL } from "../src/client/js/urlChecker"
  
// A test suite may contain one or more related tests    
describe("Testing the regex functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the checkForURL() function", () => {
        //If returns true than it is working
        expect(checkForURL).toBeTruthy();
})});
