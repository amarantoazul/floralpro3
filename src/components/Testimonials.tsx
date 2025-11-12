import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "FloralPro3 transformó nuestra experiencia con los clientes. Las automatizaciones aseguran que cada evento reciba flores diseñadas a la medida.",
    name: "Maya Ramírez",
    role: "Directora de Experiencia, Solstice Hotels"
  },
  {
    quote:
      "Las métricas de sostenibilidad nos ayudaron a reducir el desperdicio un 35%. El panel nos da total confianza en cada decisión de compra.",
    name: "Jules Meyer",
    role: "Gerente de Innovación, Lumen Galleries"
  }
];

export function Testimonials() {
  return (
    <section
      id="testimonios"
      className="bg-gradient-to-b from-white via-blossom-50/40 to-blossom-100/30 py-20 sm:py-24"
    >
      <div className="container mx-auto max-w-4xl space-y-12 px-6">
        {/* Encabezado */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold text-slate-900 sm:text-3xl"
          >
            Elegidas por líderes de la hospitalidad y el diseño floral
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-xl text-sm text-slate-600 sm:text-base"
          >
            Cada proyecto florece con inteligencia y precisión gracias al ecosistema de FloralPro3.
          </motion.p>
        </div>

        {/* Testimonios */}
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="floating-card p-8 text-left"
            >
              <blockquote className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-blossom-400">
                {testimonial.name}
                <span className="block text-xs font-normal text-slate-500">
                  {testimonial.role}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
