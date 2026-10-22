interface SectionHeaderProps {
  id: string;
  index: string;
  label: string;
  title: string;
}

export function SectionHeader({ id, index, label, title }: SectionHeaderProps) {
  return (
    <header className="mb-12 grid gap-4 lg:mb-16 lg:grid-cols-12 lg:gap-8" data-reveal>
      <p className="pt-2 font-mono text-meta uppercase text-paper-faint lg:col-span-3">
        <span className="text-signal">{index}</span> / {label}
      </p>
      <h2 className="max-w-[20ch] text-title font-semibold text-paper lg:col-span-9" id={id}>
        {title}
      </h2>
    </header>
  );
}
