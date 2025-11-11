import { FeatureCard } from "@/components/FeatureCard";

const features = [
  {
    title: "Realtime availability",
    description: "Sync inventory and supplier updates instantly with Supabase realtime channels.",
    icon: "🌿"
  },
  {
    title: "Automated gifting",
    description: "Segment clients and trigger curated deliveries through our workflow engine.",
    icon: "🎁"
  },
  {
    title: "Actionable analytics",
    description: "Forecast demand with dashboards tailored for hospitality and luxury retail partners.",
    icon: "📊"
  },
  {
    title: "Sustainability insights",
    description: "Track eco-friendly sourcing and carbon offset metrics that resonate with conscious brands.",
    icon: "🌎"
  }
];

export function Features() {
  return (
    <section className="bg-white py-20" id="features">
      <div className="container mx-auto max-w-5xl space-y-8 px-6">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Elevated operations from seed to celebration</h2>
          <p className="text-base text-slate-600">
            Supabase keeps your floral pipeline humming—our operators monitor every step so you can focus on delighting guests.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}