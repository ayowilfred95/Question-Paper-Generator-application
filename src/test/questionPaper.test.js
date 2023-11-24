// File: __tests__/questionPaper.test.js

const {
    calculateTargetMarks,
    filterAndSortQuestions,
    selectQuestions,
    generateQuestionPaper,
    generateQuestionPaperWithTopicPercentage,
  } = require("../controller/questionPaperGenerator"); // Update the path accordingly
  
  const { loadQuestions } = require("../utils/questionStore");
  
  describe("calculateTargetMarks function", () => {
    test("calculates target marks correctly", () => {
      expect(calculateTargetMarks(100, 50)).toBe(50);
      expect(calculateTargetMarks(200, 25)).toBe(50);
      expect(calculateTargetMarks(150, 75)).toBe(113);
    });
  });
  
  describe("filterAndSortQuestions function", () => {
    const questions = [
      { difficulty: "Easy", marks: 10 },
      { difficulty: "Medium", marks: 20 },
      { difficulty: "Hard", marks: 30 },
    ];
  
    test("filters and sorts questions correctly", () => {
      expect(filterAndSortQuestions(questions, "Easy")).toEqual([
        { difficulty: "Easy", marks: 10 },
      ]);
  
      expect(filterAndSortQuestions(questions, "Medium")).toEqual([
        { difficulty: "Medium", marks: 20 },
      ]);
  
      expect(filterAndSortQuestions(questions, "Hard")).toEqual([
        { difficulty: "Hard", marks: 30 },
      ]);
    });
  });
 
  // You can add more tests for the other functions...
  
  describe("generateQuestionPaper function", () => {
    // Mocking loadQuestions function
    const loadQuestionsMock = jest.spyOn(require("../utils/questionStore"), 'loadQuestions');
    loadQuestionsMock.mockResolvedValue([]);
  
    test("generates question paper correctly", async () => {
      const req = {
        body: {
          totalMarks: 100,
          easyPercentage: 30,
          mediumPercentage: 40,
          hardPercentage: 30,
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await generateQuestionPaper(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
  
      // Add more expectations based on your logic...
    });
  
    // Restore the original loadQuestions function
    afterAll(() => {
      loadQuestionsMock.mockRestore();
    });
  });
  
  describe("generateQuestionPaperWithTopicPercentage function", () => {
    // Mocking loadQuestions function
    const loadQuestionsMock = jest.spyOn(require("../utils/questionStore"), 'loadQuestions');
    loadQuestionsMock.mockResolvedValue([]);
  
    test("generates question paper with topic percentages correctly", async () => {
      const req = {
        body: {
          totalMarks: 100,
          difficultyPercentages: { Easy: 30, Medium: 40, Hard: 30 },
          topicPercentages: { Topic1: 20, Topic2: 30, Topic3: 50 },
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await generateQuestionPaperWithTopicPercentage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
  
      // Add more expectations based on your logic...
    });
  
    // Restore the original loadQuestions function
    afterAll(() => {
      loadQuestionsMock.mockRestore();
    });
  });
  