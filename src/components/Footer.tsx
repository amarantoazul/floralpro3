 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/components/Footer.tsx b/src/components/Footer.tsx
new file mode 100644
index 0000000000000000000000000000000000000000..b0b04f55cf4cc6998f8ce92233d2adbf31917483
--- /dev/null
+++ b/src/components/Footer.tsx
@@ -0,0 +1,22 @@
+import Link from "next/link";
+
+export function Footer() {
+  return (
+    <footer className="bg-brand-900 py-10 text-brand-100">
+      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 text-sm md:flex-row">
+        <p>© {new Date().getFullYear()} FloralPro3. Crafted with care.</p>
+        <nav className="flex gap-4">
+          <Link className="transition hover:text-white" href="#features">
+            Features
+          </Link>
+          <Link className="transition hover:text-white" href="#pricing">
+            Pricing
+          </Link>
+          <Link className="transition hover:text-white" href="#demo">
+            Demo
+          </Link>
+        </nav>
+      </div>
+    </footer>
+  );
+}
 
EOF
)
