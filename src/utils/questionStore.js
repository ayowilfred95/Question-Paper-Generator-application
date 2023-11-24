const { readFileSync } = require("fs");
const path = require("path");
const questionsPath = path.join(__dirname, "../store/questions.json");

const loadQuestions = () => {
  try {
    const data = readFileSync(questionsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading questions:", error.message);
    throw error;
  }
};

module.exports = { loadQuestions };
