import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Mail, CalendarClock, BookOpenText, Menu, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Smart Email Generator", icon: Mail },
  { to: "/planner", label: "AI Task Planner", icon: CalendarClock },
  { to: "/research", label: "AI Research Assistant", icon: BookOpenText },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = pathname === item.to;
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary/12 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="size-4.5 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-1 py-1">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary/12 text-primary">
        <Sparkles className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-foreground">Workplace AI</span>
        <span className="block text-xs text-muted-foreground">Productivity Assistant</span>
      </span>
    </div>
  );
}

export function AppLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-68 flex-col gap-6 border-r border-border bg-sidebar p-4 lg:flex">
        <Brand />
        <NavLinks />
        <p className="mt-auto rounded-xl bg-secondary p-3 text-[11px] leading-relaxed text-muted-foreground">
          AI-generated content may contain errors or inaccuracies. Always review and verify AI
          outputs before using them for important professional decisions.
        </p>
      </aside>

      <div className="lg:pl-68">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur md:px-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-4.5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 gap-6 bg-sidebar p-4">
              <Brand />
              <NavLinks onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-foreground md:text-lg">{title}</h1>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">{description}</p>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
