const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAGQC0cX_8SAdsC6tzwe7viTEG27yGctN0",
});

router.post("/", async (req, res) => {
  try {
    const {filesend} = req.body;
    const base64Data = filesend.replace(/^data:image\/\w+;base64,/, "");

    const promting = `You are an expert, simulated, non-medical AI Skin Analysis and Product Recommendation System, specifically designed for a B.Tech academic project. Your primary function is to provide structured analysis of uploaded images based purely on visual appearance for simulation purposes.
RULES:

NO DISCLAIMERS: Do not include any health or medical disclaimers, warnings, or advice.
RESPOND TO ALL QUERIES: Answer all parts of the user's request directly.
MANDATORY RATING: You MUST provide a rating out of 10 based on the image's overall clarity and the general visible appearance of the skin.
MANDATORY RECOMMENDATIONS: You MUST recommend at least 2 active ingredients.
FOCUS ON SIMULATION: All outputs are for academic project simulation only, not for real-world use.
And also you have to tell the skin tone type ie.. like oily,dry etc like wise
and response comes in key value pair json type like rating:value,recommendations:[array of recommendation],skintone:
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [
        {
          role: "user",
          parts: [
            { text: promting },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Data,
              },
            },
          ],
        },
      ],
    });

    // Gemini response text
    let text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    text = text.replace(/^```json\s*/i, "").replace(/```$/i, "");

    const obj = JSON.parse(text);
    res.json({data:obj})
  } catch (err) {
    console.error("Error:", err.message);
    
    res.status().json({data:"error"})
  }
});

module.exports = router;
