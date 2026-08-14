#!/bin/bash
OUTPUT='[{"id": "673ecb11-7c93-4a6c-949a-e1e35a9f5d37", "appVersion": "1.0.0", "artifacts": {"buildUrl": "https://expo.dev/test"}}]'
echo "$OUTPUT" | jq -r '.[0].id // ""'
