#!/bin/bash

# Define alias-to-path mappings
declare -A aliases=(
  ["@core-services"]="src/core/services"
  ["@core-observers"]="src/core/observers"
  ["@assets"]="src/assets"
  ["@shared-components"]="src/shared/components"
  ["@shared-contexts"]="src/shared/contexts"
  ["@shared-custom-hooks"]="src/shared/custom-hooks"
  ["@shared-constants"]="src/shared/constants"
)

echo -e "\n🔍 Checking for unused aliases..."
unused=false

for alias in "${!aliases[@]}"; do
  if ! grep -r "$alias" ./src > /dev/null 2>&1; then
    echo "❌ Alias not used: $alias"
    unused=true
  fi
done

if [ "$unused" = false ]; then
  echo "✅ All aliases are currently in use."
fi
