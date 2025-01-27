// This will store the selected option globally
window.selectedOption = null;
window.currentPlayText = null;
window.currentProcessedText = null;
window.currentCharacters = null;
window.currentPlayTitle = null;

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

const credits = `A Midsummer Night's Dream
by William Shakespeare
Edited by Barbara A. Mowat and Paul Werstine
  with Michael Poston and Rebecca Niles
Folger Shakespeare Library
<a href="https://shakespeare.folger.edu/shakespeares-works/a-midsummer-nights-dream/" target="_blank">https://shakespeare.folger.edu/shakespeares-works/a-midsummer-nights-dream/</a>
Created on Jul 31, 2015, from FDT version 0.9.2`;
;

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
<br>
<b id="act-1-scene-1" class="scene-header">Scene 1</b>
<hr>
<div class="play-line" data-line-number="1">[<i>Enter Theseus, Hippolyta, and Philostrate, with others.</i>]</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="2">Now, fair Hippolyta, our nuptial hour</div>
<div class="play-line" data-line-number="3">Draws on apace. Four happy days bring in</div>
<div class="play-line" data-line-number="4">Another moon. But, O, methinks how slow</div>
<div class="play-line" data-line-number="5">This old moon wanes! She lingers my desires</div>
<div class="play-line" data-line-number="6">Like to a stepdame or a dowager</div>
<div class="play-line" data-line-number="7">Long withering out a young man&rsquo;s revenue.</div>
<br>
<speaker>HIPPOLYTA</speaker>
<div class="play-line" data-line-number="8">Four days will quickly steep themselves in night;</div>
<div class="play-line" data-line-number="9">Four nights will quickly dream away the time;</div>
<div class="play-line" data-line-number="10">And then the moon, like to a silver bow</div>
<div class="play-line" data-line-number="11">New-bent in heaven, shall behold the night</div>
<div class="play-line" data-line-number="12">Of our solemnities.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="13">Go, Philostrate,</div>
<div class="play-line" data-line-number="14">Stir up the Athenian youth to merriments.</div>
<div class="play-line" data-line-number="15">Awake the pert and nimble spirit of mirth.</div>
<div class="play-line" data-line-number="16">Turn melancholy forth to funerals;</div>
<div class="play-line" data-line-number="17">The pale companion is not for our pomp.</div>
<div class="play-line" data-line-number="18">[<i>Philostrate exits.</i>]</div>
<div class="play-line" data-line-number="19">Hippolyta, I wooed thee with my sword</div>
<div class="play-line" data-line-number="20">And won thy love doing thee injuries,</div>
<div class="play-line" data-line-number="21">But I will wed thee in another key,</div>
<div class="play-line" data-line-number="22">With pomp, with triumph, and with reveling.</div>
<br>
<div class="play-line" data-line-number="23">[<i>Enter Egeus and his daughter Hermia, and Lysander </div>
<div class="play-line" data-line-number="24"> and Demetrius.</i>]</div>
<br>
<speaker>EGEUS</speaker>
<div class="play-line" data-line-number="25">Happy be Theseus, our renowned duke!</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="26">Thanks, good Egeus. What&rsquo;s the news with thee?</div>
<br>
<speaker>EGEUS</speaker>
<div class="play-line" data-line-number="27">Full of vexation come I, with complaint</div>
<div class="play-line" data-line-number="28">Against my child, my daughter Hermia.&mdash;</div>
<div class="play-line" data-line-number="29">Stand forth, Demetrius.&mdash;My noble lord,</div>
<div class="play-line" data-line-number="30">This man hath my consent to marry her.&mdash;</div>
<div class="play-line" data-line-number="31">Stand forth, Lysander.&mdash;And, my gracious duke,</div>
<div class="play-line" data-line-number="32">This man hath bewitched the bosom of my child.&mdash;</div>
<div class="play-line" data-line-number="33">Thou, thou, Lysander, thou hast given her rhymes</div>
<div class="play-line" data-line-number="34">And interchanged love tokens with my child.</div>
<div class="play-line" data-line-number="35">Thou hast by moonlight at her window sung</div>
<div class="play-line" data-line-number="36">With feigning voice verses of feigning love</div>
<div class="play-line" data-line-number="37">And stol&rsquo;n the impression of her fantasy</div>
<div class="play-line" data-line-number="38">With bracelets of thy hair, rings, gauds, conceits,</div>
<div class="play-line" data-line-number="39">Knacks, trifles, nosegays, sweetmeats&mdash;messengers</div>
<div class="play-line" data-line-number="40">Of strong prevailment in unhardened youth.</div>
<div class="play-line" data-line-number="41">With cunning hast thou filched my daughter&rsquo;s heart,</div>
<div class="play-line" data-line-number="42">Turned her obedience (which is due to me)</div>
<div class="play-line" data-line-number="43">To stubborn harshness.&mdash;And, my gracious duke,</div>
<div class="play-line" data-line-number="44">Be it so she will not here before your Grace</div>
<div class="play-line" data-line-number="45">Consent to marry with Demetrius,</div>
<div class="play-line" data-line-number="46">I beg the ancient privilege of Athens:</div>
<div class="play-line" data-line-number="47">As she is mine, I may dispose of her,</div>
<div class="play-line" data-line-number="48">Which shall be either to this gentleman</div>
<div class="play-line" data-line-number="49">Or to her death, according to our law</div>
<div class="play-line" data-line-number="50">Immediately provided in that case.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="51">What say you, Hermia? Be advised, fair maid.</div>
<div class="play-line" data-line-number="52">To you, your father should be as a god,</div>
<div class="play-line" data-line-number="53">One that composed your beauties, yea, and one</div>
<div class="play-line" data-line-number="54">To whom you are but as a form in wax</div>
<div class="play-line" data-line-number="55">By him imprinted, and within his power</div>
<div class="play-line" data-line-number="56">To leave the figure or disfigure it.</div>
<div class="play-line" data-line-number="57">Demetrius is a worthy gentleman.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="58">So is Lysander.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="59">In himself he is,</div>
<div class="play-line" data-line-number="60">But in this kind, wanting your father&rsquo;s voice,</div>
<div class="play-line" data-line-number="61">The other must be held the worthier.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="62">I would my father looked but with my eyes.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="63">Rather your eyes must with his judgment look.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="64">I do entreat your Grace to pardon me.</div>
<div class="play-line" data-line-number="65">I know not by what power I am made bold,</div>
<div class="play-line" data-line-number="66">Nor how it may concern my modesty</div>
<div class="play-line" data-line-number="67">In such a presence here to plead my thoughts;</div>
<div class="play-line" data-line-number="68">But I beseech your Grace that I may know</div>
<div class="play-line" data-line-number="69">The worst that may befall me in this case</div>
<div class="play-line" data-line-number="70">If I refuse to wed Demetrius.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="71">Either to die the death or to abjure</div>
<div class="play-line" data-line-number="72">Forever the society of men.</div>
<div class="play-line" data-line-number="73">Therefore, fair Hermia, question your desires,</div>
<div class="play-line" data-line-number="74">Know of your youth, examine well your blood,</div>
<div class="play-line" data-line-number="75">Whether (if you yield not to your father&rsquo;s choice)</div>
<div class="play-line" data-line-number="76">You can endure the livery of a nun,</div>
<div class="play-line" data-line-number="77">For aye to be in shady cloister mewed,</div>
<div class="play-line" data-line-number="78">To live a barren sister all your life,</div>
<div class="play-line" data-line-number="79">Chanting faint hymns to the cold fruitless moon.</div>
<div class="play-line" data-line-number="80">Thrice-blessed they that master so their blood</div>
<div class="play-line" data-line-number="81">To undergo such maiden pilgrimage,</div>
<div class="play-line" data-line-number="82">But earthlier happy is the rose distilled</div>
<div class="play-line" data-line-number="83">Than that which, withering on the virgin thorn,</div>
<div class="play-line" data-line-number="84">Grows, lives, and dies in single blessedness.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="85">So will I grow, so live, so die, my lord,</div>
<div class="play-line" data-line-number="86">Ere I will yield my virgin patent up</div>
<div class="play-line" data-line-number="87">Unto his Lordship whose unwished yoke</div>
<div class="play-line" data-line-number="88">My soul consents not to give sovereignty.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="89">Take time to pause, and by the next new moon</div>
<div class="play-line" data-line-number="90">(The sealing day betwixt my love and me</div>
<div class="play-line" data-line-number="91">For everlasting bond of fellowship),</div>
<div class="play-line" data-line-number="92">Upon that day either prepare to die</div>
<div class="play-line" data-line-number="93">For disobedience to your father&rsquo;s will,</div>
<div class="play-line" data-line-number="94">Or else to wed Demetrius, as he would,</div>
<div class="play-line" data-line-number="95">Or on Diana&rsquo;s altar to protest</div>
<div class="play-line" data-line-number="96">For aye austerity and single life.</div>
<br>
<speaker>DEMETRIUS</speaker>
<div class="play-line" data-line-number="97">Relent, sweet Hermia, and, Lysander, yield</div>
<div class="play-line" data-line-number="98">Thy crazed title to my certain right.</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="99">You have her father&rsquo;s love, Demetrius.</div>
<div class="play-line" data-line-number="100">Let me have Hermia&rsquo;s. Do you marry him.</div>
<br>
<speaker>EGEUS</speaker>
<div class="play-line" data-line-number="101">Scornful Lysander, true, he hath my love;</div>
<div class="play-line" data-line-number="102">And what is mine my love shall render him.</div>
<div class="play-line" data-line-number="103">And she is mine, and all my right of her</div>
<div class="play-line" data-line-number="104">I do estate unto Demetrius.</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="105">[<i>to Theseus</i>]</div>
<div class="play-line" data-line-number="106">I am, my lord, as well derived as he,</div>
<div class="play-line" data-line-number="107">As well possessed. My love is more than his;</div>
<div class="play-line" data-line-number="108">My fortunes every way as fairly ranked</div>
<div class="play-line" data-line-number="109">(If not with vantage) as Demetrius&rsquo;;</div>
<div class="play-line" data-line-number="110">And (which is more than all these boasts can be)</div>
<div class="play-line" data-line-number="111">I am beloved of beauteous Hermia.</div>
<div class="play-line" data-line-number="112">Why should not I then prosecute my right?</div>
<div class="play-line" data-line-number="113">Demetrius, I&rsquo;ll avouch it to his head,</div>
<div class="play-line" data-line-number="114">Made love to Nedar&rsquo;s daughter, Helena,</div>
<div class="play-line" data-line-number="115">And won her soul; and she, sweet lady, dotes,</div>
<div class="play-line" data-line-number="116">Devoutly dotes, dotes in idolatry,</div>
<div class="play-line" data-line-number="117">Upon this spotted and inconstant man.</div>`;

        const characters = `<b class="characters-header">Characters in the Play</b><hr>
