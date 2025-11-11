 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/components/Navbar.tsx b/src/components/Navbar.tsx
new file mode 100644
index 0000000000000000000000000000000000000000..29932f0a1639fd156bcbffd2a32620067a1225a3
--- /dev/null
+++ b/src/components/Navbar.tsx
@@ -0,0 +1,32 @@
+import Link from "next/link";
+
+const links = [
+  { href: "#features", label: "Features" },
+  { href: "#pricing", label: "Pricing" },
+  { href: "#demo", label: "Demo" }
+];
+
+export function Navbar() {
+  return (
+    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur">
+      <div className="container mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
+        <Link href="/" className="text-xl font-bold text-brand-700">
+          FloralPro3
+        </Link>
+        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
+          {links.map((link) => (
+            <Link key={link.href} href={link.href} className="transition hover:text-brand-600">
+              {link.label}
+            </Link>
+          ))}
+        </nav>
+        <Link
+          href="#pricing"
+          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700"
+        >
+          Request access
+        </Link>
+      </div>
+    </header>
+  );
+}
 
EOF
)
