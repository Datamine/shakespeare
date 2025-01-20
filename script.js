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
        const rawPlayText = `Macbeth
by William Shakespeare
Edited by Barbara A. Mowat and Paul Werstine
  with Michael Poston and Rebecca Niles
Folger Shakespeare Library
https://shakespeare.folger.edu/shakespeares-works/macbeth/
Created on Jul 31, 2015, from FDT version 0.9.2

Characters in the Play
<hr>
Three Witches, the Weird Sisters
<b>DUNCAN</b>, king of Scotland
<b>MALCOLM</b>, his elder son
<b>DONALBAIN</b>, Duncan's younger son
<b>MACBETH</b>, thane of Glamis
LADY MACBETH
<b>SEYTON</b>, attendant to Macbeth
Three Murderers in Macbeth's service
Both attending upon Lady Macbeth:
  A Doctor
  A Gentlewoman
A Porter
<b>BANQUO</b>, commander, with Macbeth, of Duncan's army
<b>FLEANCE</b>, his son
<b>MACDUFF</b>, a Scottish noble
LADY MACDUFF
Their son
Scottish Nobles:
  LENNOX
  ROSS
  ANGUS
  MENTEITH
  CAITHNESS
<b>SIWARD</b>, commander of the English forces
<b>YOUNG SIWARD</b>, Siward's son
A Captain in Duncan's army
An Old Man
A Doctor at the English court
HECATE
Apparitions: an Armed Head, a Bloody Child, a Crowned Child, and eight nonspeaking kings
Three Messengers, Three Servants, a Lord, a Soldier
Attendants, a Sewer, Servants, Lords, Thanes, Soldiers (all nonspeaking)


<b>ACT 1
</b>
<hr>

<b>Scene 1
</b>
<hr>
[Thunder and Lightning. Enter three Witches.]


FIRST WITCH
When shall we three meet again?
In thunder, lightning, or in rain?

SECOND WITCH
When the hurly-burly's done,
When the battle's lost and won.

THIRD WITCH
That will be ere the set of sun.

FIRST WITCH
Where the place?

SECOND WITCH  Upon the heath.

THIRD WITCH
There to meet with Macbeth.

FIRST WITCH  I come, Graymalkin.

SECOND WITCH  Paddock calls.

THIRD WITCH  Anon.

ALL
Fair is foul, and foul is fair;
Hover through the fog and filthy air.
[They exit.]

<b>Scene 2
</b>
<hr>
[Alarum within. Enter King Duncan, Malcolm,
Donalbain, Lennox, with Attendants, meeting a bleeding
Captain.]


DUNCAN
What bloody man is that? He can report,
As seemeth by his plight, of the revolt
The newest state.

MALCOLM  This is the sergeant
Who, like a good and hardy soldier, fought
'Gainst my captivity.--Hail, brave friend!
Say to the King the knowledge of the broil
As thou didst leave it.

CAPTAIN  Doubtful it stood,
As two spent swimmers that do cling together
And choke their art. The merciless Macdonwald
(Worthy to be a rebel, for to that
The multiplying villainies of nature
Do swarm upon him) from the Western Isles
Of kerns and gallowglasses is supplied;
And Fortune, on his damned quarrel smiling,
Showed like a rebel's whore. But all's too weak;
For brave Macbeth (well he deserves that name),
Disdaining Fortune, with his brandished steel,
Which smoked with bloody execution,
Like Valor's minion, carved out his passage
Till he faced the slave;
Which ne'er shook hands, nor bade farewell to him,
Till he unseamed him from the nave to th' chops,
And fixed his head upon our battlements.

DUNCAN
O valiant cousin, worthy gentleman!

CAPTAIN
As whence the sun 'gins his reflection
Shipwracking storms and direful thunders break,
So from that spring whence comfort seemed to
come
Discomfort swells. Mark, King of Scotland, mark:
No sooner justice had, with valor armed,
Compelled these skipping kerns to trust their heels,
But the Norweyan lord, surveying vantage,
With furbished arms and new supplies of men,
Began a fresh assault.

DUNCAN
Dismayed not this our captains, Macbeth and
Banquo?

CAPTAIN
Yes, as sparrows eagles, or the hare the lion.
If I say sooth, I must report they were
As cannons overcharged with double cracks,
So they doubly redoubled strokes upon the foe.
Except they meant to bathe in reeking wounds
Or memorize another Golgotha,
I cannot tell--
But I am faint. My gashes cry for help.

DUNCAN
So well thy words become thee as thy wounds:
They smack of honor both.--Go, get him surgeons.
[The Captain is led off by Attendants.]

[Enter Ross and Angus.]

Who comes here?

MALCOLM  The worthy Thane of Ross.

LENNOX
What a haste looks through his eyes!
So should he look that seems to speak things
strange.

ROSS  God save the King.

DUNCAN  Whence cam'st thou, worthy thane?

ROSS  From Fife, great king,
Where the Norweyan banners flout the sky
And fan our people cold.
Norway himself, with terrible numbers,
Assisted by that most disloyal traitor,
The Thane of Cawdor, began a dismal conflict,
Till that Bellona's bridegroom, lapped in proof,
Confronted him with self-comparisons,
Point against point, rebellious arm 'gainst arm,
Curbing his lavish spirit. And to conclude,
The victory fell on us.

DUNCAN  Great happiness!

ROSS  That now Sweno,
The Norways' king, craves composition.
Nor would we deign him burial of his men
Till he disbursed at Saint Colme's Inch
Ten thousand dollars to our general use.

DUNCAN
No more that Thane of Cawdor shall deceive
Our bosom interest. Go, pronounce his present
death,
And with his former title greet Macbeth.

ROSS  I'll see it done.

DUNCAN
What he hath lost, noble Macbeth hath won.
[They exit.]

<b>Scene 3
</b>
<hr>
[Thunder. Enter the three Witches.]


FIRST WITCH  Where hast thou been, sister?

SECOND WITCH  Killing swine.

THIRD WITCH  Sister, where thou?

FIRST WITCH
A sailor's wife had chestnuts in her lap
And munched and munched and munched. "Give
me," quoth I.
"Aroint thee, witch," the rump-fed runnion cries.
Her husband's to Aleppo gone, master o' th' Tiger;
But in a sieve I'll thither sail,
And, like a rat without a tail,
I'll do, I'll do, and I'll do.

SECOND WITCH
I'll give thee a wind.

FIRST WITCH
Th' art kind.

THIRD WITCH
And I another.

FIRST WITCH
I myself have all the other,
And the very ports they blow;
All the quarters that they know
I' th' shipman's card.
I'll drain him dry as hay.
Sleep shall neither night nor day
Hang upon his penthouse lid.
He shall live a man forbid.
Weary sev'nnights, nine times nine,
Shall he dwindle, peak, and pine.
Though his bark cannot be lost,
Yet it shall be tempest-tossed.
Look what I have.

SECOND WITCH  Show me, show me.

FIRST WITCH
Here I have a pilot's thumb,
Wracked as homeward he did come.	[Drum within.]

THIRD WITCH
A drum, a drum!
Macbeth doth come.

<b>ALL</b>, [dancing in a circle]
The Weird Sisters, hand in hand,
Posters of the sea and land,
Thus do go about, about,
Thrice to thine and thrice to mine
And thrice again, to make up nine.
Peace, the charm's wound up.

[Enter Macbeth and Banquo.]


MACBETH
So foul and fair a day I have not seen.

BANQUO
How far is 't called to Forres?--What are these,
So withered, and so wild in their attire,
That look not like th' inhabitants o' th' Earth
And yet are on 't?--Live you? Or are you aught
That man may question? You seem to understand
me
By each at once her choppy finger laying
Upon her skinny lips. You should be women,
And yet your beards forbid me to interpret
That you are so.

MACBETH  Speak if you can. What are you?

FIRST WITCH
All hail, Macbeth! Hail to thee, Thane of Glamis!

SECOND WITCH
All hail, Macbeth! Hail to thee, Thane of Cawdor!

THIRD WITCH
All hail, Macbeth, that shalt be king hereafter!

BANQUO
Good sir, why do you start and seem to fear
Things that do sound so fair?--I' th' name of truth,
Are you fantastical, or that indeed
Which outwardly you show? My noble partner
You greet with present grace and great prediction
Of noble having and of royal hope,
That he seems rapt withal. To me you speak not.
If you can look into the seeds of time
And say which grain will grow and which will not,
Speak, then, to me, who neither beg nor fear
Your favors nor your hate.

FIRST WITCH  Hail!

SECOND WITCH  Hail!

THIRD WITCH  Hail!

FIRST WITCH
Lesser than Macbeth and greater.

SECOND WITCH
Not so happy, yet much happier.

THIRD WITCH
Thou shalt get kings, though thou be none.
So all hail, Macbeth and Banquo!

FIRST WITCH
Banquo and Macbeth, all hail!

MACBETH
Stay, you imperfect speakers. Tell me more.
By Sinel's death I know I am Thane of Glamis.
But how of Cawdor? The Thane of Cawdor lives
A prosperous gentleman, and to be king
Stands not within the prospect of belief,
No more than to be Cawdor. Say from whence
You owe this strange intelligence or why
Upon this blasted heath you stop our way
With such prophetic greeting. Speak, I charge you.
[Witches vanish.]

BANQUO
The earth hath bubbles, as the water has,
And these are of them. Whither are they vanished?

MACBETH
Into the air, and what seemed corporal melted,
As breath into the wind. Would they had stayed!

BANQUO
Were such things here as we do speak about?
Or have we eaten on the insane root
That takes the reason prisoner?

MACBETH
Your children shall be kings.

BANQUO  You shall be king.

MACBETH
And Thane of Cawdor too. Went it not so?

BANQUO
To th' selfsame tune and words.--Who's here?

[Enter Ross and Angus.]


ROSS
The King hath happily received, Macbeth,
The news of thy success, and, when he reads
Thy personal venture in the rebels' fight,
His wonders and his praises do contend
Which should be thine or his. Silenced with that,
In viewing o'er the rest o' th' selfsame day
He finds thee in the stout Norweyan ranks,
Nothing afeard of what thyself didst make,
Strange images of death. As thick as tale
Came post with post, and every one did bear
Thy praises in his kingdom's great defense,
And poured them down before him.

ANGUS  We are sent
To give thee from our royal master thanks,
Only to herald thee into his sight,
Not pay thee.

ROSS
And for an earnest of a greater honor,
He bade me, from him, call thee Thane of Cawdor,
In which addition, hail, most worthy thane,
For it is thine.

BANQUO  What, can the devil speak true?

MACBETH
The Thane of Cawdor lives. Why do you dress me
In borrowed robes?

ANGUS  Who was the Thane lives yet,
But under heavy judgment bears that life
Which he deserves to lose. Whether he was
combined
With those of Norway, or did line the rebel
With hidden help and vantage, or that with both
He labored in his country's wrack, I know not;
But treasons capital, confessed and proved,
Have overthrown him.

<b>MACBETH</b>, [aside]  Glamis and Thane of Cawdor!
The greatest is behind. [To Ross and Angus.] Thanks
for your pains.
[Aside to Banquo.] Do you not hope your children
shall be kings,
When those that gave the Thane of Cawdor to me
Promised no less to them?

BANQUO  That, trusted home,
Might yet enkindle you unto the crown,
Besides the Thane of Cawdor. But 'tis strange.
And oftentimes, to win us to our harm,
The instruments of darkness tell us truths,
Win us with honest trifles, to betray 's
In deepest consequence.--
Cousins, a word, I pray you.	[They step aside.]

<b>MACBETH</b>, [aside]  Two truths are told
As happy prologues to the swelling act
Of the imperial theme.--I thank you, gentlemen.
[Aside.] This supernatural soliciting
Cannot be ill, cannot be good. If ill,
Why hath it given me earnest of success
Commencing in a truth? I am Thane of Cawdor.
If good, why do I yield to that suggestion
Whose horrid image doth unfix my hair
And make my seated heart knock at my ribs
Against the use of nature? Present fears
Are less than horrible imaginings.
My thought, whose murder yet is but fantastical,
Shakes so my single state of man
That function is smothered in surmise,
And nothing is but what is not.

BANQUO  Look how our partner's rapt.

<b>MACBETH</b>, [aside]
If chance will have me king, why, chance may
crown me
Without my stir.

BANQUO  New honors come upon him,
Like our strange garments, cleave not to their mold
But with the aid of use.

<b>MACBETH</b>, [aside]  Come what come may,
Time and the hour runs through the roughest day.

BANQUO
Worthy Macbeth, we stay upon your leisure.

MACBETH
Give me your favor. My dull brain was wrought
With things forgotten. Kind gentlemen, your pains
Are registered where every day I turn
The leaf to read them. Let us toward the King.
[Aside to Banquo.] Think upon what hath chanced,
and at more time,
The interim having weighed it, let us speak
Our free hearts each to other.

BANQUO  Very gladly.

MACBETH  Till then, enough.--Come, friends.
[They exit.]

<b>Scene 4
</b>
<hr>
[Flourish. Enter King Duncan, Lennox, Malcolm,
Donalbain, and Attendants.]


DUNCAN
Is execution done on Cawdor? Are not
Those in commission yet returned?

MALCOLM  My liege,
They are not yet come back. But I have spoke
With one that saw him die, who did report
That very frankly he confessed his treasons,
Implored your Highness' pardon, and set forth
A deep repentance. Nothing in his life
Became him like the leaving it. He died
As one that had been studied in his death
To throw away the dearest thing he owed
As 'twere a careless trifle.

DUNCAN  There's no art
To find the mind's construction in the face.
He was a gentleman on whom I built
An absolute trust.

[Enter Macbeth, Banquo, Ross, and Angus.]

O worthiest cousin,
The sin of my ingratitude even now
Was heavy on me. Thou art so far before
That swiftest wing of recompense is slow
To overtake thee. Would thou hadst less deserved,
That the proportion both of thanks and payment
Might have been mine! Only I have left to say,
More is thy due than more than all can pay.

MACBETH
The service and the loyalty I owe
In doing it pays itself. Your Highness' part
Is to receive our duties, and our duties
Are to your throne and state children and servants,
Which do but what they should by doing everything
Safe toward your love and honor.

DUNCAN  Welcome hither.
I have begun to plant thee and will labor
To make thee full of growing.--Noble Banquo,
That hast no less deserved nor must be known
No less to have done so, let me enfold thee
And hold thee to my heart.

BANQUO  There, if I grow,
The harvest is your own.

DUNCAN  My plenteous joys,
Wanton in fullness, seek to hide themselves
In drops of sorrow.--Sons, kinsmen, thanes,
And you whose places are the nearest, know
We will establish our estate upon
Our eldest, Malcolm, whom we name hereafter
The Prince of Cumberland; which honor must
Not unaccompanied invest him only,
But signs of nobleness, like stars, shall shine
On all deservers.--From hence to Inverness
And bind us further to you.

MACBETH
The rest is labor which is not used for you.
I'll be myself the harbinger and make joyful
The hearing of my wife with your approach.
So humbly take my leave.

DUNCAN  My worthy Cawdor.

<b>MACBETH</b>, [aside]
The Prince of Cumberland! That is a step
On which I must fall down or else o'erleap,
For in my way it lies. Stars, hide your fires;
Let not light see my black and deep desires.
The eye wink at the hand, yet let that be
Which the eye fears, when it is done, to see.
[He exits.]

DUNCAN
True, worthy Banquo. He is full so valiant,
And in his commendations I am fed:
It is a banquet to me.--Let's after him,
Whose care is gone before to bid us welcome.
It is a peerless kinsman.
[Flourish. They exit.]

<b>Scene 5
</b>
<hr>
[Enter Macbeth's Wife, alone, with a letter.]


<b>LADY MACBETH</b>, [reading the letter]  They met me in the
day of success, and I have learned by the perfect'st
report they have more in them than mortal knowledge.
When I burned in desire to question them further, they
made themselves air, into which they vanished.
Whiles I stood rapt in the wonder of it came missives
from the King, who all-hailed me "Thane of Cawdor,"
by which title, before, these Weird Sisters saluted me
and referred me to the coming on of time with "Hail,
king that shalt be." This have I thought good to deliver
thee, my dearest partner of greatness, that thou
might'st not lose the dues of rejoicing by being ignorant
of what greatness is promised thee. Lay it to thy
heart, and farewell.
Glamis thou art, and Cawdor, and shalt be
What thou art promised. Yet do I fear thy nature;
It is too full o' th' milk of human kindness
To catch the nearest way. Thou wouldst be great,
Art not without ambition, but without
The illness should attend it. What thou wouldst
highly,
That wouldst thou holily; wouldst not play false
And yet wouldst wrongly win. Thou 'dst have, great
Glamis,
That which cries "Thus thou must do," if thou have
it,
And that which rather thou dost fear to do,
Than wishest should be undone. Hie thee hither,
That I may pour my spirits in thine ear
And chastise with the valor of my tongue
All that impedes thee from the golden round,
Which fate and metaphysical aid doth seem
To have thee crowned withal.

[Enter Messenger.]

What is your tidings?

MESSENGER
The King comes here tonight.

LADY MACBETH  Thou 'rt mad to say it.
Is not thy master with him, who, were 't so,
Would have informed for preparation?

MESSENGER
So please you, it is true. Our thane is coming.
One of my fellows had the speed of him,
Who, almost dead for breath, had scarcely more
Than would make up his message.

LADY MACBETH  Give him tending.
He brings great news.	[Messenger exits.]
The raven himself is hoarse
That croaks the fatal entrance of Duncan
Under my battlements. Come, you spirits
That tend on mortal thoughts, unsex me here,
And fill me from the crown to the toe top-full
Of direst cruelty. Make thick my blood.
Stop up th' access and passage to remorse,
That no compunctious visitings of nature
Shake my fell purpose, nor keep peace between
Th' effect and it. Come to my woman's breasts
And take my milk for gall, you murd'ring ministers,
Wherever in your sightless substances
You wait on nature's mischief. Come, thick night,
And pall thee in the dunnest smoke of hell,
That my keen knife see not the wound it makes,
Nor heaven peep through the blanket of the dark
To cry "Hold, hold!"

[Enter Macbeth.]

Great Glamis, worthy Cawdor,
Greater than both by the all-hail hereafter!
Thy letters have transported me beyond
This ignorant present, and I feel now
The future in the instant.

MACBETH  My dearest love,
Duncan comes here tonight.

LADY MACBETH  And when goes hence?

MACBETH
Tomorrow, as he purposes.

<b>LADY MACBETH  O</b>, never
Shall sun that morrow see!
Your face, my thane, is as a book where men
May read strange matters. To beguile the time,
Look like the time. Bear welcome in your eye,
Your hand, your tongue. Look like th' innocent
flower,
But be the serpent under 't. He that's coming
Must be provided for; and you shall put
This night's great business into my dispatch,
Which shall to all our nights and days to come
Give solely sovereign sway and masterdom.

MACBETH
We will speak further.

LADY MACBETH  Only look up clear.
To alter favor ever is to fear.
Leave all the rest to me.
[They exit.]

<b>Scene 6
</b>
<hr>
[Hautboys and Torches. Enter King Duncan, Malcolm,
Donalbain, Banquo, Lennox, Macduff, Ross, Angus, and
Attendants.]


DUNCAN
This castle hath a pleasant seat. The air
Nimbly and sweetly recommends itself
Unto our gentle senses.

BANQUO  This guest of summer,
The temple-haunting martlet, does approve,
By his loved mansionry, that the heaven's breath
Smells wooingly here. No jutty, frieze,
Buttress, nor coign of vantage, but this bird
Hath made his pendant bed and procreant cradle.
Where they most breed and haunt, I have
observed,
The air is delicate.

[Enter Lady Macbeth.]


DUNCAN  See, see our honored hostess!--
The love that follows us sometime is our trouble,
Which still we thank as love. Herein I teach you
How you shall bid God 'ild us for your pains
And thank us for your trouble.

LADY MACBETH  All our service,
In every point twice done and then done double,
Were poor and single business to contend
Against those honors deep and broad wherewith
Your Majesty loads our house. For those of old,
And the late dignities heaped up to them,
We rest your hermits.

DUNCAN  Where's the Thane of Cawdor?
We coursed him at the heels and had a purpose
To be his purveyor; but he rides well,
And his great love, sharp as his spur, hath helped
him
To his home before us. Fair and noble hostess,
We are your guest tonight.

LADY MACBETH  Your servants ever
Have theirs, themselves, and what is theirs in compt
To make their audit at your Highness' pleasure,
Still to return your own.

DUNCAN  Give me your hand.

[Taking her hand.]
Conduct me to mine host. We love him highly
And shall continue our graces towards him.
By your leave, hostess.
[They exit.]

<b>Scene 7
</b>
<hr>
[Hautboys. Torches. Enter a Sewer and divers Servants
with dishes and service over the stage. Then enter
Macbeth.]


MACBETH
If it were done when 'tis done, then 'twere well
It were done quickly. If th' assassination
Could trammel up the consequence and catch
With his surcease success, that but this blow
Might be the be-all and the end-all here,
But here, upon this bank and shoal of time,
We'd jump the life to come. But in these cases
We still have judgment here, that we but teach
Bloody instructions, which, being taught, return
To plague th' inventor. This even-handed justice
Commends th' ingredience of our poisoned chalice
To our own lips. He's here in double trust:
First, as I am his kinsman and his subject,
Strong both against the deed; then, as his host,
Who should against his murderer shut the door,
Not bear the knife myself. Besides, this Duncan
Hath borne his faculties so meek, hath been
So clear in his great office, that his virtues
Will plead like angels, trumpet-tongued, against
The deep damnation of his taking-off;
And pity, like a naked newborn babe
Striding the blast, or heaven's cherubin horsed
Upon the sightless couriers of the air,
Shall blow the horrid deed in every eye,
That tears shall drown the wind. I have no spur
To prick the sides of my intent, but only
Vaulting ambition, which o'erleaps itself
And falls on th' other--

[Enter Lady Macbeth.]

How now, what news?

LADY MACBETH
He has almost supped. Why have you left the
chamber?

MACBETH
Hath he asked for me?

LADY MACBETH  Know you not he has?

MACBETH
We will proceed no further in this business.
He hath honored me of late, and I have bought
Golden opinions from all sorts of people,
Which would be worn now in their newest gloss,
Not cast aside so soon.

LADY MACBETH  Was the hope drunk
Wherein you dressed yourself? Hath it slept since?
And wakes it now, to look so green and pale
At what it did so freely? From this time
Such I account thy love. Art thou afeard
To be the same in thine own act and valor
As thou art in desire? Wouldst thou have that
Which thou esteem'st the ornament of life
And live a coward in thine own esteem,
Letting "I dare not" wait upon "I would,"
Like the poor cat i' th' adage?

MACBETH  Prithee, peace.
I dare do all that may become a man.
Who dares do more is none.

LADY MACBETH  What beast was 't,
then,
That made you break this enterprise to me?
When you durst do it, then you were a man;
And to be more than what you were, you would
Be so much more the man. Nor time nor place
Did then adhere, and yet you would make both.
They have made themselves, and that their fitness
now
Does unmake you. I have given suck, and know
How tender 'tis to love the babe that milks me.
I would, while it was smiling in my face,
Have plucked my nipple from his boneless gums
And dashed the brains out, had I so sworn as you
Have done to this.

MACBETH  If we should fail--

LADY MACBETH  We fail?
But screw your courage to the sticking place
And we'll not fail. When Duncan is asleep
(Whereto the rather shall his day's hard journey
Soundly invite him), his two chamberlains
Will I with wine and wassail so convince
That memory, the warder of the brain,
Shall be a fume, and the receipt of reason
A limbeck only. When in swinish sleep
Their drenched natures lies as in a death,
What cannot you and I perform upon
Th' unguarded Duncan? What not put upon
His spongy officers, who shall bear the guilt
Of our great quell?

MACBETH  Bring forth men-children only,
For thy undaunted mettle should compose
Nothing but males. Will it not be received,
When we have marked with blood those sleepy two
Of his own chamber and used their very daggers,
That they have done 't?

LADY MACBETH  Who dares receive it other,
As we shall make our griefs and clamor roar
Upon his death?

MACBETH  I am settled and bend up
Each corporal agent to this terrible feat.
Away, and mock the time with fairest show.
False face must hide what the false heart doth
know.
[They exit.]


<b>ACT 2
</b>
<hr>

<b>Scene 1
</b>
<hr>
[Enter Banquo, and Fleance with a torch before him.]


BANQUO  How goes the night, boy?

FLEANCE
The moon is down. I have not heard the clock.

BANQUO  And she goes down at twelve.

FLEANCE  I take 't 'tis later, sir.`;

        const playText = rawPlayText;

        // Replace the entire body content with our new layout
        document.body.innerHTML = `
            <div class="three-pane-layout">
                <div class="sidebar">
                    <div class="icon-container">
                        <img src="shakespeare_icon.png" alt="App Icon" class="sidebar-icon">
                    </div>
                    <div class="sidebar-tabs">
                        <div class="tab active">${selectedPlay}</div>
                    </div>
                </div>
                <div class="main-content">
                    <div class="cream-pane">
                        <div class="text-content">${playText}</div>
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
        updateSidebar(playText, selectedPlay);
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
    const sidebar = document.querySelector('.sidebar-tabs');
    
    // Clear existing tabs except the first one (play name)
    while (sidebar.children.length > 1) {
        sidebar.removeChild(sidebar.lastChild);
    }
    
    // Create acts container
    const actsContainer = document.createElement('div');
    actsContainer.className = 'sidebar-acts';
    
    // Find all acts and scenes
    const lines = playText.split('\n');
    let currentAct = null;
    
    lines.forEach((line, index) => {
        // Check for Act headers (looking for the bold tag now)
        if (line.includes('<b>ACT')) {
            const actDiv = document.createElement('div');
            actDiv.className = 'act-item';
            actDiv.textContent = line.replace(/<\/?b>/g, '').trim(); // Remove bold tags
            actDiv.onclick = () => {
                document.querySelectorAll('.act-item, .scene-item').forEach(item => 
                    item.classList.remove('active')
                );
                actDiv.classList.add('active');
                scrollToLine(index);
            };
            actsContainer.appendChild(actDiv);
            currentAct = actDiv;
        }
        // Check for Scene headers (looking for the bold tag now)
        else if (line.includes('<b>Scene')) {
            const sceneDiv = document.createElement('div');
            sceneDiv.className = 'scene-item';
            sceneDiv.textContent = line.replace(/<\/?b>/g, '').trim(); // Remove bold tags
            sceneDiv.onclick = () => {
                document.querySelectorAll('.act-item, .scene-item').forEach(item => 
                    item.classList.remove('active')
                );
                if (currentAct) currentAct.classList.add('active');
                sceneDiv.classList.add('active');
                scrollToLine(index);
            };
            actsContainer.appendChild(sceneDiv);
        }
    });
    
    // Only append the acts container if it has children
    if (actsContainer.children.length > 0) {
        sidebar.appendChild(actsContainer);
    }
}

function scrollToLine(lineIndex) {
    const textContent = document.querySelector('.text-content');
    const lines = textContent.innerHTML.split('\n');
    
    // Calculate approximate position
    const lineHeight = 24; // Approximate line height in pixels
    const scrollPosition = lineHeight * lineIndex;
    
    textContent.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
}
