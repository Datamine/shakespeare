// This will store the selected option globally
window.selectedOption = null;

// Sample data - replace this with your actual data
const options = [
  {"name": "A Midsummer Night's Dream", "filename": "a-midsummer-nights-dream_TXT_FolgerShakespeare.txt"},
  {"name": "All's Well That Ends Well", "filename": "alls-well-that-ends-well_TXT_FolgerShakespeare.txt"},
  {"name": "Antony and Cleopatra", "filename": "antony-and-cleopatra_TXT_FolgerShakespeare.txt"},
  {"name": "As You Like It", "filename": "as-you-like-it_TXT_FolgerShakespeare.txt"},
  {"name": "Coriolanus", "filename": "coriolanus_TXT_FolgerShakespeare.txt"},
  {"name": "Cymbeline", "filename": "cymbeline_TXT_FolgerShakespeare.txt"},
  {"name": "Hamlet", "filename": "hamlet_TXT_FolgerShakespeare.txt"},
  {"name": "Henry IV, Part 1", "filename": "henry-iv-part-1_TXT_FolgerShakespeare.txt"},
  {"name": "Henry IV, Part 2", "filename": "henry-iv-part-2_TXT_FolgerShakespeare.txt"},
  {"name": "Henry V", "filename": "henry-v_TXT_FolgerShakespeare.txt"},
  {"name": "Henry VI, Part 1", "filename": "henry-vi-part-1_TXT_FolgerShakespeare.txt"},
  {"name": "Henry VI, Part 2", "filename": "henry-vi-part-2_TXT_FolgerShakespeare.txt"},
  {"name": "Henry VI, Part 3", "filename": "henry-vi-part-3_TXT_FolgerShakespeare.txt"},
  {"name": "Henry VIII", "filename": "henry-viii_TXT_FolgerShakespeare.txt"},
  {"name": "Julius Caesar", "filename": "julius-caesar_TXT_FolgerShakespeare.txt"},
  {"name": "King John", "filename": "king-john_TXT_FolgerShakespeare.txt"},
  {"name": "King Lear", "filename": "king-lear_TXT_FolgerShakespeare.txt"},
  {"name": "Love's Labor's Lost", "filename": "loves-labors-lost_TXT_FolgerShakespeare.txt"},
  {"name": "The Rape of Lucrece", "filename": "lucrece_TXT_FolgerShakespeare.txt"},
  {"name": "Macbeth", "filename": "macbeth_TXT_FolgerShakespeare.txt"},
  {"name": "Measure for Measure", "filename": "measure-for-measure_TXT_FolgerShakespeare.txt"},
  {"name": "Much Ado About Nothing", "filename": "much-ado-about-nothing_TXT_FolgerShakespeare.txt"},
  {"name": "Othello", "filename": "othello_TXT_FolgerShakespeare.txt"},
  {"name": "Pericles", "filename": "pericles_TXT_FolgerShakespeare.txt"},
  {"name": "Richard II", "filename": "richard-ii_TXT_FolgerShakespeare.txt"},
  {"name": "Richard III", "filename": "richard-iii_TXT_FolgerShakespeare.txt"},
  {"name": "Romeo and Juliet", "filename": "romeo-and-juliet_TXT_FolgerShakespeare.txt"},
  {"name": "Shakespeare's Sonnets", "filename": "shakespeares-sonnets_TXT_FolgerShakespeare.txt"},
  {"name": "The Comedy of Errors", "filename": "the-comedy-of-errors_TXT_FolgerShakespeare.txt"},
  {"name": "The Merchant of Venice", "filename": "the-merchant-of-venice_TXT_FolgerShakespeare.txt"},
  {"name": "The Merry Wives of Windsor", "filename": "the-merry-wives-of-windsor_TXT_FolgerShakespeare.txt"},
  {"name": "The Phoenix and Turtle", "filename": "the-phoenix-and-turtle_TXT_FolgerShakespeare.txt"},
  {"name": "The Taming of the Shrew", "filename": "the-taming-of-the-shrew_TXT_FolgerShakespeare.txt"},
  {"name": "The Tempest", "filename": "the-tempest_TXT_FolgerShakespeare.txt"},
  {"name": "The Two Gentlemen of Verona", "filename": "the-two-gentlemen-of-verona_TXT_FolgerShakespeare.txt"},
  {"name": "The Two Noble Kinsmen", "filename": "the-two-noble-kinsmen_TXT_FolgerShakespeare.txt"},
  {"name": "The Winter's Tale", "filename": "the-winters-tale_TXT_FolgerShakespeare.txt"},
  {"name": "Timon of Athens", "filename": "timon-of-athens_TXT_FolgerShakespeare.txt"},
  {"name": "Titus Andronicus", "filename": "titus-andronicus_TXT_FolgerShakespeare.txt"},
  {"name": "Troilus and Cressida", "filename": "troilus-and-cressida_TXT_FolgerShakespeare.txt"},
  {"name": "Twelfth Night", "filename": "twelfth-night_TXT_FolgerShakespeare.txt"},
  {"name": "Venus and Adonis", "filename": "venus-and-adonis_TXT_FolgerShakespeare.txt"}
]

const input = document.getElementById('typeahead-input');
const suggestionsList = document.getElementById('suggestions-list');
let selectedIndex = -1;

// Hide suggestions list initially
suggestionsList.classList.add('hidden');

