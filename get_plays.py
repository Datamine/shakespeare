import os
import subprocess
import re
import argparse

def clone_repo():
    if not os.path.exists("shakespeare-dataset"):
        subprocess.run(["git", "clone", "https://github.com/cobanov/shakespeare-dataset"], check=True)

def ensure_plays_dir():
    os.makedirs("plays", exist_ok=True)

def replace_quotes(text):
    """Replace straight quotes with smart quotes using string manipulation."""
    result = []
    in_quote = False
    
    # Split into lines to preserve line breaks
    lines = text.split('\n')
    for line in lines:
        chars = list(line)
        i = 0
        while i < len(chars):
            if chars[i] == '"':
                # Opening quote if: at start of line, or preceded by space/punctuation/em dash
                if (i == 0 or 
                    chars[i-1].isspace() or 
                    chars[i-1] in '([{' or 
                    (i >= 2 and chars[i-2:i] == ['-', '-'])):  # Check for em dash
                    chars[i] = '&ldquo;'
                else:  # Closing quote
                    chars[i] = '&rdquo;'
            elif chars[i] == "'":
                chars[i] = '&rsquo;'
            i += 1
        result.append(''.join(chars))
    
    return '\n'.join(result)

def extract_credits(content):
    """Extract the credits section from the play text.
    
    Args:
        content (str): The full play text
        
    Returns:
        tuple[str, str]: A tuple of (credits, remaining_content)
    """
    credits_match = re.search(r'^(.*?)(Characters in the Play|CHARACTERS|DRAMATIS PERSONAE)', content, re.DOTALL)
    if credits_match:
        credits = credits_match.group(1).strip()
        content = content[credits_match.start(2):]  # Start from characters section
    else:
        credits = ""
    return credits, content

def process_credits(credits):
    """Process the credits section of a play text.
    
    Args:
        credits (str): The raw credits text
        
    Returns:
        str: The processed credits text with escaped characters and formatted links
    """
    # Replace special characters
    credits = credits.replace('`', '\\`').replace('$', '\\$')
    
    # Add link formatting
    credits = re.sub(
        r'(https?://[^\s]+)',
        r'<a href="\1" target="_blank">\1</a>',
        credits
    )
    
    return credits

def process_text_formatting(text):
    """Process text formatting including quotes, dashes, and stage directions.
    
    Args:
        text (str): The raw text to process
        
    Returns:
        str: The processed text with formatted characters and markup
    """
    # Replace quotes before any other processing
    text = replace_quotes(text)
    
    # Replace em dashes
    text = text.replace("--", "&mdash;")
    
    # Process square brackets - make content italic with <i> tags
    text = re.sub(r'\[(.*?)\]', r'[<i>\1</i>]', text, flags=re.DOTALL)
    
    # Add newline after right square bracket if not already present
    text = re.sub(r'\](?!\n)', ']\n', text)
    
    # Reduce multiple newlines between ] and next text to max 2
    text = re.sub(r'\]\n{3,}', ']\n\n', text)
    
    return text

def process_acts_and_scenes(content):
    """Process act and scene headers, adding proper formatting and spacing.
    
    Args:
        content (str): The play content to process
        
    Returns:
        str: Content with formatted act/scene headers and proper spacing
    """
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
        elif not line.strip():  # Empty line
            processed_lines.append('<br>')
        else:
            after_act = False
            processed_lines.append(line)
    
    content = '\n'.join(processed_lines)
    
    # Handle Act/Scene spacing (replace empty lines with <br>)
    content = re.sub(r'(\n\n+)(<b [^>]*class="act-header"[^>]*>.*?</b>)\n+(<b [^>]*class="scene-header"[^>]*>.*?</b>)', 
                    r'<br>\2\n\3', 
                    content)
    
    # Ensure any remaining Act/Scene pairs have consistent spacing
    content = re.sub(r'(<b [^>]*class="act-header"[^>]*>.*?</b>)\n+(<b [^>]*class="scene-header"[^>]*>.*?</b>)', 
                    r'\1\n\2', 
                    content)
    
    return content

