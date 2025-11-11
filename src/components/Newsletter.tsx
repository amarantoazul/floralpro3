 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/components/Newsletter.tsx b/src/components/Newsletter.tsx
new file mode 100644
index 0000000000000000000000000000000000000000..0c58e9d4a5d451aeb56e96918995facf39b65820
--- /dev/null
+++ b/src/components/Newsletter.tsx
@@ -0,0 +1,30 @@
+export function Newsletter() {
+  return (
+    <section className="bg-brand-900 py-20">
+      <div className="container mx-auto max-w-3xl space-y-6 px-6 text-center text-white">
+        <h2 className="text-3xl font-bold md:text-4xl">Stay in bloom with FloralPro3</h2>
+        <p className="text-base text-brand-100">
+          Join our monthly digest for Supabase release notes, curated floral trends, and limited-run partnerships.
+        </p>
+        <form className="flex flex-col gap-4 sm:flex-row sm:justify-center">
+          <label className="sr-only" htmlFor="email">
+            Email
+          </label>
+          <input
+            id="email"
+            type="email"
+            required
+            placeholder="you@brand.com"
+            className="w-full rounded-full border border-transparent bg-white px-5 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400 sm:max-w-xs"
+          />
+          <button
+            type="submit"
+            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
+          >
+            Subscribe
+          </button>
+        </form>
+      </div>
+    </section>
+  );
+}
 
EOF
)
