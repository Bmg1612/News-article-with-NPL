import { checkForName } from "./nameChecker"

const handleSubmit = document.querySelector('#submit').addEventListener('click', function callbackFunction (event) {
    event.preventDefault();
    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    // checkForName(formText);
    console.log("::: Form Submitted :::");
    getApiKey()
    .then (data => {
        const apiKey = data.key;
    })

    async function getApiKey () {
        let req = await fetch('http://localhost:8081/api');
        try {
            let data = await req.json();
            return data;
        } catch (error){
            console.log('ERROR', error);
        }
}
});

export { handleSubmit }
