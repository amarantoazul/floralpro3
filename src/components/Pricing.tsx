const plans = [
  {
    name: "Boutique",
    price: "$349",
    description: "Ideal para floristas o espacios pequeños que desean un toque premium.",
    perks: [
      "12 arreglos personalizados al mes",
      "Atención por chat en tiempo real",
      "Reporte de abastecimiento sustentable"
    ]
  },
  {
    name: "Signature",
    price: "$749",
    description: "Para marcas o eventos con presencia constante y operaciones múltiples.",
    perks: [
      "Informes semanales de rendimiento",
      "Ventanas de entrega prioritarias",
      "Integración con sistemas de gestión"
    ],
    featured: true
  },
  {
    name: "Enterprise",
    price: "A medida",
    description: "Soluciones personalizadas para cadenas, hoteles o eventos internacionales.",
    perks: [
      "Estratega floral dedicado",
      "Dashboard de logística en tiempo real",
      "Soporte 24/7 y coordinación avanzada"
    ]
  }
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-gradient-to-b from-white via-white to-blossom-50/30 py-20 sm:py-24"
    >
      <div className="container mx-auto max-w-5xl space-y-12 px-6 text-center">
        {/* Encabezado */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
            Planes flexibles para cada tipo de experiencia floral
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600">
            Elige el plan que mejor se adapte a tu negocio: desde talleres
            boutique hasta operaciones internacionales.
          </p>
        </div>

        {/* Tarjetas de precios */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-3xl p-8 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 ${
                plan.featured
                  ? "border-2 border-blossom-300 bg-blossom-50/70"
                  : "border border-white/70 bg-white/90"
              }`}
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {plan.name}
              </h3>
              <p
                className={`mt-3 text-4xl font-bold ${
                  plan.featured ? "text-blossom-400" : "text-slate-800"
                }`}
              >
                {plan.price}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <span className="mt-1 text-blossom-400">•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 rounded-full px-5 py-3 text-sm font-semibold text-white transition ${
                  plan.featured
                    ? "bg-blossom-400 hover:bg-blossom-500"
                    : "bg-slate-900 hover:bg-slate-800"
                }`}
              >
                Elegir plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
