const userSchema = require('../../models/user.model')

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

let score = 0;

async function evaluateAnsw(req, res){

    const { answers,questions, studentId } = req.body
    // const studentId = req.user.userId;

    
    if ( !answers || !questions) {
      return res.status(400).json({ error: "Missing required fields" }); 
    }
    console.log(answers)
      
    score = calculateScore(answers, questions);
    console.log(`Score: ${score}`)

    const user = await userSchema.findByIdAndUpdate(
      "67ebdc09e5c797711dd72fe7",  // The user ID you want to update
      { score: Number(score) },  // The new score to update
      { new: true }  // This option returns the updated document
    );
    
    console.log(`USER : ${user}`)
  // .then(updatedUser => {
  //     if (!updatedUser) {
  //         return res.status(404).json({ error: 'User not found' });
  //     }

  //    return res.status(200).json({
  //         message: 'Score saved successfully',
  //         user: updatedUser,
  //     });
  // })
  // .catch(err => {
  //     return res.status(500).json({       
  //         error: 'Failed to save score',
  //         details: err,
  //     });
  // });

    await user.save();
    res.status(200).json({score})
}

module.exports = {
    evaluateAnsw
}