def process_speakers(content):
    """Process speaker names in the play content, adding proper formatting.
    
    Args:
        content (str): The play content to process
        
    Returns:
        str: Content with formatted speaker names
    """
    processed_lines = []
    seen_hr_count = 0
    
    for line in content.split('\n'):
        # Count <hr> tags to know when we're past the character list
        if '<hr>' in line:
            seen_hr_count += 1
            processed_lines.append(line)
            continue
            
        # Only process speakers if we're past the first hr
        if seen_hr_count >= 1:
            # Handle empty lines
            if not line.strip():
                processed_lines.append('<br>')
                continue
                
            words = line.split()
            if words:
                # Find the speaker portion (all uppercase words)
                speaker_end = 0
                for j, word in enumerate(words):
                    # Strip both leading and trailing punctuation
                    stripped_word = word.strip(',.!?:;()[]{}')
                    if not stripped_word.isupper() or len(stripped_word) == 1:
                        break
                    speaker_end = j + 1
                
                # If we found a speaker (at least one uppercase word)
                if speaker_end > 0:
                    speaker = ' '.join(words[:speaker_end])
                    rest = ' '.join(words[speaker_end:])
                    # Clean speaker text of punctuation and normalize whitespace
                    speaker = re.sub(r'[,.!?:;\s]+', ' ', speaker).strip()
                    # Add more visible formatting for speaker and dialogue
                    if rest.strip():
                        line = f"<speaker>{speaker}</speaker>\n{rest}"
                    else:
                        line = f"<speaker>{speaker}</speaker>"
        
        processed_lines.append(line)
    
    return '\n'.join(processed_lines)

def enumerate_play_lines(content):
    """Wrap play lines in numbered div elements, excluding speaker names and headers.
    Line numbers reset at the start of each scene.
    
    Args:
        content (str): The processed play content
        
    Returns:
        str: Content with enumerated line divs
    """
    processed_lines = []
    line_number = 1
    current_act = 1
    current_scene = 1
    
    for line in content.split('\n'):
        # Update act number when we hit an act header
        if line.startswith('<b') and 'class="act-header"' in line:
            act_match = re.search(r'Act (\d+)', line)
            if act_match:
                current_act = int(act_match.group(1))
                processed_lines.append(line)
                continue
        
        # Update scene number and reset line count when we hit a scene header
        if line.startswith('<b') and 'class="scene-header"' in line:
            scene_match = re.search(r'Scene (\d+)', line)
            if scene_match:
                current_scene = int(scene_match.group(1))
                line_number = 1
                processed_lines.append(line)
                continue
            
        # Skip empty lines, speakers, headers, and horizontal rules
        if (not line.strip() or 
            line.startswith('<speaker>') or 
            line.startswith('<b') or 
            '<hr>' in line):
            processed_lines.append(line)
            continue
            
        # Wrap the line in a numbered div with act and scene data
        processed_lines.append(
            f'<div class="play-line" data-line-number="{line_number}" '
            f'data-as="a{current_act}s{current_scene}">{line}</div>'
        )
        line_number += 1
    
    return '\n'.join(processed_lines)

def process_content(content):
    # Extract and process credits
    credits, content = extract_credits(content)
    credits = process_credits(credits)
    
    # Find the start of Act 1 (case and spacing insensitive)
    act1_match = re.search(r'\b[Aa][Cc][Tt]\s*[1I]\b', content)
    if act1_match:
        # Keep only content from Act 1 onwards
        content = content[act1_match.start():]
    
    # Apply text formatting
    content = process_text_formatting(content)
    
    # Process acts and scenes
    content = process_acts_and_scenes(content)
    
    # Process speakers
    content = process_speakers(content)
    
    # Enumerate play lines
    content = enumerate_play_lines(content)
    
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