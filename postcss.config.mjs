 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/postcss.config.mjs b/postcss.config.mjs
new file mode 100644
index 0000000000000000000000000000000000000000..2aa7205d4b402a1bdfbe07110c61df920b370066
--- /dev/null
+++ b/postcss.config.mjs
@@ -0,0 +1,6 @@
+export default {
+  plugins: {
+    tailwindcss: {},
+    autoprefixer: {},
+  },
+};
 
EOF
)
