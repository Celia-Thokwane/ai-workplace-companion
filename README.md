# AI Workplace Companion

Build a modern, responsive web application called AI Workplace Productivity Assistant.

The app is a frontend-only AI productivity tool for professionals. Do not create a registration, login, sign-up page, database, or backend. There should be no user authentication. All AI responses should be generated dynamically by AI.

Core AI Tools

1. Smart Email Generator

Generate professional workplace emails.

Inputs: purpose, recipient/context, key points, and optional call to action.

Tone options: Formal, Friendly, Persuasive.

Generate a complete email with subject, greeting, body, and closing.

Allow the user to edit, copy, clear, and regenerate the AI output.

2. AI Task Planner

Generate daily or weekly schedules from the user's goals and tasks.

Allow users to enter tasks, deadlines, priorities, and available time.

AI should prioritise tasks and create a realistic schedule.

Display tasks clearly with priority levels and suggested time allocations.

Allow users to edit, complete, delete, copy, and regenerate the plan.

3. AI Research Assistant

Summarise topics or user-provided articles/text.

Provide useful insights, key findings, and recommendations.

Allow the user to enter a topic, text, or article URL.

Provide structured AI output with headings and bullet points.

Allow users to edit, copy, clear, and regenerate results.

Dashboard & Navigation

Create a modern SaaS-style dashboard with:

Left sidebar navigation

Dashboard

Smart Email Generator

AI Task Planner

AI Research Assistant

Clean dashboard cards for the three tools

Simple productivity overview

Quick-action buttons

The sidebar should be responsive and collapse appropriately on smaller screens.

Design

Use a clean, modern, professional SaaS design.

Primary colours:

Light calming blue

Dark grey

Use:

Modern typography

Clean cards

Rounded corners

Subtle shadows

Professional icons

Good spacing

Clear visual hierarchy

Responsive desktop, tablet, and mobile layouts

Avoid excessive animations, bright colours, and unnecessary decorative elements.

AI Behaviour

Use structured AI prompts for each tool so that responses are relevant, professional, well-organised, and directly based on the user's inputs.

All generated content must be AI-generated. Do not rely on hard-coded example responses as the main functionality.

If an AI API is required but unavailable, create the frontend in a way that is ready for an AI API connection without building a backend, database, authentication system, or sign-up flow.

Editable Outputs

Every AI-generated result must appear in an editable area.

Provide actions such as:

Edit

Copy

Regenerate

Clear

Responsible AI

Include a small Responsible AI disclaimer:

"AI-generated content may contain errors or inaccuracies. Always review and verify AI outputs before using them for important professional decisions."

Important

Keep the implementation simple and frontend-focused because this is being built using a limited Lovable free plan.

Do not add:

Registration

Login

Sign-up

User accounts

Database

Backend dashboard

Payment system

Subscription system

Unnecessary pages

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/edbfd23a-3556-4bb2-a0f2-670a4ac3d3ad).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
