import { checkForURL } from "./urlChecker";

//Wait Dom to be loaded - Better for Jest testing
const handleSubmit = document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#submit").addEventListener("click", (event) => {
    event.preventDefault();

    const formText = document.getElementById("name").value;
    const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?";
    let apiKey = "";
    let data = {};

    document.getElementById("results").style.display = "none";
    document.querySelector(".loader").style.display = "inline-block";
    document.querySelector(".loader").scrollIntoView({ behavior: "smooth" });
    // Checking if the URL is valid
    if (checkForURL(formText)) {
      getApiKey()
        .then((apiKey) => getTextAnalysis(baseUrl, apiKey, formText))
        .then((apiResponse) => {
          return postData("/addText", {
            agreement: apiResponse.agreement,
            subjectivity: apiResponse.subjectivity,
            confidence: apiResponse.confidence,
            irony: apiResponse.irony,
          });
        })
        .then(() => updateUI());
    } else {
      alert("Invalid URL");
    }

    async function getApiKey() {
      const req = await fetch("/api");
      try {
        data = await req.json();
        apiKey = data.key;
        return apiKey;
      } catch (error) {
        alert("There was an error:", error.message);
      }
    }

    async function getTextAnalysis(url, key, formURL) {
      const res = await fetch(
        `${url}key=${key}&of=json.&model=general&lang=en&url=${formURL}`
      );

      try {
        const apiResponse = await res.json();
        if (apiResponse.status.code === "212") {
          throw new Error();
        } else {
          return apiResponse;
        }
      } catch (error) {
        return false;
      }
    }

    async function postData(url = "", data = {}) {
      const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      try {
        const newData = await res.json();
        return newData;
      } catch (error) {
        alert("There was an error:", error.message);
      }
    }

    async function updateUI() {
      const req = await fetch("/all");
      const results = document.getElementById("results");

      try {
        const textData = await req.json();
        if (Object.entries(textData).length === 0) {
          document.querySelector(".loader").style.display = "";
          results.style.display = "";
          results.innerHTML =
            "<h2 class= 'error'>Sorry. This page cannot be analyzed because it is blocked.</h2>";
          return false;
        } else {
          results.innerHTML = `
            <li class="results__item"><span class="api__title">URL:</span> ${formText}</li>
            <li class="results__item"><span class="api__title">Agreement:</span> ${textData.agreement};</li>
            <li class="results__item"><span class="api__title">Subjectivity:</span> ${textData.subjectivity};</li>
            <li class="results__item"><span class="api__title">Confidence:</span> ${textData.confidence}%;</li>
            <li class="results__item"><span class="api__title">Irony:</span> ${textData.irony}.</li>`;
          document.querySelector(".loader").style.display = "";
          document.getElementById("results").style.display = "";
          results.scrollIntoView({ behavior: "smooth" });
        }
      } catch (error) {
        alert("There was an error:", error.message);
      }
    }
  });
});

export { handleSubmit };
