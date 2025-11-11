 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/next.config.mjs b/next.config.mjs
new file mode 100644
index 0000000000000000000000000000000000000000..ec05ad223b9856ee79034a54453beb90758ee68f
--- /dev/null
+++ b/next.config.mjs
@@ -0,0 +1,9 @@
+/** @type {import('next').NextConfig} */
+const nextConfig = {
+  reactStrictMode: true,
+  experimental: {
+    typedRoutes: true
+  }
+};
+
+export default nextConfig;
 
EOF
)
