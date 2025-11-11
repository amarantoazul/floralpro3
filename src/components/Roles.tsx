const roles = [
  {
    title: "Proveedor",
    description:
      "Centraliza inventarios, catálogos y disponibilidad en tiempo real para tus clientes.",
    accent: "bg-blossom-100",
    icon: "🌺"
  },
  {
    title: "Florería",
    description:
      "Haz pedidos ágiles, gestiona entregas y obtén insights sobre tus productos estrella.",
    accent: "bg-blossom-200",
    icon: "🌷"
  },
  {
    title: "Productor",
    description:
      "Conecta tu producción con la demanda y anticipa necesidades con dashboards móviles.",
    accent: "bg-blossom-100",
    icon: "🌻"
  },
  {
    title: "Agente",
    description:
      "Coordina cadenas de suministro, contratos y logística desde un solo panel colaborativo.",
    accent: "bg-blossom-200",
    icon: "🌼"
  }
];

export function Roles() {
  return (
    <section id="roles" className="bg-white/60 py-14">
      <div className="container space-y-10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Cuatro roles, una sola plataforma
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            FloralPro3 potencia a cada actor de la cadena floral con herramientas
            móviles y colaborativas.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {roles.map((role) => (
            <article
              key={role.title}
              className="group rounded-3xl bg-white/80 p-6 shadow-lg shadow-pink-100/70 ring-1 ring-white/70 transition hover:-translate-y-1 hover:shadow-pink-200"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${role.accent} text-2xl shadow-inner shadow-pink-100`}
                >
                  {role.icon}
                </span>
                <h3 className="text-lg font-semibold text-slate-900">
                  {role.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {role.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
