const User = require('../../models/user.model')
async function evaluateAnsw(req, res){

    const {answers,questions,studentId} = req.body
    // const studentId = req.user.userId;

    
    if ( !answers || !questions) {
      return res.status(400).json({ error: "Missing required fields" }); 
  }
    console.log(answers)

    function calculateScore(data,questions) {  
        let correctCount = 0;
        const userAnswers = data;
        const totalQuestions = questions.length;
      
        questions.forEach((q, index) => {
            const userAnswer = userAnswers[index.toString()];
          if (userAnswer && userAnswer=== q.answer) {
            correctCount++;
          }
        });
      
        let scorePercentage = (correctCount / totalQuestions) * 100; 
        scorePercentage = scorePercentage.toFixed(0)
        return scorePercentage ; 
      }
      
      const score = calculateScore(answers, questions);


    User.findByIdAndUpdate(
      studentId,  
      { $push: { scores: { scores: score, studentId: studentId } } }, 
      { new: true } 
  )
  .then(updatedUser => {
      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
      }

     return res.status(200).json({
          message: 'Score saved successfully',
          user: updatedUser,
      });
  })
  .catch(err => {
      return res.status(500).json({
          error: 'Failed to save score',
          details: err,
      });
  });

    // await User.save();

      console.log(score);
      res.status(200).json({score})
}

module.exports = {
    evaluateAnsw
}