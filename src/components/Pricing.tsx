const plans = [
  {
    name: "Boutique",
    price: "$349",
    description: "Perfect for intimate hospitality spaces and private clubs.",
    perks: ["12 bespoke arrangements monthly", "On-demand concierge chat", "Sustainable sourcing report"]
  },
  {
    name: "Signature",
    price: "$749",
    description: "Scale your floral touchpoints across multiple venues with confidence.",
    perks: [
      "Weekly Supabase insights",
      "Priority delivery windows",
      "Integration with property management systems"
    ],
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Bespoke partnerships for global brands and events agencies.",
    perks: ["Dedicated floral strategist", "Realtime logistics dashboard", "24/7 support"]
  }
];

export function Pricing() {
  return (
    <section className="bg-white py-24" id="pricing">
      <div className="container mx-auto max-w-5xl space-y-12 px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Flexible plans tuned for luxury experiences</h2>
          <p className="mt-3 text-base text-slate-600">
            Start with curated deliveries or roll out Supabase-powered automations across your entire portfolio.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-3xl border p-8 shadow-lg ${
                plan.featured ? "border-brand-400 bg-brand-50" : "border-slate-200 bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
              <p className="mt-3 text-4xl font-bold text-brand-700">{plan.price}</p>
              <p className="mt-3 text-sm text-slate-600">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <span className="mt-1 text-brand-600">•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
                Select plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}