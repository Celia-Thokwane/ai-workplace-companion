# AI Workplace Productivity Assistant

## Project Overview

**AI Workplace Productivity Assistant** is a modern, responsive SaaS-style web application designed to help professionals automate everyday workplace tasks using AI.

The application brings three productivity tools together in one dashboard:

- **Smart Email Generator** — creates professional workplace emails in different tones.
- **AI Task Planner** — organises tasks, prioritises workloads, and generates daily or weekly schedules.
- **AI Research Assistant** — summarises topics or articles and provides key insights and recommendations.

The project focuses on creating a simple, professional, user-friendly AI experience without requiring user registration, authentication, or a traditional backend.

## Features Implemented

### Smart Email Generator
- Generates professional workplace emails.
- Supports three tones:
  - Formal
  - Friendly
  - Persuasive
- Provides structured prompts for generating email content.
- AI-generated results can be edited.
- Generated content can be copied for use outside the application.

### AI Task Planner
- Allows users to enter tasks and requirements.
- Generates daily or weekly schedules.
- Prioritises tasks according to importance and urgency.
- Displays AI-generated plans in an organised format.
- Generated plans can be edited.

### AI Research Assistant
- Allows users to enter a research topic or article/content.
- Generates summaries using AI.
- Provides key insights and recommendations.
- AI-generated results can be edited.

### Dashboard & User Experience
- Modern SaaS-style dashboard.
- Sidebar navigation between productivity tools.
- Responsive design for desktop, tablet, and mobile.
- Clean light-grey and dark-grey visual design.
- Consistent typography throughout the application.
- AI-generated responses use the same font as the rest of the application.
- Clear input, output, loading, and empty states.
- No registration, sign-up, login, or authentication pages.

### Responsible AI
- Includes a Responsible AI disclaimer.
- Reminds users to review AI-generated information for accuracy, context, bias, relevance, and appropriateness.
- Encourages human judgement when using AI-generated content professionally.

## Technologies and Tools Used

- **Lovable** — used to design and build the application.
- **React** — component-based frontend application structure.
- **Vite** — frontend development and build tooling.
- **Tailwind CSS** — responsive styling and UI design.
- **JavaScript / TypeScript** — application logic and interactivity.
- **Generative AI / AI prompting** — used to generate emails, task plans, summaries, insights, and recommendations.
- **GitHub** — source-code version control and project repository.
- **Responsive Web Design** — ensures the application adapts to different screen sizes.

> **Note:** The exact framework/library versions are defined by the project's dependency files and configuration.

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project folder

```bash
cd <project-folder>
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

After the development server starts, open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## Project Structure

The project follows a modern frontend application structure, with reusable components and separate sections for the productivity tools.

Typical areas include:

```text
src/
├── components/
├── pages/
├── assets/
├── App.*
└── main.*
```

The exact structure may vary depending on the generated project configuration.

## Project Goals

The main goals of this project are to demonstrate how generative AI can support workplace productivity by helping users:

- Write professional communications.
- Organise and prioritise tasks.
- Plan their workday or week.
- Research and summarise information.
- Generate useful insights and recommendations.
- Work collaboratively with AI while maintaining human oversight.

## Responsible Use

AI-generated content may contain inaccuracies, omissions, or unintended bias. Users should review and verify AI-generated information before relying on it for professional communication, research, planning, or important decisions.

This application is intended as a productivity assistant and does not replace professional judgement.

## Future Improvements

Possible future enhancements include:

- Calendar integration.
- Saving and exporting generated content.
- Additional email tones and templates.
- Document and file analysis.
- Research source management.
- Task reminders and notifications.
- AI conversation history.
- Additional workplace productivity tools.

## License

This project is available for educational and portfolio purposes.
