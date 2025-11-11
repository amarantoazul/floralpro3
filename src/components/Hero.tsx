export function Hero() {
  return (
    <section className="container flex flex-1 flex-col items-center justify-center gap-6 py-12 px-4 text-center md:py-20">
      <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-pink-500 shadow-sm shadow-pink-100">
        Plataforma SaaS floral
      </span>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold leading-snug text-slate-900 md:text-5xl">
          El ecosistema inteligente para la cadena floral en Latinoamérica
        </h1>
        <p className="text-sm text-slate-600 md:text-lg">
          FloralPro3 simplifica la colaboración entre proveedores, floristerías,
          productores y agentes con herramientas móviles, intuitivas y listas
          para tu equipo.
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <a
          className="inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-pink-200 transition hover:bg-pink-400"
          href="#roles"
        >
          Conoce los roles
        </a>
        <a
          className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-white/80 px-5 py-3 text-sm font-semibold text-pink-500 shadow-sm shadow-pink-100 transition hover:border-pink-300 hover:text-pink-600"
          href="mailto:hola@floralpro3.com"
        >
          Agenda una charla
        </a>
      </div>
    </section>
  );
}
