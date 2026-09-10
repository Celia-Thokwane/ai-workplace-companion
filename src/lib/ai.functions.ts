import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";

import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const MODEL = "google/gemini-3.8-flash";

const SYSTEM =
  "You are a professional workplace productivity assistant. " +
  "Always produce clear, well-structured, business-appropriate output. " +
  "Use plain text with simple headings and bullet points (no markdown tables, no code fences). " +
  "Base everything strictly on the details the user provides; never invent facts, names, or figures. " +
  "If a detail is missing, use a clearly marked placeholder in square brackets.";

async function run(prompt: string) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured yet.");

  const gateway = createLovableAiGatewayProvider(key);
  try {
    const result = await generateText({
      model: gateway(MODEL),
      system: SYSTEM,
      prompt,
    });
    if (!result.text.trim()) throw new Error("The AI returned an empty response. Try again.");
    return { text: result.text };
  } catch (error) {
    console.error("AI generation failed", error);
    throw new Error(
      error instanceof Error && error.message
        ? error.message
        : "The AI service is unavailable right now. Please try again.",
    );
  }
}

const EmailInput = z.object({
  purpose: z.string().min(1),
  recipient: z.string().default(""),
  keyPoints: z.string().default(""),
  callToAction: z.string().default(""),
  tone: z.enum(["Formal", "Friendly", "Persuasive"]),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) =>
    run(
      `Write one complete professional workplace email.

Purpose: ${data.purpose}
Recipient / context: ${data.recipient || "not specified"}
Key points to include: ${data.keyPoints || "not specified"}
Call to action: ${data.callToAction || "none"}
Tone: ${data.tone}

Format exactly like this, with nothing else before or after:
Subject: <concise subject line>

<greeting>

<body paragraphs, short and scannable; use bullet points for lists of key points>

<closing line>
<sign-off>
[Your Name]`,
    ),
  );

const PlannerInput = z.object({
  goals: z.string().default(""),
  tasks: z.string().min(1),
  availableTime: z.string().default(""),
  range: z.enum(["Daily", "Weekly"]),
});

export const generatePlan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => PlannerInput.parse(input))
  .handler(async ({ data }) =>
    run(
      `Create a realistic ${data.range.toLowerCase()} work schedule.

Main goals: ${data.goals || "not specified"}
Tasks (may include deadlines and priorities): ${data.tasks}
Available working time: ${data.availableTime || "a standard working day"}

Requirements:
- Prioritise tasks (High / Medium / Low) based on deadlines and impact.
- Allocate specific time blocks that fit within the available time, including short breaks.
- Do not over-schedule; leave buffer time.

Output format (plain text):
PRIORITISED TASKS
- [High] Task name - why it matters - estimated time

SCHEDULE
- 09:00-10:00 | Task name | Priority

NOTES
- 2 to 4 short practical suggestions.`,
    ),
  );

const ResearchInput = z.object({
  input: z.string().min(1),
  mode: z.enum(["Topic", "Text", "URL"]),
});

export const generateResearch = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ResearchInput.parse(input))
  .handler(async ({ data }) =>
    run(
      `Act as a research assistant for a working professional.

Input type: ${data.mode}
Input: ${data.input}

${
  data.mode === "URL"
    ? "You cannot open links. Base the briefing on what the URL and its topic indicate, and clearly note that the page content was not read."
    : ""
}

Output format (plain text with these headings):
SUMMARY
- 3 to 5 bullets

KEY FINDINGS
- bullets

INSIGHTS
- bullets

RECOMMENDATIONS
- practical next steps

CAVEATS
- what should be verified`,
    ),
  );
