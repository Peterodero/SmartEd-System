 function evaluateAnsw(req, res){

    const responseData = req.body
    console.log(responseData)

    function calculateScore(data) { 
        let correctCount = 0;
        const userAnswers = data.answers;
        const totalQuestions = data.questions.length;
      
        data.questions.forEach((q, index) => {
            const userAnswer = userAnswers[index.toString()];
          if (userAnswer && userAnswer=== q.answer) {
            correctCount++;
          }
        });
      
        const scorePercentage = (correctCount / totalQuestions) * 100; 
      
        return `Final Score: ${scorePercentage.toFixed(0)}%`; //or ${correctCount}/${totalQuestions} or 
      }
      
      // Get and log the score
      const score = calculateScore(responseData);
      console.log(score);
      res.status(200).json({score})
}

module.exports = {
    evaluateAnsw
}