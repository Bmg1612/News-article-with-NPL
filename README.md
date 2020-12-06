# Evaluate a news article with Natural Language Processing

Project of the Nanodegree Course 'Front End Web Development'.

This project requires the creation of a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. NLP is the ability of an application to understand the human language, written or oral.

## Content

### Webpack

This project uses `Webpack` as the build tool. The configuration can be found on the repository. There are different setups for production and development environments.

### HTML, CSS, Sass

This project has an static HTML page, which is styled using Sass (later transformed in CSS with specific webpack loaders).

### Node.js and express

The server is set up using `express` and Node is used to install all the dependencies with `npm`.

### API

The API used to interpret the articles is [MeaningCloud Sentiment Analysis API](https://www.meaningcloud.com/developer/sentiment-analysis)

### Jest

The code is tested using [Jest](https://jestjs.io/en/). The directory "__test__" is for that purpose.

### Service Workers

I used [Workbox](https://developers.google.com/web/tools/workbox) to add offline support.

**Obs:** The API cannot be fetched offline. In this project the service worker is used only to mantain the webpage if there is no internet.

## Contributions

Any contributtions and/or suggestions are greatly appreciated.

## License
[MIT License](https://opensource.org/licenses/MIT).
