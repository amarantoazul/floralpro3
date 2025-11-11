const testimonials = [
  {
    quote:
      "FloralPro3 transformed our guest experience. Supabase automations ensure every suite has flowers tailored to arriving VIPs.",
    name: "Maya Ramirez",
    role: "Director of Guest Experience, Solstice Hotels"
  },
  {
    quote:
      "Their sustainability insights helped us cut waste by 35%. The dashboard gives us confidence in every procurement decision.",
    name: "Jules Meyer",
    role: "Head of Retail Innovation, Lumen Galleries"
  }
];

export function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-brand-200 via-white to-brand-100 py-24" id="demo">
      <div className="container mx-auto max-w-4xl space-y-12 px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Loved by hospitality leaders worldwide</h2>
          <p className="mt-3 text-base text-slate-600">
            Every arrangement is informed by live Supabase intelligence, ensuring your guests receive distinctive floral artistry.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="rounded-3xl bg-white/80 p-8 shadow-lg">
              <blockquote className="text-lg font-medium text-slate-700">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-brand-700">
                {testimonial.name}
                <span className="block text-xs font-normal text-slate-500">{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}