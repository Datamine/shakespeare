import os
import re
import shutil

def process_file(input_path, output_path):
    try:
        # Read and process the original file
        with open(input_path, 'r', encoding='utf-8') as file:
            content = file.read()
            
        # Find content between first two sequences of == or longer
        pattern = r'={2,}.*?\n(.*?)={2,}'
        matches = re.findall(pattern, content, re.DOTALL)
        
        if matches and len(matches) > 0:
            extracted_text = matches[0].strip()
            
            # More robust cleanup: case-insensitive, handles various spacing
            extracted_text = re.sub(r'\s*[Aa][Cc][Tt]\s*[1I]\s*$', '', extracted_text)
            extracted_text = extracted_text.strip()
            
            # Replace quotes based on context
            extracted_text = re.sub(r'(?:^|\s)"', r'\g<0>&ldquo;', extracted_text)  # Quote after space or start of line
            extracted_text = re.sub(r'"(?=$|\s|[.,!?;])', r'&rdquo;\g<0>', extracted_text)  # Quote before space or punctuation
            extracted_text = extracted_text.replace("'", "&rsquo;")  # Single quotes/apostrophes
            
            # Write the extracted content to a temporary file first
            temp_output = output_path + '.temp'
            with open(temp_output, 'w', encoding='utf-8') as file:
                file.write(extracted_text)
            
            # Now rename the original file to _characters
            os.rename(input_path, output_path)
            
            # Move the processed content into place
            with open(output_path, 'w', encoding='utf-8') as outfile:
                with open(temp_output, 'r', encoding='utf-8') as infile:
                    outfile.write(infile.read())
            
            # Clean up the temporary file
            os.remove(temp_output)
            
            print(f"Processed and renamed: {input_path} -> {output_path}")
        else:
            print(f"Warning: No content found between == markers in {input_path}")
            
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")

def main():
    # Create characters directory if it doesn't exist
    characters_dir = 'characters'
    os.makedirs(characters_dir, exist_ok=True)
    
    # Source directory for Shakespeare texts
    source_dir = os.path.join('shakespeare-dataset', 'text')
    
    # Ensure source directory exists
    if not os.path.exists(source_dir):
        print(f"Error: Source directory '{source_dir}' not found")
        return
    
    # Copy and process all txt files
    for filename in os.listdir(source_dir):
        if filename.endswith('.txt'):
            # Get base name without TXT_FolgerShakespeare part
            base_name = filename.split('_')[0]
            
            # Copy file to current directory
            source_path = os.path.join(source_dir, filename)
            local_copy = filename
            shutil.copy2(source_path, local_copy)
            
            # Process the local copy with simplified output name
            output_path = os.path.join(characters_dir, f"{base_name}_characters.txt")
            process_file(local_copy, output_path)

if __name__ == '__main__':
    main() 