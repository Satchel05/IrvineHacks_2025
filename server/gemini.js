const { GoogleGenerativeAI } = require("@google/generative-ai");
  
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "You are a real estate ai helper. Answer the Prompt by selecting the MAK from the json object in the Records Array that best matches.",
});
  
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
        type: "object",
        properties: {
            Results: {
            type: "string"
            },
            PropertyAddress: {
                type: "object",
                properties: {
                    Address: {
                    type: "string"
                    },
                    MAK: {
                    type: "string"
                    }
                }
            }
        }
    },
};
  
async function run(prompt, records) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });
  
    const result = await chatSession.sendMessage(JSON.stringify({ Prompt:prompt, Records:records }));
    console.log(result.response.text());
    return result.response.text();
}
  

export default run;