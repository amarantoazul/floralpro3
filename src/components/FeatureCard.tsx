interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-3xl border border-brand-100 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <span className="text-3xl" aria-hidden>
        {icon}
      </span>
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </article>
  );
}