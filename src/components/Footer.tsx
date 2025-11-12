export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-white/70 bg-white/60 backdrop-blur-sm">
      <div className="container flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-slate-500 sm:flex-row sm:text-sm">
        <p className="font-medium text-slate-400">
          &copy; {year} <span className="text-blossom-400 font-semibold">FloralPro3</span>. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="mailto:hola@floralpro3.com"
            className="font-medium transition hover:text-blossom-400"
          >
            Contacto
          </a>
          <a
            href="#roles"
            className="font-medium transition hover:text-blossom-400"
          >
            Roles
          </a>
        </div>
      </div>
    </footer>
  );
}
