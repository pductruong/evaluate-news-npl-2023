async function summarize(event) {
  event.preventDefault();

  const text = document.getElementById("name").value;
  const sentences = document.getElementById("number-of-sentences").value;

  try {
    const response = await fetch("/sum_api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, sentences }), // Correct sentence key
    });

    const data = await response.json();

    if (data.success) {
      document.getElementById("summary-output").textContent = data.summary;
    } else {
      document.getElementById("summary-output").textContent = data.message; // Use error message from response
    }
  } catch (error) {
    console.error(error);
    document.getElementById("summary-output").textContent =
      "Error summarizing text";
  }
}

export { summarize };
