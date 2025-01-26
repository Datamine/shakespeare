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
    # Split content into credits and main text
    credits_match = re.search(r'^(.*?)(Characters in the Play|CHARACTERS|DRAMATIS PERSONAE)', content, re.DOTALL)
    if credits_match:
        credits = credits_match.group(1).strip()
        content = content[credits_match.start(2):]  # Start from characters section
    else:
        credits = ""
    
    # Find the start of Act 1 (case and spacing insensitive)
    act1_match = re.search(r'\b[Aa][Cc][Tt]\s*[1I]\b', content)
    if act1_match:
        # Keep only content from Act 1 onwards
        content = content[act1_match.start():]
    
    # Replace quotes based on context (before any HTML is added)
    content = re.sub(r'(?:^|\s)"', r'\g<0>&ldquo;', content)  # Quote after space or start of line
    content = re.sub(r'"(?=$|\s|[.,!?;])', r'&rdquo;\g<0>', content)  # Quote before space or punctuation
    content = content.replace("'", "&rsquo;")  # Single quotes/apostrophes
    
    # Replace special characters in both parts
    credits = credits.replace('`', '\\`').replace('$', '\\$')
    content = content.replace('`', '\\`').replace('$', '\\$')
    
    # Process square brackets - make content italic with <i> tags
    content = re.sub(r'\[(.*?)\]', r'[<i>\1</i>]', content, flags=re.DOTALL)
    
    # Add newline after right square bracket if not already present
    content = re.sub(r'\](?!\n)', ']\n', content)
    
    # Reduce multiple newlines between ] and next text to max 2
    content = re.sub(r'\]\n{3,}', ']\n\n', content)
    
    lines = content.split('\n')
    processed_lines = []
    i = 0
    seen_first_hr = False
    
    while i < len(lines):
        line = lines[i]
        
        # Check if this is the first hr that marks the start of the play proper
        if '<hr>' in line:
            seen_first_hr = True
            processed_lines.append(line)
            i += 1
            continue
            
        # Only process speakers if we're past the first hr
        if seen_first_hr:
            # Skip empty lines
            if not line:
                processed_lines.append(line)
                i += 1
                continue
                
            words = line.split()
            if words:
                # Find the speaker portion (all uppercase words)
                speaker_end = 0
                for j, word in enumerate(words):
                    stripped_word = word.rstrip(',.!?:;')
                    if not stripped_word.isupper() or len(stripped_word) == 1:
                        break
                    speaker_end = j + 1
                
                # If we found a speaker (at least one uppercase word)
                if speaker_end > 0:
                    speaker = ' '.join(words[:speaker_end])
                    rest = ' '.join(words[speaker_end:])
                    # Add more visible formatting for speaker and dialogue
                    if rest.strip():
                        line = f"<speaker>{speaker}</speaker>\n{rest}"
                    else:
                        line = f"<speaker>{speaker}</speaker>"
        
        processed_lines.append(line)
        i += 1
    
    content = '\n'.join(processed_lines)
    
    # First process acts and scenes and add <hr> tags
    act = 0
    scene = 0
    after_act = False
    processed_lines = []
    
    for line in content.split('\n'):
        act_match = re.match(r'^ACT (\d+)', line)
        scene_match = re.match(r'^Scene (\d+)', line)
        
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
        elif line.startswith('=='):
            if not after_act:
                processed_lines.append('<hr>')
        else:
            after_act = False
            processed_lines.append(line)
    
    content = '\n'.join(processed_lines)
    
    # Now process the speakers after structure is established
    processed_lines = []
    seen_hr_count = 0
    
    for line in content.split('\n'):
        # Count <hr> tags to know when we're past the character list
        if '<hr>' in line:
            seen_hr_count += 1
            processed_lines.append(line)
            continue
            
        # Only process speakers if we're past the second hr
        if seen_hr_count >= 2:
            # Skip empty lines
            if not line:
                processed_lines.append(line)
                continue
                
            words = line.split()
            if words:
                # Find the speaker portion (all uppercase words)
                speaker_end = 0
                for j, word in enumerate(words):
                    stripped_word = word.rstrip(',.!?:;')
                    if not stripped_word.isupper() or len(stripped_word) == 1:
                        break
                    speaker_end = j + 1
                
                # If we found a speaker (at least one uppercase word)
                if speaker_end > 0:
                    speaker = ' '.join(words[:speaker_end])
                    rest = ' '.join(words[speaker_end:])
                    # Add more visible formatting for speaker and dialogue
                    if rest.strip():
                        line = f"<speaker>{speaker}</speaker>\n{rest}"
                    else:
                        line = f"<speaker>{speaker}</speaker>"
        
        processed_lines.append(line)
    
    content = '\n'.join(processed_lines)
    
    # After all other processing, handle Act/Scene spacing
    content = re.sub(r'(\n\n+)(<b [^>]*class="act-header"[^>]*>.*?</b>)\n+(<b [^>]*class="scene-header"[^>]*>.*?</b>)', 
                    r'\n\n\2\n\3', 
                    content)
    
    # Now handle indented character names in the character list section
    lines = content.split('\n')
    processed_lines = []
    hr_count = 0
    
    for line in lines:
        if '<hr>' in line:
            hr_count += 1
            processed_lines.append(line)
            continue
            
        # Only process lines between first and second <hr>
        if hr_count == 1:
            print(line)
            # Check if line starts with whitespace
            if line.startswith((' ', '\t')):
                # Replace leading whitespace with " - "
                line = " - " + line.lstrip()
        
        processed_lines.append(line)
    
    content = '\n'.join(processed_lines)
    
    return credits, content

def format_plays():
    ensure_plays_dir()
    
    # Files to skip (non-play works)
    skip_files = {
        'venus-and-adonis',
        'sonnets',
        'lucrece',
        'phoenix-and-turtle'
    }
    
    # Process each file
    dataset_dir = "shakespeare-dataset/text"
    for filename in os.listdir(dataset_dir):
        # Skip if the file is one of the non-play works
        if any(skip_file in filename for skip_file in skip_files):
            continue
            
        if filename.endswith('_TXT_FolgerShakespeare.txt'):
            input_path = os.path.join(dataset_dir, filename)
            
            # Create output filename
            output_filename = filename.replace('_TXT_FolgerShakespeare.txt', '.js')
            output_path = os.path.join('plays', output_filename)
            
            # Read and process content
            with open(input_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            credits, processed_content = process_content(content)
            
            # Write JS module with both exports
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write('export const credits = `' + credits + '`;\n\n')
                f.write('export const text = `' + processed_content + '`;')

def main():
    """Process Shakespeare plays from the shakespeare-dataset repository into JS modules.
    
    Usage:
        python get_plays.py [options]
        
    Options:
        --no-clone    Skip cloning the repository (use existing shakespeare-dataset)
        --keep        Keep the shakespeare-dataset directory after processing
        
    By default, the script will:
        1. Clone the shakespeare-dataset repository
        2. Process all plays into JS modules in the 'plays' directory
        3. Remove the shakespeare-dataset directory when done
    """
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