const searchOptions = _.debounce((searchText) => {
    const filteredOptions = searchText 
        ? options.filter(option => 
            option.name.toLowerCase().includes(searchText.toLowerCase()))
        : options; // Show first 10 options when no search text
    
    updateSuggestions(filteredOptions);
    selectedIndex = -1;
}, 50);

function updateSuggestions(filteredOptions) {
    suggestionsList.innerHTML = '';
    
    if (filteredOptions.length > 0) {
        filteredOptions.forEach((option, index) => {
            const li = document.createElement('li');
            li.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer';
            li.textContent = option.name;
            li.setAttribute('data-index', index);
            li.onclick = () => selectOption(option);
            suggestionsList.appendChild(li);
        });
        suggestionsList.classList.remove('hidden');
    } else {
        suggestionsList.classList.add('hidden');
    }
}

const goButton = document.getElementById('go-button');

function selectOption(option) {
    input.value = option.name;
    suggestionsList.classList.add('hidden');
    selectedIndex = -1;
    // Enable and style the Go button
    goButton.classList.add('active');
    goButton.disabled = false;
    console.log('Selected:', option);
}

// Reset button when input changes
input.addEventListener('input', (e) => {
    goButton.classList.remove('active');
    goButton.disabled = true;
    searchOptions(e.target.value);
});

// Add click handler for the Go button
goButton.addEventListener('click', () => {
    if (!goButton.disabled) {
        goButton.classList.add('loading');
        
        // Replace the entire body content with our new layout
        document.body.innerHTML = `
            <div class="three-pane-layout">
                <div class="sidebar">
                    <!-- Sidebar content -->
                </div>
                <div class="main-content">
                    <div class="cream-pane">
                        <!-- Cream pane content -->
                    </div>
                    <div class="white-pane">
                        <!-- White pane content -->
                    </div>
                </div>
            </div>
        `;
        
        // Remove loading state (though this won't be visible anymore)
        goButton.classList.remove('loading');
    }
});

function updateSelectedItem(newIndex) {
    const items = suggestionsList.querySelectorAll('li');
    items.forEach(item => item.classList.remove('bg-gray-100'));
    
    if (newIndex >= 0 && newIndex < items.length) {
        selectedIndex = newIndex;
        const selectedItem = items[selectedIndex];
        selectedItem.classList.add('bg-gray-100');
        selectedItem.scrollIntoView({ block: 'nearest' });
    }
}

// Event listeners
input.addEventListener('input', (e) => {
    searchOptions(e.target.value);
});

input.addEventListener('focus', () => {
    searchOptions('');
});

input.addEventListener('keydown', (e) => {
    const items = suggestionsList.querySelectorAll('li');
    
    if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
            e.preventDefault();
            items[selectedIndex].click();
            // Trigger the go button if it's enabled
            if (!goButton.disabled) {
                goButton.click();
            }
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateSelectedItem(selectedIndex + 1);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateSelectedItem(selectedIndex - 1);
    }
});

document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !suggestionsList.contains(e.target)) {
        suggestionsList.classList.add('hidden');
        selectedIndex = -1;
    }
});

const icon = document.querySelector('.icon');
let duration = 3; // Start with 3 seconds per rotation
let animationFrameId = null;
let currentRotation = 0;
let isSpinning = false;

icon.addEventListener('mouseover', function() {
    isSpinning = true;
    function accelerate() {
        if (document.querySelector('.icon:hover')) {  // Only continue if still hovering
            duration = Math.max(0.5, duration * 0.99);  // Decrease duration, but not below 0.5s
            icon.style.animationDuration = duration + 's';
            animationFrameId = requestAnimationFrame(accelerate);
        }
    }
    
    // Reset duration when starting to hover
    duration = 3;
    icon.style.animation = 'spin ' + duration + 's linear infinite';
    animationFrameId = requestAnimationFrame(accelerate);
});

icon.addEventListener('mouseout', function() {
    cancelAnimationFrame(animationFrameId);
    
    function decelerate() {
        duration = Math.min(5, duration * 1.01);  // Even slower deceleration (1.01 instead of 1.03)
        icon.style.animationDuration = duration + 's';
        
        if (duration < 5) {  // Continue spinning longer (2.95 instead of 2.9)
            animationFrameId = requestAnimationFrame(decelerate);
        } else {
            cancelAnimationFrame(animationFrameId);
            icon.style.animation = 'none';
            setTimeout(() => {  // Delay setting isSpinning to false
                isSpinning = false;
            }, 500);  // Wait half a second after animation stops
        }
    }
    
    animationFrameId = requestAnimationFrame(decelerate);
});

icon.addEventListener('click', function(e) {
    const rect = icon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Increased to 45 particles
    for (let i = 0; i < 45; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        // Increased size to 35px
        particle.style.width = '35px';
        particle.style.height = '35px';
        particle.style.backgroundImage = `url(${icon.src})`;
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        document.body.appendChild(particle);

        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 100 + Math.random() * 100;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const rotation = (Math.random() - 0.5) * 720;

        requestAnimationFrame(() => {
            particle.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotation}deg)`;
            particle.classList.add('exploded');
        });

        setTimeout(() => {
            document.body.removeChild(particle);
        }, 1000);
    }

    icon.style.opacity = '0';
    setTimeout(() => {
        icon.style.display = 'none';
    }, 100);
});
