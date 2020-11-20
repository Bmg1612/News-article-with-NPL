import { checkForName } from "./nameChecker"

const handleSubmit = document.querySelector('#submit').addEventListener('click', function callbackFunction (event) {
    event.preventDefault();

    let formText = document.getElementById('name').value;
    const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?";
    let apiKey = "";
    // checkForName(formText);
    console.log("::: Form Submitted :::");
    getApiKey()
    .then (data => {
        apiKey = data.key;
        return apiKey;
    })
    .then (apiKey => {
        getTextAnalysis(baseUrl, apiKey, formText)
    });

    async function getApiKey () {
        let req = await fetch('http://localhost:8081/api');
        try {
            let data = await req.json();
            return data;
        } catch (error) {
            console.log('ERROR', error);
        }
    }

    async function getTextAnalysis (url, key, text) {
        let res = await fetch(`${url}key=${key}&of=json&txt=${text}.&model=general&lang=en`);
        try {
            let apiResponse = await res.json();
            console.log(apiResponse);
            return apiResponse;
        } catch (error) {
            console.log('ERROR', error);
        }
    }
});

export { handleSubmit }