<ul><li>Four lovers:</li><ul><li>HERMIA</li><li>LYSANDER</li><li>HELENA</li><li>DEMETRIUS</li></ul><li>THESEUS, duke of Athens</li><li>HIPPOLYTA, queen of the Amazons</li><li>EGEUS, father to Hermia</li><li>PHILOSTRATE, master of the revels to Theseus</li><li>NICK BOTTOM, weaver</li><li>PETER QUINCE, carpenter</li><li>FRANCIS FLUTE, bellows-mender</li><li>TOM SNOUT, tinker</li><li>SNUG, joiner</li><li>ROBIN STARVELING, tailor</li><li>OBERON, king of the Fairies</li><li>TITANIA, queen of the Fairies</li><li>ROBIN GOODFELLOW, a "puck," or hobgoblin, in Oberon's service</li><li>A FAIRY, in the service of Titania</li><li>Fairies attending upon Titania:</li><ul><li>PEASEBLOSSOM</li><li>COBWEB</li><li>MOTE</li><li>MUSTARDSEED</li></ul><li>Lords and Attendants on Theseus and Hippolyta</li><li>Other Fairies in the trains of Titania and Oberon</li></ul>`;

        // Only add line numbers to the play text, not the characters
        const processedText = addLineNumbers(rawPlayText);

        // Store in global variables
        window.currentPlayText = rawPlayText;
        window.currentCharacters = characters;
        window.currentProcessedText = processedText;
        window.currentPlayTitle = selectedPlay;

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
                        <div class="text-content"><b class="play-title-header">${window.currentPlayTitle}</b><br/>${window.currentCharacters}<br/>${window.currentProcessedText}</div>
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
        updateSidebar(window.currentPlayText, window.currentPlayTitle);
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
    
    const lines = playText.split('\n');
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

    // Add credits link above version number
    const creditsLink = document.createElement('div');
    creditsLink.className = 'credits-link';
    creditsLink.textContent = 'Credits';
    creditsLink.onclick = () => {
        // Remove active state from all items
        document.querySelectorAll('.act-item, .scene-item').forEach(item => {
            item.classList.remove('active');
        });
        // Hide all scenes containers
        document.querySelectorAll('.scenes-container').forEach(container => {
            container.style.display = 'none';
        });
        // Show credits
        const textContent = document.querySelector('.text-content');
        const creditsElement = document.createElement('div');
        creditsElement.innerHTML = credits.split('\n').map(line => `<div>${line.trim()}</div>`).join('');
        textContent.innerHTML = creditsElement.innerHTML;
    };
    
    // Insert credits link before version number
    const versionNumber = document.querySelector('.version-number');
    versionNumber.parentNode.insertBefore(creditsLink, versionNumber);

    // Modify act click handlers to use global variables
    acts.forEach(({ div }, index) => {
        const actNumber = index + 1;
        div.onclick = () => {
            const textContent = document.querySelector('.text-content');
            // Always restore the play text first
            textContent.innerHTML = `${window.currentCharacters}<br/>${window.currentProcessedText}`;
            const target = document.querySelector(`#act-${actNumber}`);
            if (target) {
                selectAct(actNumber);
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };
    });
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
    // Since the text is already formatted with data-line-number attributes,
    // we just need to add the 'numbered' class to every 5th line
    return playText.split('\n').map(line => {
        // If it's a play-line, process it
        if (line.includes('data-line-number="')) {
            const lineNumberMatch = line.match(/data-line-number="(\d+)"/);
            if (lineNumberMatch) {
                const lineNumber = parseInt(lineNumberMatch[1]);
                if (lineNumber % 5 === 0) {
                    // Add 'numbered' class to every 5th line
                    return line.replace('class="play-line"', 'class="play-line numbered"');
                }
                return line;
            }
        }
        // For other lines (speakers, headers, etc.), preserve them
        return line;
    }).join('');
}
