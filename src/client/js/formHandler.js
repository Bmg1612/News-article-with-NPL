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
        return getTextAnalysis(baseUrl, apiKey, formText);
    })
    .then(apiResponse => {
        postData('/addText', {
            agreement: apiResponse.agreement,
            subjectivity: apiResponse.subjectivity,
            confidence: apiResponse.confidence,
            irony: apiResponse.irony
        });

    })
    .then(data => {
        updateUI();
    })

    async function getApiKey () {
        let req = await fetch('http://localhost:8081/api');
        try {
            let data = await req.json();
            return data;
        } catch (error) {
            alert("There was an error:", error.message);
        }
    }

    async function getTextAnalysis (url, key, formURL) {
        let res = await fetch(`${url}key=${key}&of=json.&model=general&lang=en&url=${formURL}`);
        try {
            let apiResponse = await res.json();
            return apiResponse;
        } catch (error) {
            alert("There was an error:", error.message);
        }
    }

    async function postData (url = '', data = {}) {
        let res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        try {
            let newData = await res.json();
            return newData
        } catch(error) {
            alert("There was an error:", error.message);
        }
    }

    async function updateUI () {
        let req = await fetch('/all');

        try {
            let textData = await req.json();
            document.getElementById('results').innerHTML = `
            <li class="results__item"><span class="api__title">URL:</span>${formText}</li>
            <li class="results__item"><span class="api__title">Agreement:</span> ${textData.agreement};</li>
            <li class="results__item"><span class="api__title">Subjectivity:</span> ${textData.subjectivity};</li>
            <li class="results__item"><span class="api__title">Confidence:</span> ${textData.confidence}%;</li>
            <li class="results__item"><span class="api__title">Irony:</span> ${textData.irony}.</li>`;
        } catch (error){
        alert("There was an error:", error.message);
        }
    }
});

export { handleSubmit }
