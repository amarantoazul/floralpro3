 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/app/layout.tsx b/src/app/layout.tsx
new file mode 100644
index 0000000000000000000000000000000000000000..a72ed7b7d92c14e6cd5f80868861e50deedec270
--- /dev/null
+++ b/src/app/layout.tsx
@@ -0,0 +1,34 @@
+import type { Metadata } from "next";
+import "./globals.css";
+
+export const metadata: Metadata = {
+  title: "FloralPro3",
+  description: "Premium floral experiences powered by Supabase",
+  metadataBase: new URL("https://floralpro3.example.com"),
+  openGraph: {
+    title: "FloralPro3",
+    description: "Premium floral experiences powered by Supabase",
+    images: [
+      {
+        url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
+        width: 1200,
+        height: 630,
+        alt: "Floral arrangement"
+      }
+    ]
+  }
+};
+
+export default function RootLayout({
+  children
+}: {
+  children: React.ReactNode;
+}) {
+  return (
+    <html lang="en">
+      <body className="bg-brand-50 antialiased">
+        <main>{children}</main>
+      </body>
+    </html>
+  );
+}
 
EOF
)
