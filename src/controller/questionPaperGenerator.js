const { loadQuestions } = require("../utils/questionStore");

/**
 * Calculates the target marks based on the total marks and percentage.
 * @param {number} totalMarks - Total marks available for the question paper.
 * @param {number} percentage - Percentage of total marks for a specific difficulty level.
 * @returns {number} - The calculated target marks.
 */
const calculateTargetMarks = (totalMarks, percentage) => {
  return Math.ceil((totalMarks * percentage) / 100);
};

/**
 * Filters and sorts questions based on the difficulty level.
 * @param {Array} questions - Array of questions.
 * @param {string} difficulty - Difficulty level ('Easy', 'Medium', or 'Hard').
 * @returns {Array} - Filtered and sorted questions for the specified difficulty level.
 */
const filterAndSortQuestions = (questions, difficulty) => {
  return questions
    .filter((question) => question.difficulty === difficulty)
    .sort((a, b) => a.marks - b.marks);
};

/**
 * Selects questions based on the remaining marks.
 * @param {Array} questions - Array of questions.
 * @param {number} remainingMarks - Remaining marks to be achieved.
 * @returns {Array} - Selected questions that meet the remaining marks criteria.
 */
const selectQuestions = (questions, remainingMarks) => {
  const selectedQuestions = [];
  while (remainingMarks > 0 && questions.length > 0) {
    const [currentQuestion, ...remainingQuestions] = questions;

    if (currentQuestion.marks <= remainingMarks) {
      selectedQuestions.push(currentQuestion);
      remainingMarks -= currentQuestion.marks;
    }

    questions = remainingQuestions;
  }
  return selectedQuestions;
};

/**
 * Generates a question paper based on the specified difficulty percentages.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const generateQuestionPaper = async (req, res) => {
  const { totalMarks, easyPercentage, mediumPercentage, hardPercentage } = req.body;

  try {
    const questions = await loadQuestions();

    const easyMarks = calculateTargetMarks(totalMarks, easyPercentage);
    const mediumMarks = calculateTargetMarks(totalMarks, mediumPercentage);
    const hardMarks = calculateTargetMarks(totalMarks, hardPercentage);

    const easyQuestions = filterAndSortQuestions(questions, 'Easy');
    const mediumQuestions = filterAndSortQuestions(questions, 'Medium');
    const hardQuestions = filterAndSortQuestions(questions, 'Hard');

    const totalEasyQuestion = selectQuestions(easyQuestions, easyMarks);
    const totalMediumQuestion = selectQuestions(mediumQuestions, mediumMarks);
    const totalHardQuestion = selectQuestions(hardQuestions, hardMarks);

    const result = [...totalEasyQuestion, ...totalMediumQuestion, ...totalHardQuestion];


    /**
     * @dev "had to do alot of console.log for debugging and logging each variables response"
     */

    console.log("Easy Marks:", easyMarks);
    console.log("Medium Marks:", mediumMarks);
    console.log("Hard Marks:", hardMarks);
    console.log("Final Result:", result);
    console.log("Total Marks:", result.reduce((total, question) => total + question.marks, 0));

    res.status(200).json({"Total Marks":result.reduce((total, question) => total + question.marks, 0),"Result":result});
  } catch (error) {
    console.error(error);
    res.status(500).json({details: error.message, success: false, error: "Internal Server Error" });
  }
};


    

/**
 * Generates a question paper with topic percentages.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const generateQuestionPaperWithTopicPercentage = async (req, res) => {
  try {
    const { totalMarks, difficultyPercentages, topicPercentages } = req.body;

    const questions = await loadQuestions();

    const calculateTargetMarks = (percentage) => Math.ceil((totalMarks * percentage) / 100);

    // Calculate the target marks for each difficulty level
    const difficultyMarks = {};
    Object.keys(difficultyPercentages).forEach((difficulty) => {
      difficultyMarks[difficulty] = calculateTargetMarks(difficultyPercentages[difficulty]);
    });

    // Calculate the target marks for each topic
    const topicMarks = {};
    Object.keys(topicPercentages).forEach((topic) => {
      topicMarks[topic] = calculateTargetMarks(topicPercentages[topic]);
    });

    // Filter and sort questions by ascending order of marks for each difficulty level and topic
    const difficultyQuestions = {};
    Object.keys(difficultyMarks).forEach((difficulty) => {
      difficultyQuestions[difficulty] = questions
        .filter((question) => question.difficulty === difficulty)
        .sort((a, b) => a.marks - b.marks);
    });

    const topicQuestions = {};
    Object.keys(topicMarks).forEach((topic) => {
      topicQuestions[topic] = questions
        .filter((question) => question.topic === topic)
        .sort((a, b) => a.marks - b.marks);
    });

    // Function to select questions
    const selectQuestions = (questions, remainingMarks, selectedQuestions = []) => {
      if (remainingMarks <= 0 || questions.length === 0) {
        return selectedQuestions;
      }

      const [currentQuestion, ...remainingQuestions] = questions;

      if (currentQuestion.marks <= remainingMarks) {
        return selectQuestions(
          remainingQuestions,
          remainingMarks - currentQuestion.marks,
          [...selectedQuestions, currentQuestion]
        );
      } else {
        return selectQuestions(
          remainingQuestions,
          remainingMarks,
          selectedQuestions
        );
      }
    };

    // Call the function with the sorted questions for each difficulty level and target marks
    const difficultyResults = {};
    Object.keys(difficultyMarks).forEach((difficulty) => {
      difficultyResults[difficulty] = selectQuestions(
        difficultyQuestions[difficulty],
        difficultyMarks[difficulty]
      );
    });

    // Call the function with the sorted questions for each topic and target marks
    const topicResults = {};
    Object.keys(topicMarks).forEach((topic) => {
      topicResults[topic] = selectQuestions(
        topicQuestions[topic],
        topicMarks[topic]
      );
    });

    // Combine the results for each difficulty level and topic
    const result = Object.values(difficultyResults).flatMap(
      (questions) => questions
    );
    Object.values(topicResults).forEach((questions) => {
      result.push(...questions.filter((q) => !result.includes(q)));
    });

    console.log("Total Marks:", result.reduce((total, question) => total + question.marks, 0));
    console.log(result);

    // Respond with the generated question paper
    res.status(200).json({
      success: true,
      totalMarks: result.reduce((total, question) => total + question.marks, 0),
      questions: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};



module.exports = { generateQuestionPaper,generateQuestionPaperWithTopicPercentage , calculateTargetMarks,
  filterAndSortQuestions,
  selectQuestions, };
