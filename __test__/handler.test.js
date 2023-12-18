import { summarize, sendSummarizeRequest } from "../src/client/js/handler.js";

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        success: true,
        data: { status: { code: "0" }, summary: "Mocked summary" },
      }),
  }),
);

// Test for sendSummarizeRequest function
describe("sendSummarizeRequest", () => {
  it("should send a summarize request and return data", async () => {
    const result = await sendSummarizeRequest("sample text", 3);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/sum_api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "sample text", sentences: 3 }),
    });

    expect(result).toEqual({
      success: true,
      data: { status: { code: "0" }, summary: "Mocked summary" },
    });
  });
});

// Test for summarize function
describe("summarize", () => {
  it("should update result element with summary", async () => {
    document.body.innerHTML =
      '<div id="text-box"></div><div id="number-of-sentences"></div><div id="result"></div>';

    document.getElementById("text-box").value = "sample text";
    document.getElementById("number-of-sentences").value = 3;

    await summarize(new Event("submit"));

    expect(document.getElementById("result").textContent).toEqual(
      "Mocked summary",
    );
  });

  // Add more test cases for different scenarios
});
