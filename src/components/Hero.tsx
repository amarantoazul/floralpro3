 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/components/Hero.tsx b/src/components/Hero.tsx
new file mode 100644
index 0000000000000000000000000000000000000000..4840fdd660c4d6246b628a8ce17fad894d579dee
--- /dev/null
+++ b/src/components/Hero.tsx
@@ -0,0 +1,93 @@
+"use client";
+
+import Link from "next/link";
+import { motion } from "framer-motion";
+
+const heroStats = [
+  { label: "Premium blooms", value: "150+" },
+  { label: "Corporate clients", value: "80" },
+  { label: "Cities served", value: "24" }
+];
+
+export function Hero() {
+  return (
+    <section className="relative overflow-hidden bg-gradient-to-br from-brand-100 via-white to-brand-200 py-24">
+      <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80')] opacity-10" />
+      <div className="container mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center">
+        <motion.div
+          className="flex-1 space-y-6"
+          initial={{ opacity: 0, y: 24 }}
+          animate={{ opacity: 1, y: 0 }}
+          transition={{ duration: 0.8 }}
+        >
+          <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-sm font-medium text-brand-700 shadow">
+            Trusted floral partner for modern brands
+          </span>
+          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
+            Bespoke floral experiences, delivered with intelligence.
+          </h1>
+          <p className="text-lg text-slate-600 md:text-xl">
+            FloralPro3 combines curated artistry with Supabase-powered personalization to delight your clients at scale.
+          </p>
+          <div className="flex flex-col gap-4 sm:flex-row">
+            <Link
+              href="#pricing"
+              className="rounded-full bg-brand-600 px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:bg-brand-700"
+            >
+              Explore plans
+            </Link>
+            <Link
+              href="#demo"
+              className="rounded-full border border-brand-600 px-6 py-3 text-center font-semibold text-brand-700 transition hover:bg-brand-100"
+            >
+              View live demo
+            </Link>
+          </div>
+          <dl className="grid grid-cols-3 gap-6 text-center text-sm font-semibold text-brand-700">
+            {heroStats.map((stat) => (
+              <div key={stat.label} className="rounded-2xl bg-white/80 p-4 shadow">
+                <dt className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</dt>
+                <dd className="text-2xl font-bold">{stat.value}</dd>
+              </div>
+            ))}
+          </dl>
+        </motion.div>
+        <motion.div
+          className="flex-1"
+          initial={{ opacity: 0, scale: 0.9 }}
+          animate={{ opacity: 1, scale: 1 }}
+          transition={{ duration: 0.8, delay: 0.1 }}
+        >
+          <div className="relative mx-auto max-w-md rounded-[3rem] bg-white p-6 shadow-2xl">
+            <div className="absolute inset-x-10 -top-10 h-20 rounded-full bg-brand-200 blur-3xl" />
+            <div className="space-y-4">
+              <div className="flex items-center justify-between">
+                <h3 className="text-lg font-semibold text-slate-800">Weekly Curation</h3>
+                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
+                  Powered by Supabase
+                </span>
+              </div>
+              <p className="text-sm text-slate-600">
+                AI-assisted recommendations adapt to your clientele&apos;s preferences, drawing from real-time Supabase insights.
+              </p>
+              <div className="space-y-3">
+                {[
+                  "Seasonal bloom analysis",
+                  "Delivery logistics dashboard",
+                  "Client sentiment tracking"
+                ].map((item) => (
+                  <div key={item} className="flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-3">
+                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
+                      ✓
+                    </span>
+                    <span className="text-sm font-medium text-slate-700">{item}</span>
+                  </div>
+                ))}
+              </div>
+            </div>
+          </div>
+        </motion.div>
+      </div>
+    </section>
+  );
+}
 
EOF
)
