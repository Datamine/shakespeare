git clone https://github.com/cobanov/shakespeare-dataset
mkdir -p src/plays

# Loop through each text file and create a separate JS module
for file in shakespeare-dataset/text/*; do
    filename=$(basename "$file")
    # Create a JS file name (remove .txt and _TXT_FolgerShakespeare extensions)
    jsfile="src/plays/${filename%_TXT_FolgerShakespeare.txt}.js"
    # Escape backticks and dollar signs in the content
    content=$(cat "$file" | sed 's/`/\\`/g' | sed 's/\$/\\$/g')
    # Create the JS module file
    echo "export const text = \`$content\`;" > "$jsfile"
done

# Clean up
rm -rf shakespeare-dataset
