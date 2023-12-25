async function analyzeSentiment(event) {
  event.preventDefault();
  try {
    const textToAnalyze = document.getElementById("text-box").value;
    console.log("Debug1");
    const sentimentResponse = await fetch(
      "http://localhost:8080/analyzeSentiment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textToAnalyze }),
      },
    );

    const sentimentAnalysisResult = await sentimentResponse.json();
    console.log(sentimentAnalysisResult);
    updateUIWithSentimentAnalysis(
      sentimentAnalysisResult.sentimentAnalyzeResult,
    );
  } catch (error) {
    console.error("Error making API request:", error.message);
  }
}

function updateUIWithSentimentAnalysis(sentimentAnalysisResult) {
  const sentimentAnalysisContainer =
    document.getElementById("sentimentAnalysis");
  sentimentAnalysisContainer.innerHTML = "<h2>Sentiment Analysis</h2>";
  sentimentAnalysisContainer.innerHTML += `<p>Score Tag: ${sentimentAnalysisResult.score_tag}</p>`;
  sentimentAnalysisContainer.innerHTML += `<p>Agreement: ${sentimentAnalysisResult.agreement}</p>`;
  sentimentAnalysisContainer.innerHTML += `<p>Subjectivity: ${sentimentAnalysisResult.subjectivity}</p>`;
  sentimentAnalysisContainer.innerHTML += `<p>Irony: ${sentimentAnalysisResult.irony}</p>`;
  sentimentAnalysisContainer.innerHTML += `<p>Confidence: ${sentimentAnalysisResult.confidence}%</p>`;

  // Provide a more detailed sentiment message based on the score tag
  const sentimentMessageElement = document.createElement("p");
  sentimentMessageElement.innerText = getSentimentMessage(
    sentimentAnalysisResult.score_tag,
  );
  sentimentAnalysisContainer.appendChild(sentimentMessageElement);

  // Display sentiment categories
  if (
    sentimentAnalysisResult.sentimented_entity_list &&
    sentimentAnalysisResult.sentimented_entity_list.length > 0
  ) {
    sentimentAnalysisContainer.innerHTML += "<h3>Sentimented Entities</h3>";
    sentimentAnalysisResult.sentimented_entity_list.forEach((entity) => {
      sentimentAnalysisContainer.innerHTML += `<p>${entity.form} - ${entity.type}: ${entity.score_tag}</p>`;
    });
  }

  // Display polarity details
  if (
    sentimentAnalysisResult.sentimented_concept_list &&
    sentimentAnalysisResult.sentimented_concept_list.length > 0
  ) {
    sentimentAnalysisContainer.innerHTML += "<h3>Sentimented Concepts</h3>";
    sentimentAnalysisResult.sentimented_concept_list.forEach((concept) => {
      sentimentAnalysisContainer.innerHTML += `<p>${concept.form} - ${concept.type}: ${concept.score_tag}</p>`;
    });
  }

  // Display sentiment themes
  if (
    sentimentAnalysisResult.sentimented_theme_list &&
    sentimentAnalysisResult.sentimented_theme_list.length > 0
  ) {
    sentimentAnalysisContainer.innerHTML += "<h3>Sentimented Themes</h3>";
    sentimentAnalysisResult.sentimented_theme_list.forEach((theme) => {
      sentimentAnalysisContainer.innerHTML += `<p>${theme.form}: ${theme.score_tag}</p>`;
    });
  }

  // Display sentiment phrases
  if (
    sentimentAnalysisResult.sentimented_phrase_list &&
    sentimentAnalysisResult.sentimented_phrase_list.length > 0
  ) {
    sentimentAnalysisContainer.innerHTML += "<h3>Sentimented Phrases</h3>";
    sentimentAnalysisResult.sentimented_phrase_list.forEach((phrase) => {
      sentimentAnalysisContainer.innerHTML += `<p>${phrase.text}: ${phrase.score_tag}</p>`;
    });
  }

  // Display sentiment agreement details
  if (
    sentimentAnalysisResult.sentiment_agreement_list &&
    sentimentAnalysisResult.sentiment_agreement_list.length > 0
  ) {
    sentimentAnalysisContainer.innerHTML +=
      "<h3>Sentiment Agreement Details</h3>";
    sentimentAnalysisResult.sentiment_agreement_list.forEach((agreement) => {
      sentimentAnalysisContainer.innerHTML += `<p>${agreement.sentimented_entity} - ${agreement.sentiment_tag}: ${agreement.agreement}</p>`;
    });
  }

  // Provide a summary message based on sentiment scores
  const summaryMessageElement = document.createElement("p");
  summaryMessageElement.innerText = getSummaryMessage(sentimentAnalysisResult);
  sentimentAnalysisContainer.appendChild(summaryMessageElement);
}

function getSummaryMessage(sentimentAnalysisResult) {
  const scoreTag = sentimentAnalysisResult.score_tag;
  const agreement = sentimentAnalysisResult.agreement;

  if (agreement === "AGREEMENT") {
    return `The overall sentiment of the text is ${getSentimentMessage(
      scoreTag,
    ).toLowerCase()}.`;
  } else if (agreement === "DISAGREEMENT") {
    return "There is disagreement in sentiment analysis results for different entities/themes in the text.";
  } else if (agreement === "NO AGREEMENT") {
    return "There is no clear agreement in sentiment analysis results for different entities/themes in the text.";
  } else {
    return "Unknown agreement status.";
  }
}

function getSentimentMessage(scoreTag) {
  switch (scoreTag) {
    case "P":
      return "positive";
    case "N":
      return "negative";
    case "NEU":
      return "neutral";
    default:
      return "";
  }
}

export { analyzeSentiment, getSummaryMessage, getSentimentMessage };
