 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/tailwind.config.ts b/tailwind.config.ts
new file mode 100644
index 0000000000000000000000000000000000000000..df0cfb72f50d52278f521a4dc84638c25f49f372
--- /dev/null
+++ b/tailwind.config.ts
@@ -0,0 +1,30 @@
+import type { Config } from "tailwindcss";
+
+const config: Config = {
+  content: [
+    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
+    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
+    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
+  ],
+  theme: {
+    extend: {
+      colors: {
+        brand: {
+          50: "#f2f7f5",
+          100: "#dfeee8",
+          200: "#b9dccc",
+          300: "#8cc6b0",
+          400: "#4ba587",
+          500: "#2c8f71",
+          600: "#1f755c",
+          700: "#1a5d4c",
+          800: "#184c3f",
+          900: "#143f35"
+        }
+      }
+    }
+  },
+  plugins: []
+};
+
+export default config;
 
EOF
)
