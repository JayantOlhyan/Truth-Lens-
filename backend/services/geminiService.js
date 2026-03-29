const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY);

const SYSTEM_PROMPT = `
You are TruthLens AI, an expert media authenticity and misinformation analyzer.
Analyze the provided content for misinformation, manipulation, deepfakes, or authenticity issues.
Be precise, evidence-based, and explain your reasoning clearly for non-expert users.

REQUIRED JSON RESPONSE SCHEMA:
{
  "trustScore": <integer 0-100>,
  "verdict": "REAL | SUSPICIOUS | FAKE",
  "summary": "<2-3 sentences, plain language>",
  "redFlags": ["<flag1>", "<flag2>", ...],
  "positiveSignals": ["<signal1>", ...],
  "claimType": "<News|Opinion|Satire|Misleading|Propaganda|Authentic Photo|AI Generated|Deepfake|Digitally Altered|Screenshot|Unknown>",
  "recommendation": "<1 sentence action for user>"
}
Reply with ONLY the JSON. No markdown, no backticks, no preamble.
`;

async function analyzeText(content) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `
  ${SYSTEM_PROMPT}

  Analyze this text for authenticity: 
  \n\n${content}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  
  // Extract JSON block using regex to handle potential conversational noise
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    text = jsonMatch[0];
  }
  
  return JSON.parse(text);
}

async function analyzeImage(imageBuffer, mimeType) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  ${SYSTEM_PROMPT}

  Analyze this image for authenticity and potential manipulation.
  `;

  const result = await model.generateContent([
    {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType
      }
    },
    { text: prompt }
  ]);

  const response = await result.response;
  let text = response.text();
  
  // Extract JSON block using regex
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    text = jsonMatch[0];
  }
  
  return JSON.parse(text);
}

module.exports = {
  analyzeText,
  analyzeImage
};
