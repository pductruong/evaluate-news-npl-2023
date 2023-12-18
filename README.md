# Evaluate a News Article with NLP - App Project

---

## Overview

This project focuses on learning how to use the build tool Webpack, along with different loaders and plugins, to make a web app that uses an external API that evaluates the text of an article & posts the results in the DOM.
The website is built with purpose is summarize an paragrah using MeaningClould Summarization API.

---

## HTML

The HTML file is created simply for purpose of website

---

## CSS

I created two scss files for navigation bar and body of website

---

## Javascrip

### Server:

- Default port: 8080
- Endpoint API: `/sum_api`
- This server defines a route for handling HTTP POST requests to the /sum_api endpoint. It uses the async keyword to work with asynchronous operations. The request object (req) contains information about the incoming request(text fron UI), and the response object(result after summarize) is used to send the response back to the client.

### Client side:

Server side contains two function:

1. `summarize` function

- The summarize function is triggered when the user submits the form. It prevents the default form submission behavior, retrieves the text and number of sentences from the user input, and then calls the sendSummarizeRequest function.
- The result is displayed in the "result" section of the HTML page. If the API request is successful, the summary is displayed; otherwise, an error message is shown.

2. `sendSummarizeRequest` function

- The sendSummarizeRequest function sends a POST request to the server endpoint (http://localhost:8080/sum_api) with the provided text and number of sentences. It returns the JSON response from the server.

---

## How to run

1. Clone the project
2. Install dependencies

```
npm install
```

3. Run development environment; terminal command line:

```
npm run build-dev
```

4. Run JEST testing; terminal command line - npm test

```
npm test
```

5. Run production environment and build/update dist folder; terminal command line

```
npm run build-prod
```

6. Run local server (http://localhost:8081/); terminal command line:

```
npm run start
```
