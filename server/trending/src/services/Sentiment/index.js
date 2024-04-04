const nlp = require("compromise");

class SentimentAnalyzer {
  analyzeSentiment(text, subjects) {
    const sentimentResult = nlp(text).sentiment().out("score") > 0 ? 1 : -1;

    const subjectsFilter = subjects.filter((subject) =>
      text.toLowerCase().includes(subject.toLowerCase())
    );

    return {
      subjects: subjectsFilter,
      sentimentResult,
    };
  }

  analyzeSentiments(texts, subjects) {
    const allSentiments = texts.map((text) =>
      this.analyzeSentiment(text, subjects)
    );

    return allSentiments;
  }
}

module.exports = { SentimentAnalyzer };
