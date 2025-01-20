git clone https://github.com/cobanov/shakespeare-dataset
mkdir -p plays

# Loop through each text file and create a separate JS module
for file in shakespeare-dataset/text/*; do
    filename=$(basename "$file")
    # Create a JS file name (remove .txt and _TXT_FolgerShakespeare extensions)
    jsfile="plays/${filename%_TXT_FolgerShakespeare.txt}.js"
    
    # Process the content using awk to track act/scene numbers and add unique IDs
    content=$(cat "$file" | \
        sed 's/`/\\`/g' | \
        sed 's/\$/\\$/g' | \
        awk '
            BEGIN { act=0; scene=0; after_act=0 }
            /^ACT [0-9]/ { 
                act++; 
                scene=0;
                after_act=1;
                sub(/^ACT /, "Act ");
                print "<b id=\"act-" act "\" class=\"act-header\">" $0 "</b>";
                next 
            }
            /^Scene [0-9]/ { 
                scene++;
                after_act=0;
                print "<b id=\"act-" act "-scene-" scene "\" class=\"scene-header\">" $0 "</b>";
                next 
            }
            /^[A-Z][A-Z][A-Z ]*[.,]/ { 
                after_act=0;
                gsub(/^[A-Z][A-Z][A-Z ]*[.,]/, "<b>&</b>");
                print;
                next 
            }
            /^==*/ { 
                if (after_act) { 
                    next  # Skip === only if right after an Act
                } else {
                    print "<hr>";
                }
                next 
            }
            { after_act=0; print }
        ')
    
    # Create the JS module file
    echo "export const text = \`$content\`;" > "$jsfile"
done

# Clean up
rm -rf shakespeare-dataset
