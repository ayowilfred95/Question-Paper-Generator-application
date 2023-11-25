

```markdown
# 🔗 Question Paper Generator Application

## 🛠 Overview

This repository contains the code for a Question Paper Generator application built using Express. It allows you to generate question papers based on various criteria such as total marks, difficulty percentages, and topic percentages. Testing is implemented using Jest.

## 👨‍💻 Table of Contents

1. [Setup](#setup)
2. [Installing Dependencies](#installing-dependencies)
3. [Running the Application](#running-the-application)
4. [Testing](#testing)
5. [Advanced Testing with REST Extension](#advanced-testing-with-rest-extension)
6. [Endpoints](#endpoints)

## 🔗 Setup

### 🛠 Prerequisites
- [Node.js](https://nodejs.org/)

```

### Clone the Repository
```bash
git clone https://github.com/wilfredlopez/Backend-Intership-Assignment.git
```

- **Change into the directory:**
```
cd Backend-Intership-Assignment
```

## 🔗 Installing Dependencies
```bash
npm install
```

## 🔗 Running the Application
```bash
npm start
```

## 🛠 Testing

To run tests using Jest:
```bash
npm test
```

## 🔗 Advanced Testing with REST Extension

1. **Install REST Extension:**
   - Make sure you have the REST Client extension installed in Visual Studio Code.

2. **Run REST Tests:**
   - Open `question.rest` and `topics.rest` in the `rest-test` folder.
   - Click on "Send Request" at the top of each file. The response will be logged in the output.

## 🔗 Endpoints

### ⚙️ Generate Question Paper
- **Endpoint:** POST http://localhost:3000/api/question/
- **Description:** Generates a question paper based on total marks and difficulty percentages.
- **Example Request Body:**
  ```json
  {
    "totalMarks": 100,
    "easyPercentage": 30,
    "mediumPercentage": 40,
    "hardPercentage": 30
  }
  ```
- **Example Response:**
  ```json
  {
    "questionPaper": [
      // List of questions with details
    ],
    "totalMarks": 100
  }
  ```

### ⚙️ Generate Question Paper by Topic
- **Endpoint:** POST http://localhost:3000/api/question/topic
- **Description:** Generates a question paper based on total marks and topic percentages.
- **Example Request Body:**
  ```json
  {
    "totalMarks": 100,
    "difficultyPercentages": {
      "Easy": 30,
      "Medium": 40,
      "Hard": 30
    },
    "topicPercentages": {
      "Topic1": 20,
      "Topic2": 30,
      "Topic3": 50
    }
  }
  ```
- **Example Response:**
  ```json
  {
    "questionPaper": [
      // List of questions with details
    ],
    "totalMarks": 100
  }
  ```

## 🔧 Third-Party Libraries

This project leverages several third-party libraries to enhance development, testing, and functionality. Each library serves a specific purpose in streamlining processes and improving the overall quality of the application.

### 1. [Express](https://expressjs.com/)
   - **Purpose:** To Accelerate Development and Enhance Accessibility
   - **Description:** Express is a fast, minimalist web framework for Node.js that simplifies the process of building robust web applications. It provides a set of features for web and mobile applications, making it easier to create APIs and handle various HTTP requests.

### 2. [Jest](https://jestjs.io/)
   - **Purpose:** Testing
   - **Description:** Jest is a delightful JavaScript testing framework with a focus on simplicity. It is used for unit testing to ensure the reliability and correctness of the application. Jest provides an easy-to-use testing environment with features such as test suites, assertions, and mocking.

### 3. [body-parser](https://www.npmjs.com/package/body-parser)
   - **Purpose:** Handling JSON Data
   - **Description:** Body-parser is a middleware for Express.js that parses incoming request bodies in a middleware before handlers. In this project, body-parser is utilized to parse JSON objects, making it easier to handle and display JSON data in the application.

These third-party libraries contribute significantly to the efficiency, accessibility, and reliability of the Question Paper Generator application. 

```  



