import { statusLabels, type ProjectStatus } from "@/lib/project-catalog";

const dotClass: Record<ProjectStatus, string> = {
  live: "bg-ok",
  production: "bg-ok",
  building: "bg-signal",
  prototype: "bg-paper-faint",
  shipped: "bg-paper-dim",
  retired: "border border-paper-faint bg-transparent",
  contributor: "border border-paper-dim bg-transparent"
};

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-meta uppercase text-paper-dim ${className}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass[status]}`} />
      {statusLabels[status]}
    </span>
  );
}
