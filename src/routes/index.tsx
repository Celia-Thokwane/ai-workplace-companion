import { Link, createFileRoute } from "@tanstack/react-router";
import { Mail, CalendarClock, BookOpenText, ArrowRight, Clock, Zap, ShieldCheck } from "lucide-react";

import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Workplace AI — Dashboard for Professionals" },
      {
        name: "description",
        content:
          "A clean AI workspace for professionals: write emails, plan your day, and summarise research in one place.",
      },
      { property: "og:title", content: "Workplace AI — Dashboard for Professionals" },
      {
        property: "og:description",
        content: "Write emails, plan your day, and summarise research with AI.",
      },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email",
    title: "Smart Email Generator",
    text: "Turn a few notes into a polished email with the right tone.",
    icon: Mail,
  },
  {
    to: "/planner",
    title: "AI Task Planner",
    text: "Prioritise your tasks and get a realistic time-blocked schedule.",
    icon: CalendarClock,
  },
  {
    to: "/research",
    title: "AI Research Assistant",
    text: "Summarise a topic or article into findings and next steps.",
    icon: BookOpenText,
  },
] as const;

const STATS = [
  { label: "Tools ready", value: "3", icon: Zap },
  { label: "Typical time saved", value: "~40 min/day", icon: Clock },
  { label: "Accounts needed", value: "None", icon: ShieldCheck },
] as const;

function Dashboard() {
  return (
    <AppLayout title="Dashboard" description="Your AI productivity overview">
      <section className="grid gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <Card key={s.label} className="flex flex-row items-center gap-4 p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <s.icon className="size-5" />
            </span>
            <span>
              <span className="block text-lg font-semibold text-foreground">{s.value}</span>
              <span className="block text-xs text-muted-foreground">{s.label}</span>
            </span>
          </Card>
        ))}
      </section>

      <h2 className="mt-8 mb-3 text-sm font-semibold text-foreground">AI tools</h2>
      <section className="grid gap-4 md:grid-cols-3">
        {TOOLS.map((t) => (
          <Card key={t.to} className="flex flex-col gap-4 p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <t.icon className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{t.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
            </div>
            <Button asChild className="mt-auto w-full">
              <Link to={t.to}>
                Open <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Card>
        ))}
      </section>

      <Card className="mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Quick actions</h3>
          <p className="text-sm text-muted-foreground">Jump straight into a common task.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link to="/email">Draft an email</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/planner">Plan my day</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/research">Summarise a topic</Link>
          </Button>
        </div>
      </Card>

      <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">
        AI-generated content may contain errors or inaccuracies. Always review and verify AI outputs
        before using them for important professional decisions.
      </p>
    </AppLayout>
  );
}
