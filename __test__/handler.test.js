import {
  getSentimentMessage,
  getSummaryMessage,
} from "../src/client/js/handler.js";

describe("Client-side functions", () => {
  describe("getSentimentMessage", () => {
    test("returns correct sentiment message for positive score tag", () => {
      const message = getSentimentMessage("P");
      expect(message).toBe("positive");
    });

    test("returns correct sentiment message for negative score tag", () => {
      const message = getSentimentMessage("N");
      expect(message).toBe("negative");
    });

    test("returns correct sentiment message for neutral score tag", () => {
      const message = getSentimentMessage("NEU");
      expect(message).toBe("neutral");
    });

    test("returns empty string for unknown score tag", () => {
      const message = getSentimentMessage("UNKNOWN");
      expect(message).toBe("");
    });
  });

  describe("Client-side functions", () => {
    describe("getSummaryMessage", () => {
      test("returns correct summary message for AGREEMENT status", () => {
        const analysisResult = {
          score_tag: "P",
          agreement: "AGREEMENT",
        };
        const message = getSummaryMessage(analysisResult);
        expect(message).toBe("The overall sentiment of the text is positive.");
      });

      test("returns correct summary message for DISAGREEMENT status", () => {
        const analysisResult = {
          score_tag: "P",
          agreement: "DISAGREEMENT",
        };
        const message = getSummaryMessage(analysisResult);
        expect(message).toBe(
          "There is disagreement in sentiment analysis results for different entities/themes in the text.",
        );
      });

      test("returns correct summary message for NO AGREEMENT status", () => {
        const analysisResult = {
          score_tag: "P",
          agreement: "NO AGREEMENT",
        };
        const message = getSummaryMessage(analysisResult);
        expect(message).toBe(
          "There is no clear agreement in sentiment analysis results for different entities/themes in the text.",
        );
      });

      test("returns correct summary message for UNKNOWN status", () => {
        const analysisResult = {
          score_tag: "P",
          agreement: "UNKNOWN",
        };
        const message = getSummaryMessage(analysisResult);
        expect(message).toBe("Unknown agreement status.");
      });
    });
  });
});
