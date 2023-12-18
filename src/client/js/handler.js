async function summarize(event) {
  event.preventDefault();

  const text = document.getElementById("text-box").value;
  const sentences = document.getElementById("number-of-sentences").value;

  try {
    const data = await sendSummarizeRequest(text, sentences);

    if (data.success) {
      const resultElement = document.getElementById("result");

      if (data.data.status.code === "0") {
        resultElement.textContent = data.data.summary;
      } else {
        resultElement.textContent = data.data.status.msg;
      }
    } else {
      document.getElementById("result").textContent = "API is error";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("result").textContent = "Error summarizing text";
  }
}

async function sendSummarizeRequest(text, sentences) {
  const response = await fetch("http://localhost:8080/sum_api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, sentences }),
  });

  return await response.json();
}

export { summarize, sendSummarizeRequest };
