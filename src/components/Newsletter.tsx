export function Newsletter() {
  return (
    <section className="bg-gradient-to-r from-blossom-200 via-blossom-300 to-blossom-400 py-16 text-white">
      <div className="container mx-auto max-w-3xl space-y-6 px-6 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
          Mantente floreciendo con FloralPro3 🌸
        </h2>
        <p className="text-sm sm:text-base text-white/90">
          Únete a nuestro boletín mensual y recibe tendencias florales, lanzamientos y novedades de la comunidad FloralPro.
        </p>
        <form className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <label className="sr-only" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="tucorreo@ejemplo.com"
            className="w-full rounded-full border border-transparent bg-white/95 px-5 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blossom-200 sm:max-w-xs"
          />
          <button
            type="submit"
            className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-pink-200/40 transition hover:bg-white/20"
          >
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  );
}
