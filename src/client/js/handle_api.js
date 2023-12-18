async function summarize(event) {
  event.preventDefault();

  const text = document.getElementById("text-box").value;
  const sentences = document.getElementById("number-of-sentences").value;

  try {
    const response = await fetch("http://localhost:8080/sum_api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, sentences }), // Correct sentence key
    });

    const data = await response.json();

    if (data.success) {
      if (data.data.status.code == "0") {
        const summary_text = data.data.summary;
        document.getElementById("result").textContent = summary_text;
      } else {
        const msg = data.data.status.msg;
        document.getElementById("result").textContent = msg; // Use error message from response
      }
    } else {
      document.getElementById("result").textContent = "API is error"; // Use error message from response
    }
  } catch (error) {
    console.error(error);
    document.getElementById("result").textContent = "Error summarizing text";
  }
}

export { summarize };
