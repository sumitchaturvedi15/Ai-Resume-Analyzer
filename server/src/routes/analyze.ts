import express from "express";
import OpenAI from "openai";

export const analyzeResume = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("API HIT");

    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const { resumeText, role, experience } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: "Resume text is required" });
    }

    const prompt = `
Analyze this resume for the role: "${role}"
Candidate experience: "${experience}"

Resume:
${resumeText}

Return ONLY valid JSON (no text, no backticks):
{
  "atsScore": number,
  "missingSkills": string[],
  "improvements": string[],
  "jobRoles": string[]
}

IMPORTANT:
- Tailor analysis strictly for the given role
- Consider experience level
- Suggest realistic improvements
`;

    const response = await openai.chat.completions.create({
      model: "openai/gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    console.log("RAW RESPONSE:", response);

    const content =
      response.choices?.[0]?.message?.content || "";

    console.log("AI CONTENT:", content);

    let parsedContent;

    try {
      parsedContent = JSON.parse(content);
    } catch (parseError) {
      console.log("❌ JSON PARSE FAILED");

      return res.json({
        result: content || "No response from AI",
      });
    }

    res.json({
      result: parsedContent,
    });

  } catch (err: any) {
    console.error("❌ BACKEND ERROR:", err?.response || err);
    res.status(500).json({ error: "Something went wrong" });
  }
};