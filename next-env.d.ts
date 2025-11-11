 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/next-env.d.ts b/next-env.d.ts
new file mode 100644
index 0000000000000000000000000000000000000000..4f11a03dc6cc37f2b5105c08f2e7b24c603ab2f4
--- /dev/null
+++ b/next-env.d.ts
@@ -0,0 +1,5 @@
+/// <reference types="next" />
+/// <reference types="next/image-types/global" />
+
+// NOTE: This file should not be edited
+// see https://nextjs.org/docs/basic-features/typescript for more information.
 
EOF
)
