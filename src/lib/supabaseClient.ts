 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/lib/supabaseClient.ts b/src/lib/supabaseClient.ts
new file mode 100644
index 0000000000000000000000000000000000000000..6cd5c43ecd886a1f1d094b5cd266da03e1924064
--- /dev/null
+++ b/src/lib/supabaseClient.ts
@@ -0,0 +1,19 @@
+import { createClient } from "@supabase/supabase-js";
+
+const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://example.supabase.co";
+const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "public-anon-key";
+
+export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
+  auth: {
+    persistSession: false
+  }
+});
+
+export async function fetchBouquetCatalog() {
+  const { data, error } = await supabase.from("bouquets").select("id, name, description, price, hero_image");
+  if (error) {
+    console.error(error.message);
+    return [];
+  }
+  return data;
+}
 
EOF
)
