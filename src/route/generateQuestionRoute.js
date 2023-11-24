const express = require("express")
const {generateQuestionPaper,generateQuestionPaperWithTopicPercentage} = require("../controller/questionPaperGenerator")

const router = express.Router()
router.post('/question',generateQuestionPaper)
router.post('/question/topic',generateQuestionPaperWithTopicPercentage)


module.exports = router
