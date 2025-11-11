 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/app/page.tsx b/src/app/page.tsx
new file mode 100644
index 0000000000000000000000000000000000000000..9bd6f7ca78f9198692de4c1d01a1c6281221a916
--- /dev/null
+++ b/src/app/page.tsx
@@ -0,0 +1,21 @@
+import { Features } from "@/components/Features";
+import { Footer } from "@/components/Footer";
+import { Hero } from "@/components/Hero";
+import { Navbar } from "@/components/Navbar";
+import { Newsletter } from "@/components/Newsletter";
+import { Pricing } from "@/components/Pricing";
+import { Testimonials } from "@/components/Testimonials";
+
+export default function Page() {
+  return (
+    <div className="flex min-h-screen flex-col">
+      <Navbar />
+      <Hero />
+      <Features />
+      <Testimonials />
+      <Pricing />
+      <Newsletter />
+      <Footer />
+    </div>
+  );
+}
 
EOF
)
