  const { TestScheduler } = require('jest');
const { handleSubmit } = require('../src/client/index.js');

// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function. 
    test("Testing the handleSubmit() function", () => {
        //Simulating DOM environment for testing
        document.body.innerHTML = `
        <form class="page__form">
            <input class="input__text" id="name" type="text" name="input" placeholder="Put the URL here">
            <input class="input__button" type="submit" id="submit" name="submit" value="Submit">
        </form>
        <div class="main__bottom">
            <h2 class="heading__bottom">Form Results:</h2>
            <ul class="results__list" id="results"></ul>
        </div>
        `;

        let submit = document.querySelector('#submit');
        let formText = document.getElementById('name').value;
        let results = document.getElementById('results');
        let inputURL = formText;
        formText = 'https://thoughtbot.com/blog/5-useful-tips-for-a-better-commit-message';
        window.alert = () => {};
        
        //If returns undefined, with no errors, it is working
        expect(handleSubmit).toBeUndefined();
    })    

});