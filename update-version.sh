#!/bin/bash

# Check if an argument was provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 [major|minor|patch]"
    exit 1
fi

# Check if the argument is valid
if [[ ! "$1" =~ ^(major|minor|patch)$ ]]; then
    echo "Error: Argument must be 'major', 'minor', or 'patch'"
    exit 1
fi

# Get the current version
CURRENT_VERSION=$(jq -r '.version' version.json)

# Split version into components
IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR="${VERSION_PARTS[0]}"
MINOR="${VERSION_PARTS[1]}"
PATCH="${VERSION_PARTS[2]}"

# Update version based on argument
case "$1" in
    "major")
        MAJOR=$((MAJOR + 1))
        MINOR=0
        PATCH=0
        ;;
    "minor")
        MINOR=$((MINOR + 1))
        PATCH=0
        ;;
    "patch")
        PATCH=$((PATCH + 1))
        ;;
esac

# Create new version string
NEW_VERSION="$MAJOR.$MINOR.$PATCH"

# Update version.json
echo "{\"version\": \"$NEW_VERSION\"}" > version.json

# Simple string replace in each file
find . -type f \( -name "*.html" -o -name "*.js" \) -exec sed -i.bak "s/$CURRENT_VERSION/$NEW_VERSION/g" {} \;
find . -name "*.bak" -delete

echo "Version updated:"
echo "  Old version: $CURRENT_VERSION"
echo "  New version: $NEW_VERSION" 