export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-pink-100 bg-pink-50/80">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 text-center text-sm text-slate-500 sm:flex-row">
        <p>&copy; {year} FloralPro3. Todos los derechos reservados.</p>
        <div className="flex items-center gap-4">
          <a
            className="transition hover:text-pink-500"
            href="mailto:hola@floralpro3.com"
          >
            Contacto
          </a>
          <a className="transition hover:text-pink-500" href="#roles">
            Roles
          </a>
        </div>
      </div>
    </footer>
  );
}
