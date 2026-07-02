# 1. Remove the old generated route tree file
rm -f src/routeTree.gen.ts

# 2. Reset Git's folder-casing cache to ensure the server sees the lowercase folder name
git rm -r --cached src/routes || true

# 3. Re-add everything correctly
git add src/routes