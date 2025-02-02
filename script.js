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
<div class="play-line" data-line-number="1" data-as="a1s1">[<i>Enter Theseus, Hippolyta, and Philostrate, with others.</i>]</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="2" data-as="a1s1">Now, fair Hippolyta, our nuptial hour</div>
<div class="play-line" data-line-number="3" data-as="a1s1">Draws on apace. Four happy days bring in</div>
<div class="play-line" data-line-number="4" data-as="a1s1">Another moon. But, O, methinks how slow</div>
<div class="play-line" data-line-number="5" data-as="a1s1">This old moon wanes! She lingers my desires</div>
<div class="play-line" data-line-number="6" data-as="a1s1">Like to a stepdame or a dowager</div>
<div class="play-line" data-line-number="7" data-as="a1s1">Long withering out a young man&rsquo;s revenue.</div>
<br>
<speaker>HIPPOLYTA</speaker>
<div class="play-line" data-line-number="8" data-as="a1s1">Four days will quickly steep themselves in night;</div>
<div class="play-line" data-line-number="9" data-as="a1s1">Four nights will quickly dream away the time;</div>
<div class="play-line" data-line-number="10" data-as="a1s1">And then the moon, like to a silver bow</div>
<div class="play-line" data-line-number="11" data-as="a1s1">New-bent in heaven, shall behold the night</div>
<div class="play-line" data-line-number="12" data-as="a1s1">Of our solemnities.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="13" data-as="a1s1">Go, Philostrate,</div>
<div class="play-line" data-line-number="14" data-as="a1s1">Stir up the Athenian youth to merriments.</div>
<div class="play-line" data-line-number="15" data-as="a1s1">Awake the pert and nimble spirit of mirth.</div>
<div class="play-line" data-line-number="16" data-as="a1s1">Turn melancholy forth to funerals;</div>
<div class="play-line" data-line-number="17" data-as="a1s1">The pale companion is not for our pomp.</div>
<div class="play-line" data-line-number="18" data-as="a1s1">[<i>Philostrate exits.</i>]</div>
<div class="play-line" data-line-number="19" data-as="a1s1">Hippolyta, I wooed thee with my sword</div>
<div class="play-line" data-line-number="20" data-as="a1s1">And won thy love doing thee injuries,</div>
<div class="play-line" data-line-number="21" data-as="a1s1">But I will wed thee in another key,</div>
<div class="play-line" data-line-number="22" data-as="a1s1">With pomp, with triumph, and with reveling.</div>
<br>
<div class="play-line" data-line-number="23" data-as="a1s1">[<i>Enter Egeus and his daughter Hermia, and Lysander </div>
<div class="play-line" data-line-number="24" data-as="a1s1"> and Demetrius.</i>]</div>
<br>
<speaker>EGEUS</speaker>
<div class="play-line" data-line-number="25" data-as="a1s1">Happy be Theseus, our renowned duke!</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="26" data-as="a1s1">Thanks, good Egeus. What&rsquo;s the news with thee?</div>
<br>
<speaker>EGEUS</speaker>
<div class="play-line" data-line-number="27" data-as="a1s1">Full of vexation come I, with complaint</div>
<div class="play-line" data-line-number="28" data-as="a1s1">Against my child, my daughter Hermia.&mdash;</div>
<div class="play-line" data-line-number="29" data-as="a1s1">Stand forth, Demetrius.&mdash;My noble lord,</div>
<div class="play-line" data-line-number="30" data-as="a1s1">This man hath my consent to marry her.&mdash;</div>
<div class="play-line" data-line-number="31" data-as="a1s1">Stand forth, Lysander.&mdash;And, my gracious duke,</div>
<div class="play-line" data-line-number="32" data-as="a1s1">This man hath bewitched the bosom of my child.&mdash;</div>
<div class="play-line" data-line-number="33" data-as="a1s1">Thou, thou, Lysander, thou hast given her rhymes</div>
<div class="play-line" data-line-number="34" data-as="a1s1">And interchanged love tokens with my child.</div>
<div class="play-line" data-line-number="35" data-as="a1s1">Thou hast by moonlight at her window sung</div>
<div class="play-line" data-line-number="36" data-as="a1s1">With feigning voice verses of feigning love</div>
<div class="play-line" data-line-number="37" data-as="a1s1">And stol&rsquo;n the impression of her fantasy</div>
<div class="play-line" data-line-number="38" data-as="a1s1">With bracelets of thy hair, rings, gauds, conceits,</div>
<div class="play-line" data-line-number="39" data-as="a1s1">Knacks, trifles, nosegays, sweetmeats&mdash;messengers</div>
<div class="play-line" data-line-number="40" data-as="a1s1">Of strong prevailment in unhardened youth.</div>
<div class="play-line" data-line-number="41" data-as="a1s1">With cunning hast thou filched my daughter&rsquo;s heart,</div>
<div class="play-line" data-line-number="42" data-as="a1s1">Turned her obedience (which is due to me)</div>
<div class="play-line" data-line-number="43" data-as="a1s1">To stubborn harshness.&mdash;And, my gracious duke,</div>
<div class="play-line" data-line-number="44" data-as="a1s1">Be it so she will not here before your Grace</div>
<div class="play-line" data-line-number="45" data-as="a1s1">Consent to marry with Demetrius,</div>
<div class="play-line" data-line-number="46" data-as="a1s1">I beg the ancient privilege of Athens:</div>
<div class="play-line" data-line-number="47" data-as="a1s1">As she is mine, I may dispose of her,</div>
<div class="play-line" data-line-number="48" data-as="a1s1">Which shall be either to this gentleman</div>
<div class="play-line" data-line-number="49" data-as="a1s1">Or to her death, according to our law</div>
<div class="play-line" data-line-number="50" data-as="a1s1">Immediately provided in that case.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="51" data-as="a1s1">What say you, Hermia? Be advised, fair maid.</div>
<div class="play-line" data-line-number="52" data-as="a1s1">To you, your father should be as a god,</div>
<div class="play-line" data-line-number="53" data-as="a1s1">One that composed your beauties, yea, and one</div>
<div class="play-line" data-line-number="54" data-as="a1s1">To whom you are but as a form in wax</div>
<div class="play-line" data-line-number="55" data-as="a1s1">By him imprinted, and within his power</div>
<div class="play-line" data-line-number="56" data-as="a1s1">To leave the figure or disfigure it.</div>
<div class="play-line" data-line-number="57" data-as="a1s1">Demetrius is a worthy gentleman.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="58" data-as="a1s1">So is Lysander.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="59" data-as="a1s1">In himself he is,</div>
<div class="play-line" data-line-number="60" data-as="a1s1">But in this kind, wanting your father&rsquo;s voice,</div>
<div class="play-line" data-line-number="61" data-as="a1s1">The other must be held the worthier.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="62" data-as="a1s1">I would my father looked but with my eyes.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="63" data-as="a1s1">Rather your eyes must with his judgment look.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="64" data-as="a1s1">I do entreat your Grace to pardon me.</div>
<div class="play-line" data-line-number="65" data-as="a1s1">I know not by what power I am made bold,</div>
<div class="play-line" data-line-number="66" data-as="a1s1">Nor how it may concern my modesty</div>
<div class="play-line" data-line-number="67" data-as="a1s1">In such a presence here to plead my thoughts;</div>
<div class="play-line" data-line-number="68" data-as="a1s1">But I beseech your Grace that I may know</div>
<div class="play-line" data-line-number="69" data-as="a1s1">The worst that may befall me in this case</div>
<div class="play-line" data-line-number="70" data-as="a1s1">If I refuse to wed Demetrius.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="71" data-as="a1s1">Either to die the death or to abjure</div>
<div class="play-line" data-line-number="72" data-as="a1s1">Forever the society of men.</div>
<div class="play-line" data-line-number="73" data-as="a1s1">Therefore, fair Hermia, question your desires,</div>
<div class="play-line" data-line-number="74" data-as="a1s1">Know of your youth, examine well your blood,</div>
<div class="play-line" data-line-number="75" data-as="a1s1">Whether (if you yield not to your father&rsquo;s choice)</div>
<div class="play-line" data-line-number="76" data-as="a1s1">You can endure the livery of a nun,</div>
<div class="play-line" data-line-number="77" data-as="a1s1">For aye to be in shady cloister mewed,</div>
<div class="play-line" data-line-number="78" data-as="a1s1">To live a barren sister all your life,</div>
<div class="play-line" data-line-number="79" data-as="a1s1">Chanting faint hymns to the cold fruitless moon.</div>
<div class="play-line" data-line-number="80" data-as="a1s1">Thrice-blessed they that master so their blood</div>
<div class="play-line" data-line-number="81" data-as="a1s1">To undergo such maiden pilgrimage,</div>
<div class="play-line" data-line-number="82" data-as="a1s1">But earthlier happy is the rose distilled</div>
<div class="play-line" data-line-number="83" data-as="a1s1">Than that which, withering on the virgin thorn,</div>
<div class="play-line" data-line-number="84" data-as="a1s1">Grows, lives, and dies in single blessedness.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="85" data-as="a1s1">So will I grow, so live, so die, my lord,</div>
<div class="play-line" data-line-number="86" data-as="a1s1">Ere I will yield my virgin patent up</div>
<div class="play-line" data-line-number="87" data-as="a1s1">Unto his Lordship whose unwished yoke</div>
<div class="play-line" data-line-number="88" data-as="a1s1">My soul consents not to give sovereignty.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="89" data-as="a1s1">Take time to pause, and by the next new moon</div>
<div class="play-line" data-line-number="90" data-as="a1s1">(The sealing day betwixt my love and me</div>
<div class="play-line" data-line-number="91" data-as="a1s1">For everlasting bond of fellowship),</div>
<div class="play-line" data-line-number="92" data-as="a1s1">Upon that day either prepare to die</div>
<div class="play-line" data-line-number="93" data-as="a1s1">For disobedience to your father&rsquo;s will,</div>
<div class="play-line" data-line-number="94" data-as="a1s1">Or else to wed Demetrius, as he would,</div>
<div class="play-line" data-line-number="95" data-as="a1s1">Or on Diana&rsquo;s altar to protest</div>
<div class="play-line" data-line-number="96" data-as="a1s1">For aye austerity and single life.</div>
<br>
<speaker>DEMETRIUS</speaker>
<div class="play-line" data-line-number="97" data-as="a1s1">Relent, sweet Hermia, and, Lysander, yield</div>
<div class="play-line" data-line-number="98" data-as="a1s1">Thy crazed title to my certain right.</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="99" data-as="a1s1">You have her father&rsquo;s love, Demetrius.</div>
<div class="play-line" data-line-number="100" data-as="a1s1">Let me have Hermia&rsquo;s. Do you marry him.</div>
<br>
<speaker>EGEUS</speaker>
<div class="play-line" data-line-number="101" data-as="a1s1">Scornful Lysander, true, he hath my love;</div>
<div class="play-line" data-line-number="102" data-as="a1s1">And what is mine my love shall render him.</div>
<div class="play-line" data-line-number="103" data-as="a1s1">And she is mine, and all my right of her</div>
<div class="play-line" data-line-number="104" data-as="a1s1">I do estate unto Demetrius.</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="105" data-as="a1s1">[<i>to Theseus</i>]</div>
<div class="play-line" data-line-number="106" data-as="a1s1">I am, my lord, as well derived as he,</div>
<div class="play-line" data-line-number="107" data-as="a1s1">As well possessed. My love is more than his;</div>
<div class="play-line" data-line-number="108" data-as="a1s1">My fortunes every way as fairly ranked</div>
<div class="play-line" data-line-number="109" data-as="a1s1">(If not with vantage) as Demetrius&rsquo;;</div>
<div class="play-line" data-line-number="110" data-as="a1s1">And (which is more than all these boasts can be)</div>
<div class="play-line" data-line-number="111" data-as="a1s1">I am beloved of beauteous Hermia.</div>
<div class="play-line" data-line-number="112" data-as="a1s1">Why should not I then prosecute my right?</div>
<div class="play-line" data-line-number="113" data-as="a1s1">Demetrius, I&rsquo;ll avouch it to his head,</div>
<div class="play-line" data-line-number="114" data-as="a1s1">Made love to Nedar&rsquo;s daughter, Helena,</div>
<div class="play-line" data-line-number="115" data-as="a1s1">And won her soul; and she, sweet lady, dotes,</div>
<div class="play-line" data-line-number="116" data-as="a1s1">Devoutly dotes, dotes in idolatry,</div>
<div class="play-line" data-line-number="117" data-as="a1s1">Upon this spotted and inconstant man.</div>
<br>
<speaker>THESEUS</speaker>
<div class="play-line" data-line-number="118" data-as="a1s1">I must confess that I have heard so much,</div>
<div class="play-line" data-line-number="119" data-as="a1s1">And with Demetrius thought to have spoke thereof;</div>
<div class="play-line" data-line-number="120" data-as="a1s1">But, being overfull of self-affairs,</div>
<div class="play-line" data-line-number="121" data-as="a1s1">My mind did lose it.&mdash;But, Demetrius, come,</div>
<div class="play-line" data-line-number="122" data-as="a1s1">And come, Egeus; you shall go with me.</div>
<div class="play-line" data-line-number="123" data-as="a1s1">I have some private schooling for you both.&mdash;</div>
<div class="play-line" data-line-number="124" data-as="a1s1">For you, fair Hermia, look you arm yourself</div>
<div class="play-line" data-line-number="125" data-as="a1s1">To fit your fancies to your father&rsquo;s will,</div>
<div class="play-line" data-line-number="126" data-as="a1s1">Or else the law of Athens yields you up</div>
<div class="play-line" data-line-number="127" data-as="a1s1">(Which by no means we may extenuate)</div>
<div class="play-line" data-line-number="128" data-as="a1s1">To death or to a vow of single life.&mdash;</div>
<div class="play-line" data-line-number="129" data-as="a1s1">Come, my Hippolyta. What cheer, my love?&mdash;</div>
<div class="play-line" data-line-number="130" data-as="a1s1">Demetrius and Egeus, go along.</div>
<div class="play-line" data-line-number="131" data-as="a1s1">I must employ you in some business</div>
<div class="play-line" data-line-number="132" data-as="a1s1">Against our nuptial and confer with you</div>
<div class="play-line" data-line-number="133" data-as="a1s1">Of something nearly that concerns yourselves.</div>
<br>
<speaker>EGEUS</speaker>
<div class="play-line" data-line-number="134" data-as="a1s1">With duty and desire we follow you.</div>
<div class="play-line" data-line-number="135" data-as="a1s1">[<i>All but Hermia and Lysander exit.</i>]</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="136" data-as="a1s1">How now, my love? Why is your cheek so pale?</div>
<div class="play-line" data-line-number="137" data-as="a1s1">How chance the roses there do fade so fast?</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="138" data-as="a1s1">Belike for want of rain, which I could well</div>
<div class="play-line" data-line-number="139" data-as="a1s1">Beteem them from the tempest of my eyes.</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="140" data-as="a1s1">Ay me! For aught that I could ever read,</div>
<div class="play-line" data-line-number="141" data-as="a1s1">Could ever hear by tale or history,</div>
<div class="play-line" data-line-number="142" data-as="a1s1">The course of true love never did run smooth.</div>
<div class="play-line" data-line-number="143" data-as="a1s1">But either it was different in blood&mdash;</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="144" data-as="a1s1">O cross! Too high to be enthralled to low.</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="145" data-as="a1s1">Or else misgraffed in respect of years&mdash;</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="146" data-as="a1s1">O spite! Too old to be engaged to young.</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="147" data-as="a1s1">Or else it stood upon the choice of friends&mdash;</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="148" data-as="a1s1">O hell, to choose love by another&rsquo;s eyes!</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="149" data-as="a1s1">Or, if there were a sympathy in choice,</div>
<div class="play-line" data-line-number="150" data-as="a1s1">War, death, or sickness did lay siege to it,</div>
<div class="play-line" data-line-number="151" data-as="a1s1">Making it momentany as a sound,</div>
<div class="play-line" data-line-number="152" data-as="a1s1">Swift as a shadow, short as any dream,</div>
<div class="play-line" data-line-number="153" data-as="a1s1">Brief as the lightning in the collied night,</div>
<div class="play-line" data-line-number="154" data-as="a1s1">That, in a spleen, unfolds both heaven and Earth,</div>
<div class="play-line" data-line-number="155" data-as="a1s1">And, ere a man hath power to say &ldquo;Behold!&rdquo;</div>
<div class="play-line" data-line-number="156" data-as="a1s1">The jaws of darkness do devour it up.</div>
<div class="play-line" data-line-number="157" data-as="a1s1">So quick bright things come to confusion.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="158" data-as="a1s1">If then true lovers have been ever crossed,</div>
<div class="play-line" data-line-number="159" data-as="a1s1">It stands as an edict in destiny.</div>
<div class="play-line" data-line-number="160" data-as="a1s1">Then let us teach our trial patience</div>
<div class="play-line" data-line-number="161" data-as="a1s1">Because it is a customary cross,</div>
<div class="play-line" data-line-number="162" data-as="a1s1">As due to love as thoughts and dreams and sighs,</div>
<div class="play-line" data-line-number="163" data-as="a1s1">Wishes and tears, poor fancy&rsquo;s followers.</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="164" data-as="a1s1">A good persuasion. Therefore, hear me, Hermia:</div>
<div class="play-line" data-line-number="165" data-as="a1s1">I have a widow aunt, a dowager</div>
<div class="play-line" data-line-number="166" data-as="a1s1">Of great revenue, and she hath no child.</div>
<div class="play-line" data-line-number="167" data-as="a1s1">From Athens is her house remote seven leagues,</div>
<div class="play-line" data-line-number="168" data-as="a1s1">And she respects me as her only son.</div>
<div class="play-line" data-line-number="169" data-as="a1s1">There, gentle Hermia, may I marry thee;</div>
<div class="play-line" data-line-number="170" data-as="a1s1">And to that place the sharp Athenian law</div>
<div class="play-line" data-line-number="171" data-as="a1s1">Cannot pursue us. If thou lovest me, then</div>
<div class="play-line" data-line-number="172" data-as="a1s1">Steal forth thy father&rsquo;s house tomorrow night,</div>
<div class="play-line" data-line-number="173" data-as="a1s1">And in the wood a league without the town</div>
<div class="play-line" data-line-number="174" data-as="a1s1">(Where I did meet thee once with Helena</div>
<div class="play-line" data-line-number="175" data-as="a1s1">To do observance to a morn of May),</div>
<div class="play-line" data-line-number="176" data-as="a1s1">There will I stay for thee.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="177" data-as="a1s1">My good Lysander,</div>
<div class="play-line" data-line-number="178" data-as="a1s1">I swear to thee by Cupid&rsquo;s strongest bow,</div>
<div class="play-line" data-line-number="179" data-as="a1s1">By his best arrow with the golden head,</div>
<div class="play-line" data-line-number="180" data-as="a1s1">By the simplicity of Venus&rsquo; doves,</div>
<div class="play-line" data-line-number="181" data-as="a1s1">By that which knitteth souls and prospers loves,</div>
<div class="play-line" data-line-number="182" data-as="a1s1">And by that fire which burned the Carthage queen</div>
<div class="play-line" data-line-number="183" data-as="a1s1">When the false Trojan under sail was seen,</div>
<div class="play-line" data-line-number="184" data-as="a1s1">By all the vows that ever men have broke</div>
<div class="play-line" data-line-number="185" data-as="a1s1">(In number more than ever women spoke),</div>
<div class="play-line" data-line-number="186" data-as="a1s1">In that same place thou hast appointed me,</div>
<div class="play-line" data-line-number="187" data-as="a1s1">Tomorrow truly will I meet with thee.</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="188" data-as="a1s1">Keep promise, love. Look, here comes Helena.</div>
<br>
<div class="play-line" data-line-number="189" data-as="a1s1">[<i>Enter Helena.</i>]</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="190" data-as="a1s1">Godspeed, fair Helena. Whither away?</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="191" data-as="a1s1">Call you me &ldquo;fair&rdquo;? That &ldquo;fair&rdquo; again unsay.</div>
<div class="play-line" data-line-number="192" data-as="a1s1">Demetrius loves your fair. O happy fair!</div>
<div class="play-line" data-line-number="193" data-as="a1s1">Your eyes are lodestars and your tongue&rsquo;s sweet air</div>
<div class="play-line" data-line-number="194" data-as="a1s1">More tunable than lark to shepherd&rsquo;s ear</div>
<div class="play-line" data-line-number="195" data-as="a1s1">When wheat is green, when hawthorn buds appear.</div>
<div class="play-line" data-line-number="196" data-as="a1s1">Sickness is catching. O, were favor so!</div>
<div class="play-line" data-line-number="197" data-as="a1s1">Yours would I catch, fair Hermia, ere I go.</div>
<div class="play-line" data-line-number="198" data-as="a1s1">My ear should catch your voice, my eye your eye;</div>
<div class="play-line" data-line-number="199" data-as="a1s1">My tongue should catch your tongue&rsquo;s sweet</div>
<div class="play-line" data-line-number="200" data-as="a1s1">melody.</div>
<div class="play-line" data-line-number="201" data-as="a1s1">Were the world mine, Demetrius being bated,</div>
<div class="play-line" data-line-number="202" data-as="a1s1">The rest I&rsquo;d give to be to you translated.</div>
<div class="play-line" data-line-number="203" data-as="a1s1">O, teach me how you look and with what art</div>
<div class="play-line" data-line-number="204" data-as="a1s1">You sway the motion of Demetrius&rsquo; heart!</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="205" data-as="a1s1">I frown upon him, yet he loves me still.</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="206" data-as="a1s1">O, that your frowns would teach my smiles such</div>
<div class="play-line" data-line-number="207" data-as="a1s1">skill!</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="208" data-as="a1s1">I give him curses, yet he gives me love.</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="209" data-as="a1s1">O, that my prayers could such affection move!</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="210" data-as="a1s1">The more I hate, the more he follows me.</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="211" data-as="a1s1">The more I love, the more he hateth me.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="212" data-as="a1s1">His folly, Helena, is no fault of mine.</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="213" data-as="a1s1">None but your beauty. Would that fault were mine!</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="214" data-as="a1s1">Take comfort: he no more shall see my face.</div>
<div class="play-line" data-line-number="215" data-as="a1s1">Lysander and myself will fly this place.</div>
<div class="play-line" data-line-number="216" data-as="a1s1">Before the time I did Lysander see</div>
<div class="play-line" data-line-number="217" data-as="a1s1">Seemed Athens as a paradise to me.</div>
<div class="play-line" data-line-number="218" data-as="a1s1">O, then, what graces in my love do dwell</div>
<div class="play-line" data-line-number="219" data-as="a1s1">That he hath turned a heaven unto a hell!</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="220" data-as="a1s1">Helen, to you our minds we will unfold.</div>
<div class="play-line" data-line-number="221" data-as="a1s1">Tomorrow night when Phoebe doth behold</div>
<div class="play-line" data-line-number="222" data-as="a1s1">Her silver visage in the wat&rsquo;ry glass,</div>
<div class="play-line" data-line-number="223" data-as="a1s1">Decking with liquid pearl the bladed grass</div>
<div class="play-line" data-line-number="224" data-as="a1s1">(A time that lovers&rsquo; flights doth still conceal),</div>
<div class="play-line" data-line-number="225" data-as="a1s1">Through Athens&rsquo; gates have we devised to steal.</div>
<br>
<speaker>HERMIA</speaker>
<div class="play-line" data-line-number="226" data-as="a1s1">And in the wood where often you and I</div>
<div class="play-line" data-line-number="227" data-as="a1s1">Upon faint primrose beds were wont to lie,</div>
<div class="play-line" data-line-number="228" data-as="a1s1">Emptying our bosoms of their counsel sweet,</div>
<div class="play-line" data-line-number="229" data-as="a1s1">There my Lysander and myself shall meet</div>
<div class="play-line" data-line-number="230" data-as="a1s1">And thence from Athens turn away our eyes</div>
<div class="play-line" data-line-number="231" data-as="a1s1">To seek new friends and stranger companies.</div>
<div class="play-line" data-line-number="232" data-as="a1s1">Farewell, sweet playfellow. Pray thou for us,</div>
<div class="play-line" data-line-number="233" data-as="a1s1">And good luck grant thee thy Demetrius.&mdash;</div>
<div class="play-line" data-line-number="234" data-as="a1s1">Keep word, Lysander. We must starve our sight</div>
<div class="play-line" data-line-number="235" data-as="a1s1">From lovers&rsquo; food till morrow deep midnight.</div>
<br>
<speaker>LYSANDER</speaker>
<div class="play-line" data-line-number="236" data-as="a1s1">I will, my Hermia.	[<i>Hermia exits.</i>]</div>
<div class="play-line" data-line-number="237" data-as="a1s1">Helena, adieu.</div>
<div class="play-line" data-line-number="238" data-as="a1s1">As you on him, Demetrius dote on you!</div>
<div class="play-line" data-line-number="239" data-as="a1s1">[<i>Lysander exits.</i>]</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="240" data-as="a1s1">How happy some o&rsquo;er other some can be!</div>
<div class="play-line" data-line-number="241" data-as="a1s1">Through Athens I am thought as fair as she.</div>
<div class="play-line" data-line-number="242" data-as="a1s1">But what of that? Demetrius thinks not so.</div>
<div class="play-line" data-line-number="243" data-as="a1s1">He will not know what all but he do know.</div>
<div class="play-line" data-line-number="244" data-as="a1s1">And, as he errs, doting on Hermia&rsquo;s eyes,</div>
<div class="play-line" data-line-number="245" data-as="a1s1">So I, admiring of his qualities.</div>
<div class="play-line" data-line-number="246" data-as="a1s1">Things base and vile, holding no quantity,</div>
<div class="play-line" data-line-number="247" data-as="a1s1">Love can transpose to form and dignity.</div>
<div class="play-line" data-line-number="248" data-as="a1s1">Love looks not with the eyes but with the mind;</div>
<div class="play-line" data-line-number="249" data-as="a1s1">And therefore is winged Cupid painted blind.</div>
<div class="play-line" data-line-number="250" data-as="a1s1">Nor hath Love&rsquo;s mind of any judgment taste.</div>
<div class="play-line" data-line-number="251" data-as="a1s1">Wings, and no eyes, figure unheedy haste.</div>
<div class="play-line" data-line-number="252" data-as="a1s1">And therefore is Love said to be a child</div>
<div class="play-line" data-line-number="253" data-as="a1s1">Because in choice he is so oft beguiled.</div>
<div class="play-line" data-line-number="254" data-as="a1s1">As waggish boys in game themselves forswear,</div>
<div class="play-line" data-line-number="255" data-as="a1s1">So the boy Love is perjured everywhere.</div>
<div class="play-line" data-line-number="256" data-as="a1s1">For, ere Demetrius looked on Hermia&rsquo;s eyne,</div>
<div class="play-line" data-line-number="257" data-as="a1s1">He hailed down oaths that he was only mine;</div>
<div class="play-line" data-line-number="258" data-as="a1s1">And when this hail some heat from Hermia felt,</div>
<div class="play-line" data-line-number="259" data-as="a1s1">So he dissolved, and show&rsquo;rs of oaths did melt.</div>
<div class="play-line" data-line-number="260" data-as="a1s1">I will go tell him of fair Hermia&rsquo;s flight.</div>
<div class="play-line" data-line-number="261" data-as="a1s1">Then to the wood will he tomorrow night</div>
<div class="play-line" data-line-number="262" data-as="a1s1">Pursue her. And, for this intelligence</div>
<div class="play-line" data-line-number="263" data-as="a1s1">If I have thanks, it is a dear expense.</div>
<div class="play-line" data-line-number="264" data-as="a1s1">But herein mean I to enrich my pain,</div>
<div class="play-line" data-line-number="265" data-as="a1s1">To have his sight thither and back again.</div>
<div class="play-line" data-line-number="266" data-as="a1s1">[<i>She exits.</i>]</div>
<br>
<b id="act-1-scene-2" class="scene-header">Scene 2</b>
<hr>
<div class="play-line" data-line-number="1" data-as="a1s2">[<i>Enter Quince the carpenter, and Snug the joiner, and</div>
<div class="play-line" data-line-number="2" data-as="a1s2">Bottom the weaver, and Flute the bellows-mender, and</div>
<div class="play-line" data-line-number="3" data-as="a1s2">Snout the tinker, and Starveling the tailor.</i>]</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="4" data-as="a1s2">Is all our company here?</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="5" data-as="a1s2">You were best to call them generally, man by</div>
<div class="play-line" data-line-number="6" data-as="a1s2">man, according to the scrip.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="7" data-as="a1s2">Here is the scroll of every man&rsquo;s name which</div>
<div class="play-line" data-line-number="8" data-as="a1s2">is thought fit, through all Athens, to play in our</div>
<div class="play-line" data-line-number="9" data-as="a1s2">interlude before the Duke and the Duchess on his</div>
<div class="play-line" data-line-number="10" data-as="a1s2">wedding day at night.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="11" data-as="a1s2">First, good Peter Quince, say what the play</div>
<div class="play-line" data-line-number="12" data-as="a1s2">treats on, then read the names of the actors, and so</div>
<div class="play-line" data-line-number="13" data-as="a1s2">grow to a point.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="14" data-as="a1s2">Marry, our play is &ldquo;The most lamentable</div>
<div class="play-line" data-line-number="15" data-as="a1s2">comedy and most cruel death of Pyramus and</div>
<div class="play-line" data-line-number="16" data-as="a1s2">Thisbe.&rdquo;</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="17" data-as="a1s2">A very good piece of work, I assure you, and a</div>
<div class="play-line" data-line-number="18" data-as="a1s2">merry. Now, good Peter Quince, call forth your</div>
<div class="play-line" data-line-number="19" data-as="a1s2">actors by the scroll. Masters, spread yourselves.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="20" data-as="a1s2">Answer as I call you. Nick Bottom, the weaver.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="21" data-as="a1s2">Ready. Name what part I am for, and</div>
<div class="play-line" data-line-number="22" data-as="a1s2">proceed.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="23" data-as="a1s2">You, Nick Bottom, are set down for Pyramus.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="24" data-as="a1s2">What is Pyramus&mdash;a lover or a tyrant?</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="25" data-as="a1s2">A lover that kills himself most gallant for love.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="26" data-as="a1s2">That will ask some tears in the true performing</div>
<div class="play-line" data-line-number="27" data-as="a1s2">of it. If I do it, let the audience look to their</div>
<div class="play-line" data-line-number="28" data-as="a1s2">eyes. I will move storms; I will condole in some</div>
<div class="play-line" data-line-number="29" data-as="a1s2">measure. To the rest.&mdash;Yet my chief humor is for a</div>
<div class="play-line" data-line-number="30" data-as="a1s2">tyrant. I could play Ercles rarely, or a part to tear a</div>
<div class="play-line" data-line-number="31" data-as="a1s2">cat in, to make all split:</div>
<br>
<div class="play-line" data-line-number="32" data-as="a1s2">	The raging rocks</div>
<div class="play-line" data-line-number="33" data-as="a1s2">	And shivering shocks</div>
<div class="play-line" data-line-number="34" data-as="a1s2">	Shall break the locks</div>
<div class="play-line" data-line-number="35" data-as="a1s2">	   Of prison gates.</div>
<div class="play-line" data-line-number="36" data-as="a1s2">	And Phibbus&rsquo; car</div>
<div class="play-line" data-line-number="37" data-as="a1s2">	Shall shine from far</div>
<div class="play-line" data-line-number="38" data-as="a1s2">	And make and mar</div>
<div class="play-line" data-line-number="39" data-as="a1s2">	   The foolish Fates.</div>
<br>
<div class="play-line" data-line-number="40" data-as="a1s2">This was lofty. Now name the rest of the players.</div>
<div class="play-line" data-line-number="41" data-as="a1s2">This is Ercles&rsquo; vein, a tyrant&rsquo;s vein. A lover is more</div>
<div class="play-line" data-line-number="42" data-as="a1s2">condoling.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="43" data-as="a1s2">Francis Flute, the bellows-mender.</div>
<br>
<speaker>FLUTE</speaker>
<div class="play-line" data-line-number="44" data-as="a1s2">Here, Peter Quince.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="45" data-as="a1s2">Flute, you must take Thisbe on you.</div>
<br>
<speaker>FLUTE</speaker>
<div class="play-line" data-line-number="46" data-as="a1s2">What is Thisbe&mdash;a wand&rsquo;ring knight?</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="47" data-as="a1s2">It is the lady that Pyramus must love.</div>
<br>
<speaker>FLUTE</speaker>
<div class="play-line" data-line-number="48" data-as="a1s2">Nay, faith, let not me play a woman. I have a</div>
<div class="play-line" data-line-number="49" data-as="a1s2">beard coming.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="50" data-as="a1s2">That&rsquo;s all one. You shall play it in a mask, and</div>
<div class="play-line" data-line-number="51" data-as="a1s2">you may speak as small as you will.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="52" data-as="a1s2">An I may hide my face, let me play Thisbe too.</div>
<div class="play-line" data-line-number="53" data-as="a1s2">I&rsquo;ll speak in a monstrous little voice: &ldquo;Thisne,</div>
<div class="play-line" data-line-number="54" data-as="a1s2">Thisne!&rdquo;&mdash;&ldquo;Ah Pyramus, my lover dear! Thy Thisbe</div>
<div class="play-line" data-line-number="55" data-as="a1s2">dear and lady dear!&rdquo;</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="56" data-as="a1s2">No, no, you must play Pyramus&mdash;and, Flute,</div>
<div class="play-line" data-line-number="57" data-as="a1s2">you Thisbe.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="58" data-as="a1s2">Well, proceed.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="59" data-as="a1s2">Robin Starveling, the tailor.</div>
<br>
<speaker>STARVELING</speaker>
<div class="play-line" data-line-number="60" data-as="a1s2">Here, Peter Quince.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="61" data-as="a1s2">Robin Starveling, you must play Thisbe&rsquo;s</div>
<div class="play-line" data-line-number="62" data-as="a1s2">mother.&mdash;Tom Snout, the tinker.</div>
<br>
<speaker>SNOUT</speaker>
<div class="play-line" data-line-number="63" data-as="a1s2">Here, Peter Quince.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="64" data-as="a1s2">You, Pyramus&rsquo; father.&mdash;Myself, Thisbe&rsquo;s</div>
<div class="play-line" data-line-number="65" data-as="a1s2">father.&mdash;Snug the joiner, you the lion&rsquo;s part.&mdash;</div>
<div class="play-line" data-line-number="66" data-as="a1s2">And I hope here is a play fitted.</div>
<br>
<speaker>SNUG</speaker>
<div class="play-line" data-line-number="67" data-as="a1s2">Have you the lion&rsquo;s part written? Pray you, if it</div>
<div class="play-line" data-line-number="68" data-as="a1s2">be, give it me, for I am slow of study.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="69" data-as="a1s2">You may do it extempore, for it is nothing but</div>
<div class="play-line" data-line-number="70" data-as="a1s2">roaring.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="71" data-as="a1s2">Let me play the lion too. I will roar that I will</div>
<div class="play-line" data-line-number="72" data-as="a1s2">do any man&rsquo;s heart good to hear me. I will roar that</div>
<div class="play-line" data-line-number="73" data-as="a1s2">I will make the Duke say &ldquo;Let him roar again. Let</div>
<div class="play-line" data-line-number="74" data-as="a1s2">him roar again!&rdquo;</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="75" data-as="a1s2">An you should do it too terribly, you would</div>
<div class="play-line" data-line-number="76" data-as="a1s2">fright the Duchess and the ladies that they would</div>
<div class="play-line" data-line-number="77" data-as="a1s2">shriek, and that were enough to hang us all.</div>
<br>
<speaker>ALL</speaker>
<div class="play-line" data-line-number="78" data-as="a1s2">That would hang us, every mother&rsquo;s son.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="79" data-as="a1s2">I grant you, friends, if you should fright the</div>
<div class="play-line" data-line-number="80" data-as="a1s2">ladies out of their wits, they would have no more</div>
<div class="play-line" data-line-number="81" data-as="a1s2">discretion but to hang us. But I will aggravate my</div>
<div class="play-line" data-line-number="82" data-as="a1s2">voice so that I will roar you as gently as any sucking</div>
<div class="play-line" data-line-number="83" data-as="a1s2">dove. I will roar you an &rsquo;twere any nightingale.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="84" data-as="a1s2">You can play no part but Pyramus, for Pyramus</div>
<div class="play-line" data-line-number="85" data-as="a1s2">is a sweet-faced man, a proper man as one</div>
<div class="play-line" data-line-number="86" data-as="a1s2">shall see in a summer&rsquo;s day, a most lovely gentlemanlike</div>
<div class="play-line" data-line-number="87" data-as="a1s2">man. Therefore you must needs play </div>
<div class="play-line" data-line-number="88" data-as="a1s2">Pyramus.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="89" data-as="a1s2">Well, I will undertake it. What beard were I</div>
<div class="play-line" data-line-number="90" data-as="a1s2">best to play it in?</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="91" data-as="a1s2">Why, what you will.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="92" data-as="a1s2">I will discharge it in either your straw-color</div>
<div class="play-line" data-line-number="93" data-as="a1s2">beard, your orange-tawny beard, your purple-in-grain</div>
<div class="play-line" data-line-number="94" data-as="a1s2">beard, or your French-crown-color beard,</div>
<div class="play-line" data-line-number="95" data-as="a1s2">your perfit yellow.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="96" data-as="a1s2">Some of your French crowns have no hair at</div>
<div class="play-line" data-line-number="97" data-as="a1s2">all, and then you will play barefaced. But, masters,</div>
<div class="play-line" data-line-number="98" data-as="a1s2">here are your parts, [<i>giving out the parts,</i>]</div>
<div class="play-line" data-line-number="99" data-as="a1s2"> and I am</div>
<div class="play-line" data-line-number="100" data-as="a1s2">to entreat you, request you, and desire you to con</div>
<div class="play-line" data-line-number="101" data-as="a1s2">them by tomorrow night and meet me in the palace</div>
<div class="play-line" data-line-number="102" data-as="a1s2">wood, a mile without the town, by moonlight. There</div>
<div class="play-line" data-line-number="103" data-as="a1s2">will we rehearse, for if we meet in the city, we shall</div>
<div class="play-line" data-line-number="104" data-as="a1s2">be dogged with company and our devices known. In</div>
<div class="play-line" data-line-number="105" data-as="a1s2">the meantime I will draw a bill of properties such as</div>
<div class="play-line" data-line-number="106" data-as="a1s2">our play wants. I pray you fail me not.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="107" data-as="a1s2">We will meet, and there we may rehearse</div>
<div class="play-line" data-line-number="108" data-as="a1s2">most obscenely and courageously. Take pains. Be</div>
<div class="play-line" data-line-number="109" data-as="a1s2">perfit. Adieu.</div>
<br>
<speaker>QUINCE</speaker>
<div class="play-line" data-line-number="110" data-as="a1s2">At the Duke&rsquo;s Oak we meet.</div>
<br>
<speaker>BOTTOM</speaker>
<div class="play-line" data-line-number="111" data-as="a1s2">Enough. Hold or cut bowstrings.</div>
<div class="play-line" data-line-number="112" data-as="a1s2">[<i>They exit.</i>]</div>
<br>
<b id="act-2" class="act-header">Act 2</b>
<br>
<b id="act-2-scene-1" class="scene-header">Scene 1</b>
<hr>
<div class="play-line" data-line-number="1" data-as="a2s1">[<i>Enter a Fairy at one door and Robin Goodfellow at</div>
<div class="play-line" data-line-number="2" data-as="a2s1">another.</i>]</div>
<br>
<speaker>ROBIN</speaker>
<div class="play-line" data-line-number="3" data-as="a2s1">How now, spirit? Whither wander you?</div>
<br>
<speaker>FAIRY</speaker>
<div class="play-line" data-line-number="4" data-as="a2s1">	Over hill, over dale,</div>
<div class="play-line" data-line-number="5" data-as="a2s1">	   Thorough bush, thorough brier,</div>
<div class="play-line" data-line-number="6" data-as="a2s1">	Over park, over pale,</div>
<div class="play-line" data-line-number="7" data-as="a2s1">	   Thorough flood, thorough fire;</div>
<div class="play-line" data-line-number="8" data-as="a2s1">	I do wander everywhere,</div>
<div class="play-line" data-line-number="9" data-as="a2s1">	Swifter than the moon&rsquo;s sphere.</div>
<div class="play-line" data-line-number="10" data-as="a2s1">	And I serve the Fairy Queen,</div>
<div class="play-line" data-line-number="11" data-as="a2s1">	To dew her orbs upon the green.</div>
<div class="play-line" data-line-number="12" data-as="a2s1">	The cowslips tall her pensioners be;</div>
<div class="play-line" data-line-number="13" data-as="a2s1">	In their gold coats spots you see;</div>
<div class="play-line" data-line-number="14" data-as="a2s1">	Those be rubies, fairy favors;</div>
<div class="play-line" data-line-number="15" data-as="a2s1">	In those freckles live their savors.</div>
<div class="play-line" data-line-number="16" data-as="a2s1">I must go seek some dewdrops here</div>
<div class="play-line" data-line-number="17" data-as="a2s1">And hang a pearl in every cowslip&rsquo;s ear.</div>
<div class="play-line" data-line-number="18" data-as="a2s1">Farewell, thou lob of spirits. I&rsquo;ll be gone.</div>
<div class="play-line" data-line-number="19" data-as="a2s1">Our queen and all her elves come here anon.</div>
<br>
<speaker>ROBIN</speaker>
<div class="play-line" data-line-number="20" data-as="a2s1">The King doth keep his revels here tonight.</div>
<div class="play-line" data-line-number="21" data-as="a2s1">Take heed the Queen come not within his sight,</div>
<div class="play-line" data-line-number="22" data-as="a2s1">For Oberon is passing fell and wrath</div>
<div class="play-line" data-line-number="23" data-as="a2s1">Because that she, as her attendant, hath</div>
<div class="play-line" data-line-number="24" data-as="a2s1">A lovely boy stolen from an Indian king;</div>
<div class="play-line" data-line-number="25" data-as="a2s1">She never had so sweet a changeling.</div>
<div class="play-line" data-line-number="26" data-as="a2s1">And jealous Oberon would have the child</div>
<div class="play-line" data-line-number="27" data-as="a2s1">Knight of his train, to trace the forests wild.</div>
<div class="play-line" data-line-number="28" data-as="a2s1">But she perforce withholds the loved boy,</div>
<div class="play-line" data-line-number="29" data-as="a2s1">Crowns him with flowers and makes him all her</div>
<div class="play-line" data-line-number="30" data-as="a2s1">joy.</div>
<div class="play-line" data-line-number="31" data-as="a2s1">And now they never meet in grove or green,</div>
<div class="play-line" data-line-number="32" data-as="a2s1">By fountain clear or spangled starlight sheen,</div>
<div class="play-line" data-line-number="33" data-as="a2s1">But they do square, that all their elves for fear</div>
<div class="play-line" data-line-number="34" data-as="a2s1">Creep into acorn cups and hide them there.</div>
<br>
<speaker>FAIRY</speaker>
<div class="play-line" data-line-number="35" data-as="a2s1">Either I mistake your shape and making quite,</div>
<div class="play-line" data-line-number="36" data-as="a2s1">Or else you are that shrewd and knavish sprite</div>
<div class="play-line" data-line-number="37" data-as="a2s1">Called Robin Goodfellow. Are not you he</div>
<div class="play-line" data-line-number="38" data-as="a2s1">That frights the maidens of the villagery,</div>
<div class="play-line" data-line-number="39" data-as="a2s1">Skim milk, and sometimes labor in the quern</div>
<div class="play-line" data-line-number="40" data-as="a2s1">And bootless make the breathless huswife churn,</div>
<div class="play-line" data-line-number="41" data-as="a2s1">And sometime make the drink to bear no barm,</div>
<div class="play-line" data-line-number="42" data-as="a2s1">Mislead night wanderers, laughing at their harm?</div>
<div class="play-line" data-line-number="43" data-as="a2s1">Those that &ldquo;Hobgoblin&rdquo; call you and &ldquo;sweet Puck,&rdquo;</div>
<div class="play-line" data-line-number="44" data-as="a2s1">You do their work, and they shall have good luck.</div>
<div class="play-line" data-line-number="45" data-as="a2s1">Are not you he?</div>
<br>
<speaker>ROBIN</speaker>
<div class="play-line" data-line-number="46" data-as="a2s1">Thou speakest aright.</div>
<div class="play-line" data-line-number="47" data-as="a2s1">I am that merry wanderer of the night.</div>
<div class="play-line" data-line-number="48" data-as="a2s1">I jest to Oberon and make him smile</div>
<div class="play-line" data-line-number="49" data-as="a2s1">When I a fat and bean-fed horse beguile,</div>
<div class="play-line" data-line-number="50" data-as="a2s1">Neighing in likeness of a filly foal.</div>
<div class="play-line" data-line-number="51" data-as="a2s1">And sometime lurk I in a gossip&rsquo;s bowl</div>
<div class="play-line" data-line-number="52" data-as="a2s1">In very likeness of a roasted crab,</div>
<div class="play-line" data-line-number="53" data-as="a2s1">And, when she drinks, against her lips I bob</div>
<div class="play-line" data-line-number="54" data-as="a2s1">And on her withered dewlap pour the ale.</div>
<div class="play-line" data-line-number="55" data-as="a2s1">The wisest aunt, telling the saddest tale,</div>
<div class="play-line" data-line-number="56" data-as="a2s1">Sometime for three-foot stool mistaketh me;</div>
<div class="play-line" data-line-number="57" data-as="a2s1">Then slip I from her bum, down topples she</div>
<div class="play-line" data-line-number="58" data-as="a2s1">And &ldquo;Tailor!&rdquo; cries and falls into a cough,</div>
<div class="play-line" data-line-number="59" data-as="a2s1">And then the whole choir hold their hips and loffe</div>
<div class="play-line" data-line-number="60" data-as="a2s1">And waxen in their mirth and neeze and swear</div>
<div class="play-line" data-line-number="61" data-as="a2s1">A merrier hour was never wasted there.</div>
<div class="play-line" data-line-number="62" data-as="a2s1">But room, fairy. Here comes Oberon.</div>
<br>
<speaker>FAIRY</speaker>
<div class="play-line" data-line-number="63" data-as="a2s1">And here my mistress. Would that he were gone!</div>
<br>
<div class="play-line" data-line-number="64" data-as="a2s1">[<i>Enter Oberon the King of Fairies at one door, with his</div>
<div class="play-line" data-line-number="65" data-as="a2s1">train, and Titania the Queen at another, with hers.</i>]</div>
<br>
<speaker>OBERON</speaker>
<div class="play-line" data-line-number="66" data-as="a2s1">Ill met by moonlight, proud Titania.</div>
<br>
<speaker>TITANIA</speaker>
<div class="play-line" data-line-number="67" data-as="a2s1">What, jealous Oberon? Fairies, skip hence.</div>
<div class="play-line" data-line-number="68" data-as="a2s1">I have forsworn his bed and company.</div>
<br>
<speaker>OBERON</speaker>
<div class="play-line" data-line-number="69" data-as="a2s1">Tarry, rash wanton. Am not I thy lord?</div>
<br>
<speaker>TITANIA</speaker>
<div class="play-line" data-line-number="70" data-as="a2s1">Then I must be thy lady. But I know</div>
<div class="play-line" data-line-number="71" data-as="a2s1">When thou hast stolen away from Fairyland</div>
<div class="play-line" data-line-number="72" data-as="a2s1">And in the shape of Corin sat all day</div>
<div class="play-line" data-line-number="73" data-as="a2s1">Playing on pipes of corn and versing love</div>
<div class="play-line" data-line-number="74" data-as="a2s1">To amorous Phillida. Why art thou here,</div>
<div class="play-line" data-line-number="75" data-as="a2s1">Come from the farthest steep of India,</div>
<div class="play-line" data-line-number="76" data-as="a2s1">But that, forsooth, the bouncing Amazon,</div>
<div class="play-line" data-line-number="77" data-as="a2s1">Your buskined mistress and your warrior love,</div>
<div class="play-line" data-line-number="78" data-as="a2s1">To Theseus must be wedded, and you come</div>
<div class="play-line" data-line-number="79" data-as="a2s1">To give their bed joy and prosperity?</div>
<br>
<speaker>OBERON</speaker>
<div class="play-line" data-line-number="80" data-as="a2s1">How canst thou thus for shame, Titania,</div>
<div class="play-line" data-line-number="81" data-as="a2s1">Glance at my credit with Hippolyta,</div>
<div class="play-line" data-line-number="82" data-as="a2s1">Knowing I know thy love to Theseus?</div>
<div class="play-line" data-line-number="83" data-as="a2s1">Didst not thou lead him through the glimmering</div>
<div class="play-line" data-line-number="84" data-as="a2s1">night</div>
<div class="play-line" data-line-number="85" data-as="a2s1">From Perigouna, whom he ravished,</div>
<div class="play-line" data-line-number="86" data-as="a2s1">And make him with fair Aegles break his faith,</div>
<div class="play-line" data-line-number="87" data-as="a2s1">With Ariadne and Antiopa?</div>
<br>
<speaker>TITANIA</speaker>
<div class="play-line" data-line-number="88" data-as="a2s1">These are the forgeries of jealousy;</div>
<div class="play-line" data-line-number="89" data-as="a2s1">And never, since the middle summer&rsquo;s spring,</div>
<div class="play-line" data-line-number="90" data-as="a2s1">Met we on hill, in dale, forest, or mead,</div>
<div class="play-line" data-line-number="91" data-as="a2s1">By paved fountain or by rushy brook,</div>
<div class="play-line" data-line-number="92" data-as="a2s1">Or in the beached margent of the sea,</div>
<div class="play-line" data-line-number="93" data-as="a2s1">To dance our ringlets to the whistling wind,</div>
<div class="play-line" data-line-number="94" data-as="a2s1">But with thy brawls thou hast disturbed our sport.</div>
<div class="play-line" data-line-number="95" data-as="a2s1">Therefore the winds, piping to us in vain,</div>
<div class="play-line" data-line-number="96" data-as="a2s1">As in revenge have sucked up from the sea</div>
<div class="play-line" data-line-number="97" data-as="a2s1">Contagious fogs, which, falling in the land,</div>
<div class="play-line" data-line-number="98" data-as="a2s1">Hath every pelting river made so proud</div>
<div class="play-line" data-line-number="99" data-as="a2s1">That they have overborne their continents.</div>
<div class="play-line" data-line-number="100" data-as="a2s1">The ox hath therefore stretched his yoke in vain,</div>
<div class="play-line" data-line-number="101" data-as="a2s1">The plowman lost his sweat, and the green corn</div>
<div class="play-line" data-line-number="102" data-as="a2s1">Hath rotted ere his youth attained a beard.</div>
<div class="play-line" data-line-number="103" data-as="a2s1">The fold stands empty in the drowned field,</div>
<div class="play-line" data-line-number="104" data-as="a2s1">And crows are fatted with the murrain flock.</div>
<div class="play-line" data-line-number="105" data-as="a2s1">The nine-men&rsquo;s-morris is filled up with mud,</div>
<div class="play-line" data-line-number="106" data-as="a2s1">And the quaint mazes in the wanton green,</div>
<div class="play-line" data-line-number="107" data-as="a2s1">For lack of tread, are undistinguishable.</div>
<div class="play-line" data-line-number="108" data-as="a2s1">The human mortals want their winter here.</div>
<div class="play-line" data-line-number="109" data-as="a2s1">No night is now with hymn or carol blessed.</div>
<div class="play-line" data-line-number="110" data-as="a2s1">Therefore the moon, the governess of floods,</div>
<div class="play-line" data-line-number="111" data-as="a2s1">Pale in her anger, washes all the air,</div>
<div class="play-line" data-line-number="112" data-as="a2s1">That rheumatic diseases do abound.</div>
<div class="play-line" data-line-number="113" data-as="a2s1">And thorough this distemperature we see</div>
<div class="play-line" data-line-number="114" data-as="a2s1">The seasons alter: hoary-headed frosts</div>
<div class="play-line" data-line-number="115" data-as="a2s1">Fall in the fresh lap of the crimson rose,</div>
<div class="play-line" data-line-number="116" data-as="a2s1">And on old Hiems&rsquo; thin and icy crown</div>
<div class="play-line" data-line-number="117" data-as="a2s1">An odorous chaplet of sweet summer buds</div>
<div class="play-line" data-line-number="118" data-as="a2s1">Is, as in mockery, set. The spring, the summer,</div>
<div class="play-line" data-line-number="119" data-as="a2s1">The childing autumn, angry winter, change</div>
<div class="play-line" data-line-number="120" data-as="a2s1">Their wonted liveries, and the mazed world</div>
<div class="play-line" data-line-number="121" data-as="a2s1">By their increase now knows not which is which.</div>
<div class="play-line" data-line-number="122" data-as="a2s1">And this same progeny of evils comes</div>
<div class="play-line" data-line-number="123" data-as="a2s1">From our debate, from our dissension;</div>
<div class="play-line" data-line-number="124" data-as="a2s1">We are their parents and original.</div>
<br>
<speaker>OBERON</speaker>
<div class="play-line" data-line-number="125" data-as="a2s1">Do you amend it, then. It lies in you.</div>
<div class="play-line" data-line-number="126" data-as="a2s1">Why should Titania cross her Oberon?</div>
<div class="play-line" data-line-number="127" data-as="a2s1">I do but beg a little changeling boy</div>
<div class="play-line" data-line-number="128" data-as="a2s1">To be my henchman.</div>
<br>
<speaker>TITANIA</speaker>
<div class="play-line" data-line-number="129" data-as="a2s1">Set your heart at rest:</div>
<div class="play-line" data-line-number="130" data-as="a2s1">The Fairyland buys not the child of me.</div>
<div class="play-line" data-line-number="131" data-as="a2s1">His mother was a vot&rsquo;ress of my order,</div>
<div class="play-line" data-line-number="132" data-as="a2s1">And in the spiced Indian air by night</div>
<div class="play-line" data-line-number="133" data-as="a2s1">Full often hath she gossiped by my side</div>
<div class="play-line" data-line-number="134" data-as="a2s1">And sat with me on Neptune&rsquo;s yellow sands,</div>
<div class="play-line" data-line-number="135" data-as="a2s1">Marking th&rsquo; embarked traders on the flood,</div>
<div class="play-line" data-line-number="136" data-as="a2s1">When we have laughed to see the sails conceive</div>
<div class="play-line" data-line-number="137" data-as="a2s1">And grow big-bellied with the wanton wind;</div>
<div class="play-line" data-line-number="138" data-as="a2s1">Which she, with pretty and with swimming gait,</div>
<div class="play-line" data-line-number="139" data-as="a2s1">Following (her womb then rich with my young</div>
<div class="play-line" data-line-number="140" data-as="a2s1">squire),</div>
<div class="play-line" data-line-number="141" data-as="a2s1">Would imitate and sail upon the land</div>
<div class="play-line" data-line-number="142" data-as="a2s1">To fetch me trifles and return again,</div>
<div class="play-line" data-line-number="143" data-as="a2s1">As from a voyage, rich with merchandise.</div>
<div class="play-line" data-line-number="144" data-as="a2s1">But she, being mortal, of that boy did die,</div>
<div class="play-line" data-line-number="145" data-as="a2s1">And for her sake do I rear up her boy,</div>
<div class="play-line" data-line-number="146" data-as="a2s1">And for her sake I will not part with him.</div>
<br>
<speaker>OBERON</speaker>
<div class="play-line" data-line-number="147" data-as="a2s1">How long within this wood intend you stay?</div>
<br>
<speaker>TITANIA</speaker>
<div class="play-line" data-line-number="148" data-as="a2s1">Perchance till after Theseus&rsquo; wedding day.</div>
<div class="play-line" data-line-number="149" data-as="a2s1">If you will patiently dance in our round</div>
<div class="play-line" data-line-number="150" data-as="a2s1">And see our moonlight revels, go with us.</div>
<div class="play-line" data-line-number="151" data-as="a2s1">If not, shun me, and I will spare your haunts.</div>
<br>
<speaker>OBERON</speaker>
<div class="play-line" data-line-number="152" data-as="a2s1">Give me that boy and I will go with thee.</div>
<br>
<speaker>TITANIA</speaker>
<div class="play-line" data-line-number="153" data-as="a2s1">Not for thy fairy kingdom. Fairies, away.</div>
<div class="play-line" data-line-number="154" data-as="a2s1">We shall chide downright if I longer stay.</div>
<div class="play-line" data-line-number="155" data-as="a2s1">[<i>Titania and her fairies exit.</i>]</div>
<br>
<speaker>OBERON</speaker>
<div class="play-line" data-line-number="156" data-as="a2s1">Well, go thy way. Thou shalt not from this grove</div>
<div class="play-line" data-line-number="157" data-as="a2s1">Till I torment thee for this injury.&mdash;</div>
<div class="play-line" data-line-number="158" data-as="a2s1">My gentle Puck, come hither. Thou rememb&rsquo;rest</div>
<div class="play-line" data-line-number="159" data-as="a2s1">Since once I sat upon a promontory</div>
<div class="play-line" data-line-number="160" data-as="a2s1">And heard a mermaid on a dolphin&rsquo;s back</div>
<div class="play-line" data-line-number="161" data-as="a2s1">Uttering such dulcet and harmonious breath</div>
<div class="play-line" data-line-number="162" data-as="a2s1">That the rude sea grew civil at her song</div>
<div class="play-line" data-line-number="163" data-as="a2s1">And certain stars shot madly from their spheres</div>
<div class="play-line" data-line-number="164" data-as="a2s1">To hear the sea-maid&rsquo;s music.</div>
<br>
<speaker>ROBIN</speaker>
<div class="play-line" data-line-number="165" data-as="a2s1">I remember.</div>
<br>
<speaker>OBERON</speaker>
<div class="play-line" data-line-number="166" data-as="a2s1">That very time I saw (but thou couldst not),</div>
<div class="play-line" data-line-number="167" data-as="a2s1">Flying between the cold moon and the Earth,</div>
<div class="play-line" data-line-number="168" data-as="a2s1">Cupid all armed. A certain aim he took</div>
<div class="play-line" data-line-number="169" data-as="a2s1">At a fair vestal throned by the west,</div>
<div class="play-line" data-line-number="170" data-as="a2s1">And loosed his love-shaft smartly from his bow</div>
<div class="play-line" data-line-number="171" data-as="a2s1">As it should pierce a hundred thousand hearts.</div>
<div class="play-line" data-line-number="172" data-as="a2s1">But I might see young Cupid&rsquo;s fiery shaft</div>
<div class="play-line" data-line-number="173" data-as="a2s1">Quenched in the chaste beams of the wat&rsquo;ry moon,</div>
<div class="play-line" data-line-number="174" data-as="a2s1">And the imperial vot&rsquo;ress passed on</div>
<div class="play-line" data-line-number="175" data-as="a2s1">In maiden meditation, fancy-free.</div>
<div class="play-line" data-line-number="176" data-as="a2s1">Yet marked I where the bolt of Cupid fell.</div>
<div class="play-line" data-line-number="177" data-as="a2s1">It fell upon a little western flower,</div>
<div class="play-line" data-line-number="178" data-as="a2s1">Before, milk-white, now purple with love&rsquo;s wound,</div>
<div class="play-line" data-line-number="179" data-as="a2s1">And maidens call it &ldquo;love-in-idleness.&rdquo;</div>
<div class="play-line" data-line-number="180" data-as="a2s1">Fetch me that flower; the herb I showed thee once.</div>
<div class="play-line" data-line-number="181" data-as="a2s1">The juice of it on sleeping eyelids laid</div>
<div class="play-line" data-line-number="182" data-as="a2s1">Will make or man or woman madly dote</div>
<div class="play-line" data-line-number="183" data-as="a2s1">Upon the next live creature that it sees.</div>
<div class="play-line" data-line-number="184" data-as="a2s1">Fetch me this herb, and be thou here again</div>
<div class="play-line" data-line-number="185" data-as="a2s1">Ere the leviathan can swim a league.</div>
<br>
<speaker>ROBIN</speaker>
<div class="play-line" data-line-number="186" data-as="a2s1">I&rsquo;ll put a girdle round about the Earth</div>
<div class="play-line" data-line-number="187" data-as="a2s1">In forty minutes.	[<i>He exits.</i>]</div>
<br>
<speaker>OBERON</speaker>
<div class="play-line" data-line-number="188" data-as="a2s1">Having once this juice,</div>
<div class="play-line" data-line-number="189" data-as="a2s1">I&rsquo;ll watch Titania when she is asleep</div>
<div class="play-line" data-line-number="190" data-as="a2s1">And drop the liquor of it in her eyes.</div>
<div class="play-line" data-line-number="191" data-as="a2s1">The next thing then she, waking, looks upon</div>
<div class="play-line" data-line-number="192" data-as="a2s1">(Be it on lion, bear, or wolf, or bull,</div>
<div class="play-line" data-line-number="193" data-as="a2s1">On meddling monkey, or on busy ape)</div>
<div class="play-line" data-line-number="194" data-as="a2s1">She shall pursue it with the soul of love.</div>
<div class="play-line" data-line-number="195" data-as="a2s1">And ere I take this charm from off her sight</div>
<div class="play-line" data-line-number="196" data-as="a2s1">(As I can take it with another herb),</div>
<div class="play-line" data-line-number="197" data-as="a2s1">I&rsquo;ll make her render up her page to me.</div>
<div class="play-line" data-line-number="198" data-as="a2s1">But who comes here? I am invisible,</div>
<div class="play-line" data-line-number="199" data-as="a2s1">And I will overhear their conference.</div>
<br>
<div class="play-line" data-line-number="200" data-as="a2s1">[<i>Enter Demetrius, Helena following him.</i>]</div>
<br>
<speaker>DEMETRIUS</speaker>
<div class="play-line" data-line-number="201" data-as="a2s1">I love thee not; therefore pursue me not.</div>
<div class="play-line" data-line-number="202" data-as="a2s1">Where is Lysander and fair Hermia?</div>
<div class="play-line" data-line-number="203" data-as="a2s1">The one I&rsquo;ll stay; the other stayeth me.</div>
<div class="play-line" data-line-number="204" data-as="a2s1">Thou told&rsquo;st me they were stol&rsquo;n unto this wood,</div>
<div class="play-line" data-line-number="205" data-as="a2s1">And here am I, and wood within this wood</div>
<div class="play-line" data-line-number="206" data-as="a2s1">Because I cannot meet my Hermia.</div>
<div class="play-line" data-line-number="207" data-as="a2s1">Hence, get thee gone, and follow me no more.</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="208" data-as="a2s1">You draw me, you hard-hearted adamant!</div>
<div class="play-line" data-line-number="209" data-as="a2s1">But yet you draw not iron, for my heart</div>
<div class="play-line" data-line-number="210" data-as="a2s1">Is true as steel. Leave you your power to draw,</div>
<div class="play-line" data-line-number="211" data-as="a2s1">And I shall have no power to follow you.</div>
<br>
<speaker>DEMETRIUS</speaker>
<div class="play-line" data-line-number="212" data-as="a2s1">Do I entice you? Do I speak you fair?</div>
<div class="play-line" data-line-number="213" data-as="a2s1">Or rather do I not in plainest truth</div>
<div class="play-line" data-line-number="214" data-as="a2s1">Tell you I do not, nor I cannot love you?</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="215" data-as="a2s1">And even for that do I love you the more.</div>
<div class="play-line" data-line-number="216" data-as="a2s1">I am your spaniel, and, Demetrius,</div>
<div class="play-line" data-line-number="217" data-as="a2s1">The more you beat me I will fawn on you.</div>
<div class="play-line" data-line-number="218" data-as="a2s1">Use me but as your spaniel: spurn me, strike me,</div>
<div class="play-line" data-line-number="219" data-as="a2s1">Neglect me, lose me; only give me leave</div>
<div class="play-line" data-line-number="220" data-as="a2s1">(Unworthy as I am) to follow you.</div>
<div class="play-line" data-line-number="221" data-as="a2s1">What worser place can I beg in your love</div>
<div class="play-line" data-line-number="222" data-as="a2s1">(And yet a place of high respect with me)</div>
<div class="play-line" data-line-number="223" data-as="a2s1">Than to be used as you use your dog?</div>
<br>
<speaker>DEMETRIUS</speaker>
<div class="play-line" data-line-number="224" data-as="a2s1">Tempt not too much the hatred of my spirit,</div>
<div class="play-line" data-line-number="225" data-as="a2s1">For I am sick when I do look on thee.</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="226" data-as="a2s1">And I am sick when I look not on you.</div>
<br>
<speaker>DEMETRIUS</speaker>
<div class="play-line" data-line-number="227" data-as="a2s1">You do impeach your modesty too much</div>
<div class="play-line" data-line-number="228" data-as="a2s1">To leave the city and commit yourself</div>
<div class="play-line" data-line-number="229" data-as="a2s1">Into the hands of one that loves you not,</div>
<div class="play-line" data-line-number="230" data-as="a2s1">To trust the opportunity of night</div>
<div class="play-line" data-line-number="231" data-as="a2s1">And the ill counsel of a desert place</div>
<div class="play-line" data-line-number="232" data-as="a2s1">With the rich worth of your virginity.</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="233" data-as="a2s1">Your virtue is my privilege. For that</div>
<div class="play-line" data-line-number="234" data-as="a2s1">It is not night when I do see your face,</div>
<div class="play-line" data-line-number="235" data-as="a2s1">Therefore I think I am not in the night.</div>
<div class="play-line" data-line-number="236" data-as="a2s1">Nor doth this wood lack worlds of company,</div>
<div class="play-line" data-line-number="237" data-as="a2s1">For you, in my respect, are all the world.</div>
<div class="play-line" data-line-number="238" data-as="a2s1">Then, how can it be said I am alone</div>
<div class="play-line" data-line-number="239" data-as="a2s1">When all the world is here to look on me?</div>
<br>
<speaker>DEMETRIUS</speaker>
<div class="play-line" data-line-number="240" data-as="a2s1">I&rsquo;ll run from thee and hide me in the brakes</div>
<div class="play-line" data-line-number="241" data-as="a2s1">And leave thee to the mercy of wild beasts.</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="242" data-as="a2s1">The wildest hath not such a heart as you.</div>
<div class="play-line" data-line-number="243" data-as="a2s1">Run when you will. The story shall be changed:</div>
<div class="play-line" data-line-number="244" data-as="a2s1">Apollo flies and Daphne holds the chase;</div>
<div class="play-line" data-line-number="245" data-as="a2s1">The dove pursues the griffin; the mild hind</div>
<div class="play-line" data-line-number="246" data-as="a2s1">Makes speed to catch the tiger. Bootless speed</div>
<div class="play-line" data-line-number="247" data-as="a2s1">When cowardice pursues and valor flies!</div>
<br>
<speaker>DEMETRIUS</speaker>
<div class="play-line" data-line-number="248" data-as="a2s1">I will not stay thy questions. Let me go,</div>
<div class="play-line" data-line-number="249" data-as="a2s1">Or if thou follow me, do not believe</div>
<div class="play-line" data-line-number="250" data-as="a2s1">But I shall do thee mischief in the wood.</div>
<br>
<speaker>HELENA</speaker>
<div class="play-line" data-line-number="251" data-as="a2s1">Ay, in the temple, in the town, the field,</div>
<div class="play-line" data-line-number="252" data-as="a2s1">You do me mischief. Fie, Demetrius!</div>
<div class="play-line" data-line-number="253" data-as="a2s1">Your wrongs do set a scandal on my sex.</div>
<div class="play-line" data-line-number="254" data-as="a2s1">We cannot fight for love as men may do.</div>
<div class="play-line" data-line-number="255" data-as="a2s1">We should be wooed and were not made to woo.</div>
<div class="play-line" data-line-number="256" data-as="a2s1">[<i>Demetrius exits.</i>]</div>
<div class="play-line" data-line-number="257" data-as="a2s1">I&rsquo;ll follow thee and make a heaven of hell</div>
<div class="play-line" data-line-number="258" data-as="a2s1">To die upon the hand I love so well.	[<i>Helena exits.</i>]</div>
<br>
<speaker>OBERON</speaker>
<div class="play-line" data-line-number="259" data-as="a2s1">Fare thee well, nymph. Ere he do leave this grove,</div>
<div class="play-line" data-line-number="260" data-as="a2s1">Thou shalt fly him, and he shall seek thy love.</div>
<br>
<div class="play-line" data-line-number="261" data-as="a2s1">[<i>Enter Robin.</i>]</div>
<br>
<div class="play-line" data-line-number="262" data-as="a2s1">Hast thou the flower there? Welcome, wanderer.</div>
<br>
<speaker>ROBIN</speaker>
<div class="play-line" data-line-number="263" data-as="a2s1">Ay, there it is.</div>
<br>
<speaker>OBERON</speaker>
<div class="play-line" data-line-number="264" data-as="a2s1">I pray thee give it me.</div>
<div class="play-line" data-line-number="265" data-as="a2s1">[<i>Robin gives him the flower.</i>]</div>
<div class="play-line" data-line-number="266" data-as="a2s1">I know a bank where the wild thyme blows,</div>
<div class="play-line" data-line-number="267" data-as="a2s1">Where oxlips and the nodding violet grows,</div>
<div class="play-line" data-line-number="268" data-as="a2s1">Quite overcanopied with luscious woodbine,</div>
<div class="play-line" data-line-number="269" data-as="a2s1">With sweet muskroses, and with eglantine.</div>
<div class="play-line" data-line-number="270" data-as="a2s1">There sleeps Titania sometime of the night,</div>
<div class="play-line" data-line-number="271" data-as="a2s1">Lulled in these flowers with dances and delight.</div>
<div class="play-line" data-line-number="272" data-as="a2s1">And there the snake throws her enameled skin,</div>
<div class="play-line" data-line-number="273" data-as="a2s1">Weed wide enough to wrap a fairy in.</div>
<div class="play-line" data-line-number="274" data-as="a2s1">And with the juice of this I&rsquo;ll streak her eyes</div>
<div class="play-line" data-line-number="275" data-as="a2s1">And make her full of hateful fantasies.</div>
<div class="play-line" data-line-number="276" data-as="a2s1">Take thou some of it, and seek through this grove.</div>
<div class="play-line" data-line-number="277" data-as="a2s1">[<i>He gives Robin part of the flower.</i>]</div>
<div class="play-line" data-line-number="278" data-as="a2s1">A sweet Athenian lady is in love</div>
<div class="play-line" data-line-number="279" data-as="a2s1">With a disdainful youth. Anoint his eyes,</div>
<div class="play-line" data-line-number="280" data-as="a2s1">But do it when the next thing he espies</div>
<div class="play-line" data-line-number="281" data-as="a2s1">May be the lady. Thou shalt know the man</div>
<div class="play-line" data-line-number="282" data-as="a2s1">By the Athenian garments he hath on.</div>
<div class="play-line" data-line-number="283" data-as="a2s1">Effect it with some care, that he may prove</div>
<div class="play-line" data-line-number="284" data-as="a2s1">More fond on her than she upon her love.</div>
<div class="play-line" data-line-number="285" data-as="a2s1">And look thou meet me ere the first cock crow.</div>
<br>
<speaker>ROBIN</speaker>`;

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
                        <div class="white-pane-top">
                            <!-- Top white pane content -->
                        </div>
                        <div class="white-pane-bottom">
                            <div class="white-pane-header">What's Going On?</div>
                            <div class="white-pane-subheader"></div>
                            <div class="white-pane-content">
                                Scroll to see summaries as-you-go...
                            </div>
                        </div>
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

        // Create a variable to store the current AbortController
        let currentAbortController = null;

        // Debounced version of the API call
        const debouncedFetchSummary = _.debounce((requestData) => {
            if (currentAbortController) {
                currentAbortController.abort();
            }
            
            currentAbortController = new AbortController();
            
            fetch('https://api.johnloeber.com/plot-by-line-numbers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
                signal: currentAbortController.signal
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.response) {
                    const formattedResponse = formatTypography(data.response);
                    document.querySelector('.white-pane-bottom .white-pane-content').innerHTML = formattedResponse;
                }
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    console.error('Error fetching plot summary:', error);
                    document.querySelector('.white-pane-bottom .white-pane-content').innerHTML = 'Unable to load plot summary at this time.';
                }
            });
        }, 250);

        // Add these variables outside the function to track previous values
        let prevFirstLine = null;
        let prevLastLine = null;
        let prevFirstAs = null;
        let prevLastAs = null;

        function updateVisibleLineNumbers() {
            const textContent = document.querySelector('.text-content');
            const whitePaneContent = document.querySelector('.white-pane-bottom .white-pane-content');
            const whitePaneSubheader = document.querySelector('.white-pane-subheader');
            const whitePaneTop = document.querySelector('.white-pane-top');
            
            // Initialize the top white pane with placeholder
            if (!whitePaneTop.querySelector('.white-pane-header')) {
                whitePaneTop.innerHTML = `
                    <div class="white-pane-header">Passage Analysis</div>
                    <div class="white-pane-content">Select any text in the play to see an explanation...</div>
                `;
            }
            
            // Get all play-line elements
            const playLines = textContent.querySelectorAll('.play-line');
            if (!playLines.length) return;

            // Get the container's boundaries
            const containerRect = textContent.getBoundingClientRect();
            let firstVisibleLine = null;
            let lastVisibleLine = null;
            let firstVisibleAs = null;
            let lastVisibleAs = null;

            // Find first and last visible lines
            playLines.forEach(line => {
                const lineRect = line.getBoundingClientRect();
                if (lineRect.top < containerRect.bottom && lineRect.bottom > containerRect.top) {
                    const lineNumber = line.getAttribute('data-line-number');
                    const actScene = line.getAttribute('data-as');
                    if (!firstVisibleLine) {
                        firstVisibleLine = lineNumber;
                        firstVisibleAs = actScene;
                    }
                    lastVisibleLine = lineNumber;
                    lastVisibleAs = actScene;
                }
            });

            // Update UI immediately
            if (firstVisibleLine && lastVisibleLine && firstVisibleAs && lastVisibleAs) {
                const startMatch = firstVisibleAs.match(/a(\d+)s(\d+)/);
                const endMatch = lastVisibleAs.match(/a(\d+)s(\d+)/);
                
                if (startMatch && endMatch) {
                    const [, startAct, startScene] = startMatch;
                    const [, endAct, endScene] = endMatch;
                    whitePaneSubheader.innerHTML = 
                        `Act ${startAct} Scene ${startScene} Line ${firstVisibleLine} &mdash; Act ${endAct} Scene ${endScene} Line ${lastVisibleLine}`;
                    whitePaneSubheader.style.display = 'block';
                    
                    // Only set loading text if the visible lines have changed
                    if (firstVisibleLine !== prevFirstLine || 
                        lastVisibleLine !== prevLastLine || 
                        firstVisibleAs !== prevFirstAs || 
                        lastVisibleAs !== prevLastAs) {
                        whitePaneContent.innerHTML = 'Loading...';  // This now correctly targets bottom pane
                    }
                }

                // Call debounced API function for plot summaries in bottom pane
                debouncedFetchSummary({
                    start_line: parseInt(firstVisibleLine),
                    start_as: firstVisibleAs,
                    end_line: parseInt(lastVisibleLine),
                    end_as: lastVisibleAs,
                    file: "a-midsummer-nights-dream"
                });

                // Update previous values
                prevFirstLine = firstVisibleLine;
                prevLastLine = lastVisibleLine;
                prevFirstAs = firstVisibleAs;
                prevLastAs = lastVisibleAs;
            } else {
                whitePaneSubheader.style.display = 'none';
            }
        }

        // Add scroll listener without debounce
        document.querySelector('.text-content').addEventListener('scroll', updateVisibleLineNumbers);

        // Call initially to set starting values
        setTimeout(updateVisibleLineNumbers, 100);

        // Add selection handler to the cream pane
        const creamPane = document.querySelector('.cream-pane');
        creamPane.addEventListener('mouseup', () => {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            
            if (selectedText.length > 0) {
                // Get the current filename from the options
                const selectedPlay = window.currentPlayTitle;
                const playFile = options.find(opt => opt.name === selectedPlay)?.filename;
                
                if (playFile) {
                    const whitePaneTopContent = document.querySelector('.white-pane-top .white-pane-content');
                    whitePaneTopContent.innerHTML = 'Loading explanation...';
                    
                    debouncedFetchSubstringExplanation({
                        substring: selectedText,
                        file: playFile
                    });
                }
            }
        });
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
    const viewportHeight = textContent.clientHeight;
    const buffer = viewportHeight * 0.2; // 20% buffer zone
    
    // Find all visible play lines
    const playLines = textContent.querySelectorAll('.play-line');
    let mostVisibleLine = null;
    let maxVisibility = 0;
    
    playLines.forEach(line => {
        const rect = line.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;
        
        // Calculate visibility with bias towards top of viewport
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
            mostVisibleLine = line;
        }
    });
    
    // If we found a visible line, update the active act/scene
    if (mostVisibleLine && maxVisibility > 0) {
        const dataAs = mostVisibleLine.getAttribute('data-as');
        if (dataAs) {
            // data-as format is "a1s2" for Act 1, Scene 2
            const match = dataAs.match(/a(\d+)s(\d+)/);
            if (match) {
                const [, act, scene] = match;
                selectAct(parseInt(act), parseInt(scene));
            }
        }
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

function formatTypography(text) {
    return text
        .replace(/(\W|^)"(\w)/g, '$1&ldquo;$2')  // Opening quotes
        .replace(/(\w)"(\W|$)/g, '$1&rdquo;$2')  // Closing quotes
        .replace(/(\W|^)'(\w)/g, '$1&lsquo;$2')  // Opening single quotes
        .replace(/(\w)'(\W|$)/g, '$1&rsquo;$2')  // Closing single quotes/apostrophes
        .replace(/(\w)'(\w)/g, '$1&rsquo;$2');   // Apostrophes between words
}

// Add these variables at the top level
let currentSubstringAbortController = null;
const debouncedFetchSubstringExplanation = _.debounce((requestData) => {
    if (currentSubstringAbortController) {
        currentSubstringAbortController.abort();
    }
    
    currentSubstringAbortController = new AbortController();
    
    const whitePaneTopContent = document.querySelector('.white-pane-top .white-pane-content');
    whitePaneTopContent.innerHTML = 'Loading explanation...';
    
    fetch('https://api.johnloeber.com/substring-explanation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        signal: currentSubstringAbortController.signal
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.response) {
            const formattedResponse = formatTypography(data.response);
            whitePaneTopContent.innerHTML = formattedResponse;
        }
    })
    .catch(error => {
        if (error.name !== 'AbortError') {
            console.error('Error fetching explanation:', error);
            whitePaneTopContent.innerHTML = 'Unable to load explanation at this time.';
        }
    });
}, 250);
