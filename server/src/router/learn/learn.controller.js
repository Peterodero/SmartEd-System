require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY 
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

async function learnOnline(req,res){
     try {
         
            console.log("Fetching notes")
            const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                {
                    parts: [
                    {
                        text: `Generate notes on . Format the response as JSON. Please be consistent every time I ask you to generate questions.`
                    }
                    ]
                }
                ]
            },
            {
                headers: { 
                'Content-Type': 'application/json'
                }
            }
            );
    
            console.log(response.data)
    
    
            return res.json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
}
module.exports = {
    learnOnline
}