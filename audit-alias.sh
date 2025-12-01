#!/bin/bash

# Define alias-to-path mappings
declare -A aliases=(
  ["@core-services"]="src/core/services"
  ["@assets"]="src/assets"
  ["@mocks"]="src/mocks"
  ["@shared-components"]="src/shared/components"
  ["@shared-constants"]="src/shared/constants"
  ["@shared-contexts"]="src/shared/contexts"
  ["@shared-hooks"]="src/shared/hooks"
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
