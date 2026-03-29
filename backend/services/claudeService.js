const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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
  const response = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 800,
    temperature: 0,
    system: SYSTEM_PROMPT,
    messages: [
      { role: "user", content: `Analyze this text for authenticity: \n\n${content}` }
    ],
  });

  return JSON.parse(response.content[0].text);
}

async function analyzeImage(imageBuffer, mimeType) {
  const response = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 800,
    temperature: 0,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mimeType,
              data: imageBuffer.toString('base64'),
            },
          },
          { type: "text", text: "Analyze this image for authenticity and potential manipulation." }
        ],
      }
    ],
  });

  return JSON.parse(response.content[0].text);
}

module.exports = {
  analyzeText,
  analyzeImage
};
