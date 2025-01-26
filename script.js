// This will store the selected option globally
window.selectedOption = null;

// Sample data - replace this with your actual data
const options = [
  {"name": "A Midsummer Night's Dream", "filename": "a-midsummer-nights-dream"},
  {"name": "All's Well That Ends Well", "filename": "alls-well-that-ends-well"},
  {"name": "Antony and Cleopatra", "filename": "antony-and-cleopatra"},
  {"name": "As You Like It", "filename": "as-you-like-it"},
  {"name": "Coriolanus", "filename": "coriolanus"},
  {"name": "Cymbeline", "filename": "cymbeline"},
  {"name": "Hamlet", "filename": "hamlet"},
  {"name": "Henry IV, Part 1", "filename": "henry-iv-part-1"},
  {"name": "Henry IV, Part 2", "filename": "henry-iv-part-2"},
  {"name": "Henry V", "filename": "henry-v"},
  {"name": "Henry VI, Part 1", "filename": "henry-vi-part-1"},
  {"name": "Henry VI, Part 2", "filename": "henry-vi-part-2"},
  {"name": "Henry VI, Part 3", "filename": "henry-vi-part-3"},
  {"name": "Henry VIII", "filename": "henry-viii"},
  {"name": "Julius Caesar", "filename": "julius-caesar"},
  {"name": "King John", "filename": "king-john"},
  {"name": "King Lear", "filename": "king-lear"},
  {"name": "Love's Labor's Lost", "filename": "loves-labors-lost"},
  {"name": "The Rape of Lucrece", "filename": "lucrece"},
  {"name": "Macbeth", "filename": "macbeth"},
  {"name": "Measure for Measure", "filename": "measure-for-measure"},
  {"name": "Much Ado About Nothing", "filename": "much-ado-about-nothing"},
  {"name": "Othello", "filename": "othello"},
  {"name": "Pericles", "filename": "pericles"},
  {"name": "Richard II", "filename": "richard-ii"},
  {"name": "Richard III", "filename": "richard-iii"},
  {"name": "Romeo and Juliet", "filename": "romeo-and-juliet"},
  {"name": "Shakespeare's Sonnets", "filename": "shakespeares-sonnets"},
  {"name": "The Comedy of Errors", "filename": "the-comedy-of-errors"},
  {"name": "The Merchant of Venice", "filename": "the-merchant-of-venice"},
  {"name": "The Merry Wives of Windsor", "filename": "the-merry-wives-of-windsor"},
  {"name": "The Phoenix and Turtle", "filename": "the-phoenix-and-turtle"},
  {"name": "The Taming of the Shrew", "filename": "the-taming-of-the-shrew"},
  {"name": "The Tempest", "filename": "the-tempest"},
  {"name": "The Two Gentlemen of Verona", "filename": "the-two-gentlemen-of-verona"},
  {"name": "The Two Noble Kinsmen", "filename": "the-two-noble-kinsmen"},
  {"name": "The Winter's Tale", "filename": "the-winters-tale"},
  {"name": "Timon of Athens", "filename": "timon-of-athens"},
  {"name": "Titus Andronicus", "filename": "titus-andronicus"},
  {"name": "Troilus and Cressida", "filename": "troilus-and-cressida"},
  {"name": "Twelfth Night", "filename": "twelfth-night"},
  {"name": "Venus and Adonis", "filename": "venus-and-adonis"}
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
goButton.addEventListener('click', async () => {
    if (!goButton.disabled) {
        goButton.classList.add('loading');
        
        // Get the selected play name and filename
        const selectedPlay = input.value;
        const playFile = options.find(opt => opt.name === selectedPlay)?.filename;
    
        // Dynamically import the selected play
        // LOCAL DEV ONLY const playModule = await import(`/plays/${playFile}.js`);
        // const playText = "Lorem Ipsum"; // playModule.text;
        const rawPlayText = `<b id="act-1" class="act-header">Act 1</b>
<b id="act-1-scene-1" class="scene-header">Scene 1</b>
<hr>
[<i>Enter young Bertram Count of Rossillion, his mother
the Countess, and Helen, Lord Lafew, all in black.</i>]

<speaker>COUNTESS</speaker>
In delivering my son from me, I bury a second
husband.

<speaker>BERTRAM</speaker>
And I in going, madam, weep o'er my
father's death anew; but I must attend his Majesty's
command, to whom I am now in ward, evermore
in subjection.`;

        const characters = `<b class="characters-header">Characters in the Play</b><hr>
<ul><li>Four lovers:</li><ul><li>HERMIA</li><li>LYSANDER</li><li>HELENA</li><li>DEMETRIUS</li></ul><li>THESEUS, duke of Athens</li><li>HIPPOLYTA, queen of the Amazons</li><li>EGEUS, father to Hermia</li><li>PHILOSTRATE, master of the revels to Theseus</li><li>NICK BOTTOM, weaver</li><li>PETER QUINCE, carpenter</li><li>FRANCIS FLUTE, bellows-mender</li><li>TOM SNOUT, tinker</li><li>SNUG, joiner</li><li>ROBIN STARVELING, tailor</li><li>OBERON, king of the Fairies</li><li>TITANIA, queen of the Fairies</li><li>ROBIN GOODFELLOW, a "puck," or hobgoblin, in Oberon's service</li><li>A FAIRY, in the service of Titania</li><li>Fairies attending upon Titania:</li><ul><li>PEASEBLOSSOM</li><li>COBWEB</li><li>MOTE</li><li>MUSTARDSEED</li></ul><li>Lords and Attendants on Theseus and Hippolyta</li><li>Other Fairies in the trains of Titania and Oberon</li></ul>`;

        const credits = `All's Well That Ends Well
        by William Shakespeare
        Edited by Barbara A. Mowat and Paul Werstine
          with Michael Poston and Rebecca Niles
        Folger Shakespeare Library
        https://shakespeare.folger.edu/shakespeares-works/alls-well-that-ends-well/
        Created on Mar 14, 2018, from FDT version 0.9.2.2`;

        // Only add line numbers to the play text, not the characters
        const processedText = addLineNumbers(rawPlayText);

        // Replace the entire body content with our new layout
        document.body.innerHTML = `
            <div class="three-pane-layout">
                <div class="sidebar">
                    <div class="icon-container">
                        <img src="shakespeare_icon.png" alt="App Icon" class="sidebar-icon">
                    </div>
                    <div class="sidebar-acts"></div>
                </div>
                <div class="main-content">
                    <div class="cream-pane">
                        <div class="text-content">${characters}<br/>${processedText}</div>
                    </div>
                    <div class="white-pane">
                        <!-- White pane content -->
                    </div>
                </div>
                <div class="version-number">v1.0.1</div>
            </div>
        `;

        // Add scroll button handlers
        const textContent = document.querySelector('.text-content');

        const scrollAmount = 300; // pixels to scroll

        // Add spinning effect and click handler to sidebar icon
        const sidebarIcon = document.querySelector('.sidebar-icon');

        // Apply the same spinning effect
        sidebarIcon.addEventListener('mouseover', () => handleIconMouseOver(sidebarIcon));
        sidebarIcon.addEventListener('mouseout', () => handleIconMouseOut(sidebarIcon));

        // Add click handler to return to home page
        sidebarIcon.addEventListener('click', function() {
            window.location.reload();
        });

        // Add this line after the innerHTML is set
        updateSidebar(rawPlayText, selectedPlay);
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

// Helper functions for icon spin animation
function handleIconMouseOver(icon) {
    isSpinning = true;
    function accelerate() {
        if (icon.matches(':hover')) {  // Changed to work with any icon
            duration = Math.max(0.5, duration * 0.99);
            icon.style.animationDuration = duration + 's';
            animationFrameId = requestAnimationFrame(accelerate);
        }
    }
    
    duration = 3;
    icon.style.animation = 'spin ' + duration + 's linear infinite';
    animationFrameId = requestAnimationFrame(accelerate);
}

function handleIconMouseOut(icon) {
    cancelAnimationFrame(animationFrameId);
    
    function decelerate() {
        duration = Math.min(5, duration * 1.01);
        icon.style.animationDuration = duration + 's';
        
        if (duration < 5) {
            animationFrameId = requestAnimationFrame(decelerate);
        } else {
            cancelAnimationFrame(animationFrameId);
            icon.style.animation = 'none';
            setTimeout(() => {
                isSpinning = false;
            }, 500);
        }
    }
    
    animationFrameId = requestAnimationFrame(decelerate);
}

// Landing page icon event listeners
icon.addEventListener('mouseover', () => handleIconMouseOver(icon));
icon.addEventListener('mouseout', () => handleIconMouseOut(icon));

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

function updateSidebar(playText, selectedPlay) {
    // First, process the text to add line numbers
    const processedText = addLineNumbers(playText);
    
    const sidebar = document.querySelector('.sidebar-acts');
    
    // Clear existing content
    while (sidebar.children.length > 0) {
        sidebar.removeChild(sidebar.lastChild);
    }
    
    // Add play title
    const playTitle = document.createElement('div');
    playTitle.className = 'act-item play-title';
    playTitle.style.cursor = 'default';
    playTitle.style.pointerEvents = 'none';
    playTitle.style.backgroundColor = 'transparent';
    playTitle.textContent = selectedPlay;
    sidebar.appendChild(playTitle);
    
    // Create acts container
    const actsContainer = document.createElement('div');
    actsContainer.className = 'sidebar-acts';
    
    // Track all acts and their scenes
    const acts = [];
    let currentAct = null;
    let actCount = 0;
    let sceneCount = 0;
    
    const lines = processedText.split('\n');
    lines.forEach((line) => {
        // Check for Act headers
        if (line.includes('class="act-header"')) {
            actCount++;
            sceneCount = 0;  // Reset scene count for new act
            const actDiv = document.createElement('div');
            actDiv.className = 'act-item';
            const actText = line.replace(/<\/?b[^>]*>/g, '').trim();
            actDiv.textContent = actText;
            
            const actNumber = actCount; // Use actCount directly instead of parsing text
            
            const scenesContainer = document.createElement('div');
            scenesContainer.className = 'scenes-container';
            
            actDiv.onclick = () => {
                const target = document.querySelector(`#act-${actNumber}`);
                if (target) {
                    selectAct(actNumber);
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            };
            
            acts.push({ div: actDiv, scenes: scenesContainer });
            actsContainer.appendChild(actDiv);
            actsContainer.appendChild(scenesContainer);
            currentAct = { div: actDiv, scenes: scenesContainer };
        }
        // Check for Scene headers
        else if (line.includes('class="scene-header"') && currentAct) {
            sceneCount++;
            const sceneDiv = document.createElement('div');
            sceneDiv.className = 'scene-item';
            sceneDiv.textContent = line.replace(/<\/?b[^>]*>/g, '').trim();
            
            // Store the current act and scene numbers in closure
            const thisAct = actCount;
            const thisScene = sceneCount;
            
            sceneDiv.onclick = () => {
                const target = document.querySelector(`#act-${thisAct}-scene-${thisScene}`);
                if (target) {
                    selectAct(thisAct, thisScene);
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            };
            currentAct.scenes.appendChild(sceneDiv);
        }
    });
    
    if (actsContainer.children.length > 0) {
        sidebar.appendChild(actsContainer);
    }
    
    // Add scroll detection
    const textContent = document.querySelector('.text-content');
    textContent.addEventListener('scroll', _.throttle(() => {
        updateActiveActFromScroll(acts);
    }, 100));
    
    // Initial selection - select Act 1 and show its scenes
    selectAct(1);
    const firstScenesContainer = document.querySelector('.scenes-container');
    if (firstScenesContainer) {
        firstScenesContainer.style.display = 'block';
    }
}

function selectAct(actCount, sceneCount = null) {
    // Remove all active states
    document.querySelectorAll('.act-item, .scene-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Hide all scenes containers first
    document.querySelectorAll('.scenes-container').forEach(container => {
        container.style.display = 'none';
    });
    
    // Mark active act and show its scenes
    const actItems = document.querySelectorAll('.act-item');
    const scenesContainers = document.querySelectorAll('.scenes-container');
    
    // Skip the play title when selecting acts
    const actIndex = actCount;  // Changed from actCount - 1
    const targetAct = Array.from(actItems).find((item, index) => 
        index > 0 && item.textContent.includes(`Act ${actCount}`));
    
    if (targetAct) {
        targetAct.classList.add('active');
        // Find the scenes container that comes after this act
        const targetScenesContainer = targetAct.nextElementSibling;
        if (targetScenesContainer && targetScenesContainer.classList.contains('scenes-container')) {
            targetScenesContainer.style.display = 'block';
            
            if (sceneCount !== null) {
                const sceneItems = targetScenesContainer.querySelectorAll('.scene-item');
                const targetScene = Array.from(sceneItems).find(item => 
                    item.textContent.includes(`Scene ${sceneCount}`));
                if (targetScene) {
                    targetScene.classList.add('active');
                }
            }
        }
    }
}

function updateActiveActFromScroll(acts) {
    const textContent = document.querySelector('.text-content');
    const scrollPosition = textContent.scrollTop;
    const viewportHeight = textContent.clientHeight;
    const buffer = viewportHeight * 0.2; // 20% buffer zone
    
    let mostVisibleAct = 1;
    let mostVisibleScene = 1;
    let maxVisibility = 0;
    
    // First find all scene elements and check their visibility
    for (let act = 1; act <= acts.length; act++) {
        const actScenes = document.querySelectorAll(`[id^="act-${act}-scene-"]`);
        actScenes.forEach((sceneElement) => {
            const rect = sceneElement.getBoundingClientRect();
            
            // Calculate visibility with a bias towards elements near the top of the viewport
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            const elementHeight = rect.height;
            
            // Give more weight to elements near the top of the viewport
            let visibility = 0;
            if (elementTop < buffer && elementBottom > 0) {
                // Element is near the top of viewport
                visibility = elementHeight + (buffer - elementTop);
            } else if (elementTop >= 0 && elementTop < viewportHeight) {
                // Element is in viewport but not at top
                visibility = Math.min(elementBottom, viewportHeight) - elementTop;
            }
            
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                const [, actNum, , sceneNum] = sceneElement.id.split('-');
                mostVisibleAct = parseInt(actNum);
                mostVisibleScene = parseInt(sceneNum);
            }
        });
    }
    
    // Only update if we found a visible scene
    if (maxVisibility > 0) {
        selectAct(mostVisibleAct, mostVisibleScene);
    }
}

function addLineNumbers(playText) {
    const lines = playText.split('\n');
    let currentLineNumber = 0;
    let inScene = false;
    let processedLines = [];
    
    for (let line of lines) {
        // Skip empty lines
        if (!line.trim()) {
            processedLines.push(line);
            continue;
        }

        // If this is a scene header, reset line counter
        if (line.includes('class="scene-header"')) {
            currentLineNumber = 0;
            inScene = true;
            processedLines.push(line);
            continue;
        }
        
        // Skip headers, stage directions, and HTML elements
        if (line.includes('class="act-header"') || 
            line.includes('<hr>') ||
            line.trim().startsWith('<') ||
            line.trim().startsWith('[')) {
            processedLines.push(line);
            continue;
        }
        
        // If we're in a scene and the line has actual text content
        if (inScene && line.trim()) {
            currentLineNumber++;
            // Only show line numbers for every 5th line
            const lineNumber = currentLineNumber % 5 === 0 ? currentLineNumber : '&nbsp;&nbsp;&nbsp;';
            // Add the line number in a span with right padding
            processedLines.push(`<span class="line-number">${lineNumber}</span>${line}`);
        } else {
            processedLines.push(line);
        }
    }
    
    return processedLines.join('\n');
}
