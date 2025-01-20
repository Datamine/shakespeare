import os
import subprocess
import re
import argparse

def clone_repo():
    if not os.path.exists("shakespeare-dataset"):
        subprocess.run(["git", "clone", "https://github.com/cobanov/shakespeare-dataset"], check=True)

def ensure_plays_dir():
    os.makedirs("plays", exist_ok=True)

def process_content(content):
    # Replace special characters
    content = content.replace('`', '\\`').replace('$', '\\$')
    
    act = 0
    scene = 0
    after_act = False
    processed_lines = []
    
    for line in content.split('\n'):
        act_match = re.match(r'^ACT (\d+)', line)
        scene_match = re.match(r'^Scene (\d+)', line)
        stage_direction_match = re.match(r'^[A-Z][A-Z][A-Z ]*[.,]', line)
        
        if act_match:
            act += 1
            scene = 0
            after_act = True
            line = line.replace('ACT', 'Act')
            processed_lines.append(f'<b id="act-{act}" class="act-header">{line}</b>')
        elif scene_match:
            scene += 1
            after_act = False
            processed_lines.append(f'<b id="act-{act}-scene-{scene}" class="scene-header">{line}</b>')
        elif stage_direction_match:
            after_act = False
            line = f"<b>{stage_direction_match.group(0)}</b>{line[stage_direction_match.end():]}"
            processed_lines.append(line)
        elif line.startswith('=='):
            if not after_act:
                processed_lines.append('<hr>')
        else:
            after_act = False
            processed_lines.append(line)
    
    return '\n'.join(processed_lines)

def format_plays():
    ensure_plays_dir()
    
    # Process each file
    dataset_dir = "shakespeare-dataset/text"
    for filename in os.listdir(dataset_dir):
        if filename.endswith('_TXT_FolgerShakespeare.txt'):
            input_path = os.path.join(dataset_dir, filename)
            
            # Create output filename
            output_filename = filename.replace('_TXT_FolgerShakespeare.txt', '.js')
            output_path = os.path.join('plays', output_filename)
            
            # Read and process content
            with open(input_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            processed_content = process_content(content)
            
            # Write JS module
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(f'export const text = `{processed_content}`;')

def main():
    parser = argparse.ArgumentParser(description='Process Shakespeare plays into JS modules')
    parser.add_argument('--no-clone', action='store_true', 
                      help='Skip cloning the repository (use existing shakespeare-dataset)')
    parser.add_argument('--keep', action='store_true',
                      help='Keep the shakespeare-dataset directory after processing')
    
    args = parser.parse_args()
    
    if not args.no_clone:
        clone_repo()
    
    format_plays()
    
    if not args.keep:
        subprocess.run(["rm", "-rf", "shakespeare-dataset"], check=True)

if __name__ == "__main__":
    main() 