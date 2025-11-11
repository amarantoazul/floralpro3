 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/components/FeatureCard.tsx b/src/components/FeatureCard.tsx
new file mode 100644
index 0000000000000000000000000000000000000000..59a2fc5732a7d9ae7dd28382b0624df335477282
--- /dev/null
+++ b/src/components/FeatureCard.tsx
@@ -0,0 +1,17 @@
+interface FeatureCardProps {
+  title: string;
+  description: string;
+  icon: string;
+}
+
+export function FeatureCard({ title, description, icon }: FeatureCardProps) {
+  return (
+    <article className="flex flex-col gap-3 rounded-3xl border border-brand-100 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
+      <span className="text-3xl" aria-hidden>
+        {icon}
+      </span>
+      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
+      <p className="text-sm text-slate-600">{description}</p>
+    </article>
+  );
+}
 
EOF
)
