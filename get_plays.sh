git clone https://github.com/cobanov/shakespeare-dataset
mkdir -p plays

# Loop through each text file and create a separate JS module
for file in shakespeare-dataset/text/*; do
    filename=$(basename "$file")
    # Create a JS file name (remove .txt and _TXT_FolgerShakespeare extensions)
    jsfile="plays/${filename%_TXT_FolgerShakespeare.txt}.js"
    
    # Process the content:
    # 1. Escape backticks and dollar signs
    # 2. Add bold tags to Act/Scene headers and character names
    # 3. Replace === lines with <hr>
    content=$(cat "$file" | \
        sed 's/`/\\`/g' | \
        sed 's/\$/\\$/g' | \
        sed '/^ACT [0-9]/s/.*/<b>&<\/b>/' | \
        sed '/^Scene [0-9]/s/.*/<b>&<\/b>/' | \
        sed '/^[A-Z][A-Z][A-Z ]*[.,]/s/[A-Z][A-Z][A-Z ]*/<b>&<\/b>/' | \
        sed '/^==*/s/.*/<hr>/')
    
    # Create the JS module file
    echo "export const text = \`$content\`;" > "$jsfile"
done

# Clean up
rm -rf shakespeare-dataset
