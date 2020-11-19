import { checkForName } from "./nameChecker"

const handleSubmit = document.querySelector('#submit').addEventListener('click', function callbackFunction (event) {
    event.preventDefault();
    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    checkForName(formText);

    console.log("::: Form Submitted :::");
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(data) {
        document.getElementById('results').innerHTML = data.message;
    })
});

export { handleSubmit }
