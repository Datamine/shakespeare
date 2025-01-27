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
[<i>Enter Theseus, Hippolyta, and Philostrate, with others.</i>]

THESEUS
Now, fair Hippolyta, our nuptial hour
Draws on apace. Four happy days bring in
Another moon. But, O, methinks how slow
This old moon wanes! She lingers my desires
Like to a stepdame or a dowager
Long withering out a young man&rsquo;s revenue.

HIPPOLYTA
Four days will quickly steep themselves in night;
Four nights will quickly dream away the time;
And then the moon, like to a silver bow
New-bent in heaven, shall behold the night
Of our solemnities.

THESEUS  Go, Philostrate,
Stir up the Athenian youth to merriments.
Awake the pert and nimble spirit of mirth.
Turn melancholy forth to funerals;
The pale companion is not for our pomp.
[<i>Philostrate exits.</i>]
Hippolyta, I wooed thee with my sword
And won thy love doing thee injuries,
But I will wed thee in another key,
With pomp, with triumph, and with reveling.

[<i>Enter Egeus and his daughter Hermia, and Lysander 
 and Demetrius.</i>]

EGEUS
Happy be Theseus, our renowned duke!

THESEUS
Thanks, good Egeus. What&rsquo;s the news with thee?

EGEUS
Full of vexation come I, with complaint
Against my child, my daughter Hermia.&mdash;
Stand forth, Demetrius.&mdash;My noble lord,
This man hath my consent to marry her.&mdash;
Stand forth, Lysander.&mdash;And, my gracious duke,
This man hath bewitched the bosom of my child.&mdash;
Thou, thou, Lysander, thou hast given her rhymes
And interchanged love tokens with my child.
Thou hast by moonlight at her window sung
With feigning voice verses of feigning love
And stol&rsquo;n the impression of her fantasy
With bracelets of thy hair, rings, gauds, conceits,
Knacks, trifles, nosegays, sweetmeats&mdash;messengers
Of strong prevailment in unhardened youth.
With cunning hast thou filched my daughter&rsquo;s heart,
Turned her obedience (which is due to me)
To stubborn harshness.&mdash;And, my gracious duke,
Be it so she will not here before your Grace
Consent to marry with Demetrius,
I beg the ancient privilege of Athens:
As she is mine, I may dispose of her,
Which shall be either to this gentleman
Or to her death, according to our law
Immediately provided in that case.

THESEUS
What say you, Hermia? Be advised, fair maid.
To you, your father should be as a god,
One that composed your beauties, yea, and one
To whom you are but as a form in wax
By him imprinted, and within his power
To leave the figure or disfigure it.
Demetrius is a worthy gentleman.

HERMIA
So is Lysander.

THESEUS  In himself he is,
But in this kind, wanting your father&rsquo;s voice,
The other must be held the worthier.

HERMIA
I would my father looked but with my eyes.

THESEUS
Rather your eyes must with his judgment look.

HERMIA
I do entreat your Grace to pardon me.
I know not by what power I am made bold,
Nor how it may concern my modesty
In such a presence here to plead my thoughts;
But I beseech your Grace that I may know
The worst that may befall me in this case
If I refuse to wed Demetrius.

THESEUS
Either to die the death or to abjure
Forever the society of men.
Therefore, fair Hermia, question your desires,
Know of your youth, examine well your blood,
Whether (if you yield not to your father&rsquo;s choice)
You can endure the livery of a nun,
For aye to be in shady cloister mewed,
To live a barren sister all your life,
Chanting faint hymns to the cold fruitless moon.
Thrice-blessed they that master so their blood
To undergo such maiden pilgrimage,
But earthlier happy is the rose distilled
Than that which, withering on the virgin thorn,
Grows, lives, and dies in single blessedness.

HERMIA
So will I grow, so live, so die, my lord,
Ere I will yield my virgin patent up
Unto his Lordship whose unwished yoke
My soul consents not to give sovereignty.

THESEUS
Take time to pause, and by the next new moon
(The sealing day betwixt my love and me
For everlasting bond of fellowship),
Upon that day either prepare to die
For disobedience to your father&rsquo;s will,
Or else to wed Demetrius, as he would,
Or on Diana&rsquo;s altar to protest
For aye austerity and single life.

DEMETRIUS
Relent, sweet Hermia, and, Lysander, yield
Thy crazed title to my certain right.

LYSANDER
You have her father&rsquo;s love, Demetrius.
Let me have Hermia&rsquo;s. Do you marry him.

EGEUS
Scornful Lysander, true, he hath my love;
And what is mine my love shall render him.
And she is mine, and all my right of her
I do estate unto Demetrius.

LYSANDER, [<i>to Theseus</i>]
I am, my lord, as well derived as he,
As well possessed. My love is more than his;
My fortunes every way as fairly ranked
(If not with vantage) as Demetrius&rsquo;;
And (which is more than all these boasts can be)
I am beloved of beauteous Hermia.
Why should not I then prosecute my right?
Demetrius, I&rsquo;ll avouch it to his head,
Made love to Nedar&rsquo;s daughter, Helena,
And won her soul; and she, sweet lady, dotes,
Devoutly dotes, dotes in idolatry,
Upon this spotted and inconstant man.

THESEUS
I must confess that I have heard so much,
And with Demetrius thought to have spoke thereof;
But, being overfull of self-affairs,
My mind did lose it.&mdash;But, Demetrius, come,
And come, Egeus; you shall go with me.
I have some private schooling for you both.&mdash;
For you, fair Hermia, look you arm yourself
To fit your fancies to your father&rsquo;s will,
Or else the law of Athens yields you up
(Which by no means we may extenuate)
To death or to a vow of single life.&mdash;
Come, my Hippolyta. What cheer, my love?&mdash;
Demetrius and Egeus, go along.
I must employ you in some business
Against our nuptial and confer with you
Of something nearly that concerns yourselves.

EGEUS
With duty and desire we follow you.
[<i>All but Hermia and Lysander exit.</i>]

LYSANDER
How now, my love? Why is your cheek so pale?
How chance the roses there do fade so fast?

HERMIA
Belike for want of rain, which I could well
Beteem them from the tempest of my eyes.

LYSANDER
Ay me! For aught that I could ever read,
Could ever hear by tale or history,
The course of true love never did run smooth.
But either it was different in blood&mdash;

HERMIA
O cross! Too high to be enthralled to low.

LYSANDER
Or else misgraffed in respect of years&mdash;

HERMIA
O spite! Too old to be engaged to young.

LYSANDER
Or else it stood upon the choice of friends&mdash;

HERMIA
O hell, to choose love by another&rsquo;s eyes!

LYSANDER
Or, if there were a sympathy in choice,
War, death, or sickness did lay siege to it,
Making it momentany as a sound,
Swift as a shadow, short as any dream,
Brief as the lightning in the collied night,
That, in a spleen, unfolds both heaven and Earth,
And, ere a man hath power to say "&ldquo;Behold!&rdquo;
The jaws of darkness do devour it up.
So quick bright things come to confusion.

HERMIA
If then true lovers have been ever crossed,
It stands as an edict in destiny.
Then let us teach our trial patience
Because it is a customary cross,
As due to love as thoughts and dreams and sighs,
Wishes and tears, poor fancy&rsquo;s followers.

LYSANDER
A good persuasion. Therefore, hear me, Hermia:
I have a widow aunt, a dowager
Of great revenue, and she hath no child.
From Athens is her house remote seven leagues,
And she respects me as her only son.
There, gentle Hermia, may I marry thee;
And to that place the sharp Athenian law
Cannot pursue us. If thou lovest me, then
Steal forth thy father&rsquo;s house tomorrow night,
And in the wood a league without the town
(Where I did meet thee once with Helena
To do observance to a morn of May),
There will I stay for thee.

HERMIA  My good Lysander,
I swear to thee by Cupid&rsquo;s strongest bow,
By his best arrow with the golden head,
By the simplicity of Venus&rsquo; doves,
By that which knitteth souls and prospers loves,
And by that fire which burned the Carthage queen
When the false Trojan under sail was seen,
By all the vows that ever men have broke
(In number more than ever women spoke),
In that same place thou hast appointed me,
Tomorrow truly will I meet with thee.

LYSANDER
Keep promise, love. Look, here comes Helena.

[<i>Enter Helena.</i>]

HERMIA
Godspeed, fair Helena. Whither away?

HELENA
Call you me "&ldquo;fair&rdquo;? That "&ldquo;fair&rdquo; again unsay.
Demetrius loves your fair. O happy fair!
Your eyes are lodestars and your tongue&rsquo;s sweet air
More tunable than lark to shepherd&rsquo;s ear
When wheat is green, when hawthorn buds appear.
Sickness is catching. O, were favor so!
Yours would I catch, fair Hermia, ere I go.
My ear should catch your voice, my eye your eye;
My tongue should catch your tongue&rsquo;s sweet
melody.
Were the world mine, Demetrius being bated,
The rest I&rsquo;d give to be to you translated.
O, teach me how you look and with what art
You sway the motion of Demetrius&rsquo; heart!

HERMIA
I frown upon him, yet he loves me still.

HELENA
O, that your frowns would teach my smiles such
skill!

HERMIA
I give him curses, yet he gives me love.

HELENA
O, that my prayers could such affection move!

HERMIA
The more I hate, the more he follows me.

HELENA
The more I love, the more he hateth me.

HERMIA
His folly, Helena, is no fault of mine.

HELENA
None but your beauty. Would that fault were mine!

HERMIA
Take comfort: he no more shall see my face.
Lysander and myself will fly this place.
Before the time I did Lysander see
Seemed Athens as a paradise to me.
O, then, what graces in my love do dwell
That he hath turned a heaven unto a hell!

LYSANDER
Helen, to you our minds we will unfold.
Tomorrow night when Phoebe doth behold
Her silver visage in the wat&rsquo;ry glass,
Decking with liquid pearl the bladed grass
(A time that lovers&rsquo; flights doth still conceal),
Through Athens&rsquo; gates have we devised to steal.

HERMIA
And in the wood where often you and I
Upon faint primrose beds were wont to lie,
Emptying our bosoms of their counsel sweet,
There my Lysander and myself shall meet
And thence from Athens turn away our eyes
To seek new friends and stranger companies.
Farewell, sweet playfellow. Pray thou for us,
And good luck grant thee thy Demetrius.&mdash;
Keep word, Lysander. We must starve our sight
From lovers&rsquo; food till morrow deep midnight.

LYSANDER
I will, my Hermia.	[<i>Hermia exits.</i>]
Helena, adieu.
As you on him, Demetrius dote on you!
[<i>Lysander exits.</i>]

HELENA
How happy some o&rsquo;er other some can be!
Through Athens I am thought as fair as she.
But what of that? Demetrius thinks not so.
He will not know what all but he do know.
And, as he errs, doting on Hermia&rsquo;s eyes,
So I, admiring of his qualities.
Things base and vile, holding no quantity,
Love can transpose to form and dignity.
Love looks not with the eyes but with the mind;
And therefore is winged Cupid painted blind.
Nor hath Love&rsquo;s mind of any judgment taste.
Wings, and no eyes, figure unheedy haste.
And therefore is Love said to be a child
Because in choice he is so oft beguiled.
As waggish boys in game themselves forswear,
So the boy Love is perjured everywhere.
For, ere Demetrius looked on Hermia&rsquo;s eyne,
He hailed down oaths that he was only mine;
And when this hail some heat from Hermia felt,
So he dissolved, and show&rsquo;rs of oaths did melt.
I will go tell him of fair Hermia&rsquo;s flight.
Then to the wood will he tomorrow night
Pursue her. And, for this intelligence
If I have thanks, it is a dear expense.
But herein mean I to enrich my pain,
To have his sight thither and back again.
[<i>She exits.</i>]

<b id="act-1-scene-2" class="scene-header">Scene 2</b>
<hr>
[<i>Enter Quince the carpenter, and Snug the joiner, and
Bottom the weaver, and Flute the bellows-mender, and
Snout the tinker, and Starveling the tailor.</i>]

<speaker>QUINCE</speaker>
Is all our company here?

<speaker>BOTTOM</speaker>
You were best to call them generally, man by
man, according to the scrip.

<speaker>QUINCE</speaker>
Here is the scroll of every man&rsquo;s name which
is thought fit, through all Athens, to play in our
interlude before the Duke and the Duchess on his
wedding day at night.

<speaker>BOTTOM</speaker>
First, good Peter Quince, say what the play
treats on, then read the names of the actors, and so
grow to a point.

<speaker>QUINCE</speaker>
Marry, our play is "&ldquo;The most lamentable
comedy and most cruel death of Pyramus and
Thisbe.&rdquo;

<speaker>BOTTOM</speaker>
A very good piece of work, I assure you, and a
merry. Now, good Peter Quince, call forth your
actors by the scroll. Masters, spread yourselves.

<speaker>QUINCE</speaker>
Answer as I call you. Nick Bottom, the weaver.

<speaker>BOTTOM</speaker>
Ready. Name what part I am for, and
proceed.

<speaker>QUINCE</speaker>
You, Nick Bottom, are set down for Pyramus.

<speaker>BOTTOM</speaker>
What is Pyramus&mdash;a lover or a tyrant?

<speaker>QUINCE</speaker>
A lover that kills himself most gallant for love.

<speaker>BOTTOM</speaker>
That will ask some tears in the true performing
of it. If I do it, let the audience look to their
eyes. I will move storms; I will condole in some
measure. To the rest.&mdash;Yet my chief humor is for a
tyrant. I could play Ercles rarely, or a part to tear a
cat in, to make all split:

	The raging rocks
	And shivering shocks
	Shall break the locks
	   Of prison gates.
	And Phibbus&rsquo; car
	Shall shine from far
	And make and mar
	   The foolish Fates.

This was lofty. Now name the rest of the players.
This is Ercles&rsquo; vein, a tyrant&rsquo;s vein. A lover is more
condoling.

<speaker>QUINCE</speaker>
Francis Flute, the bellows-mender.

<speaker>FLUTE</speaker>
Here, Peter Quince.

<speaker>QUINCE</speaker>
Flute, you must take Thisbe on you.

<speaker>FLUTE</speaker>
What is Thisbe&mdash;a wand&rsquo;ring knight?

<speaker>QUINCE</speaker>
It is the lady that Pyramus must love.

<speaker>FLUTE</speaker>
Nay, faith, let not me play a woman. I have a
beard coming.

<speaker>QUINCE</speaker>
That&rsquo;s all one. You shall play it in a mask, and
you may speak as small as you will.

<speaker>BOTTOM</speaker>
An I may hide my face, let me play Thisbe too.
I&rsquo;ll speak in a monstrous little voice: "&ldquo;Thisne,
Thisne!"&mdash;"Ah Pyramus, my lover dear! Thy Thisbe
dear and lady dear!&rdquo;

<speaker>QUINCE</speaker>
No, no, you must play Pyramus&mdash;and, Flute,
you Thisbe.

<speaker>BOTTOM</speaker>
Well, proceed.

<speaker>QUINCE</speaker>
Robin Starveling, the tailor.

<speaker>STARVELING</speaker>
Here, Peter Quince.

<speaker>QUINCE</speaker>
Robin Starveling, you must play Thisbe&rsquo;s
mother.&mdash;Tom Snout, the tinker.

<speaker>SNOUT</speaker>
Here, Peter Quince.

<speaker>QUINCE</speaker>
You, Pyramus&rsquo; father.&mdash;Myself, Thisbe&rsquo;s
father.&mdash;Snug the joiner, you the lion&rsquo;s part.&mdash;
And I hope here is a play fitted.

<speaker>SNUG</speaker>
Have you the lion&rsquo;s part written? Pray you, if it
be, give it me, for I am slow of study.

<speaker>QUINCE</speaker>
You may do it extempore, for it is nothing but
roaring.

<speaker>BOTTOM</speaker>
Let me play the lion too. I will roar that I will
do any man&rsquo;s heart good to hear me. I will roar that
I will make the Duke say "&ldquo;Let him roar again. Let
him roar again!&rdquo;

<speaker>QUINCE</speaker>
An you should do it too terribly, you would
fright the Duchess and the ladies that they would
shriek, and that were enough to hang us all.

<speaker>ALL</speaker>
That would hang us, every mother&rsquo;s son.

<speaker>BOTTOM</speaker>
I grant you, friends, if you should fright the
ladies out of their wits, they would have no more
discretion but to hang us. But I will aggravate my
voice so that I will roar you as gently as any sucking
dove. I will roar you an &rsquo;twere any nightingale.

<speaker>QUINCE</speaker>
You can play no part but Pyramus, for Pyramus
is a sweet-faced man, a proper man as one
shall see in a summer&rsquo;s day, a most lovely gentlemanlike
man. Therefore you must needs play 
Pyramus.

<speaker>BOTTOM</speaker>
Well, I will undertake it. What beard were I
best to play it in?

<speaker>QUINCE</speaker>
Why, what you will.

<speaker>BOTTOM</speaker>
I will discharge it in either your straw-color
beard, your orange-tawny beard, your purple-in-grain
beard, or your French-crown-color beard,
your perfit yellow.

<speaker>QUINCE</speaker>
Some of your French crowns have no hair at
all, and then you will play barefaced. But, masters,
here are your parts, [<i>giving out the parts,</i>]
 and I am
to entreat you, request you, and desire you to con
them by tomorrow night and meet me in the palace
wood, a mile without the town, by moonlight. There
will we rehearse, for if we meet in the city, we shall
be dogged with company and our devices known. In
the meantime I will draw a bill of properties such as
our play wants. I pray you fail me not.

<speaker>BOTTOM</speaker>
We will meet, and there we may rehearse
most obscenely and courageously. Take pains. Be
perfit. Adieu.

<speaker>QUINCE</speaker>
At the Duke&rsquo;s Oak we meet.

<speaker>BOTTOM</speaker>
Enough. Hold or cut bowstrings.
[<i>They exit.</i>]

<b id="act-2" class="act-header">Act 2</b>
<b id="act-2-scene-1" class="scene-header">Scene 1</b>
<hr>
[<i>Enter a Fairy at one door and Robin Goodfellow at
another.</i>]

<speaker>ROBIN</speaker>
How now, spirit? Whither wander you?

<speaker>FAIRY</speaker>
	Over hill, over dale,
	   Thorough bush, thorough brier,
	Over park, over pale,
	   Thorough flood, thorough fire;
	I do wander everywhere,
	Swifter than the moon&rsquo;s sphere.
	And I serve the Fairy Queen,
	To dew her orbs upon the green.
	The cowslips tall her pensioners be;
	In their gold coats spots you see;
	Those be rubies, fairy favors;
	In those freckles live their savors.
I must go seek some dewdrops here
And hang a pearl in every cowslip&rsquo;s ear.
Farewell, thou lob of spirits. I&rsquo;ll be gone.
Our queen and all her elves come here anon.

<speaker>ROBIN</speaker>
The King doth keep his revels here tonight.
Take heed the Queen come not within his sight,
For Oberon is passing fell and wrath
Because that she, as her attendant, hath
A lovely boy stolen from an Indian king;
She never had so sweet a changeling.
And jealous Oberon would have the child
Knight of his train, to trace the forests wild.
But she perforce withholds the loved boy,
Crowns him with flowers and makes him all her
joy.
And now they never meet in grove or green,
By fountain clear or spangled starlight sheen,
But they do square, that all their elves for fear
Creep into acorn cups and hide them there.

<speaker>FAIRY</speaker>
Either I mistake your shape and making quite,
Or else you are that shrewd and knavish sprite
Called Robin Goodfellow. Are not you he
That frights the maidens of the villagery,
Skim milk, and sometimes labor in the quern
And bootless make the breathless huswife churn,
And sometime make the drink to bear no barm,
Mislead night wanderers, laughing at their harm?
Those that "&ldquo;Hobgoblin&rdquo; call you and "&ldquo;sweet Puck,&rdquo;
You do their work, and they shall have good luck.
Are not you he?

<speaker>ROBIN</speaker>
Thou speakest aright.
I am that merry wanderer of the night.
I jest to Oberon and make him smile
When I a fat and bean-fed horse beguile,
Neighing in likeness of a filly foal.
And sometime lurk I in a gossip&rsquo;s bowl
In very likeness of a roasted crab,
And, when she drinks, against her lips I bob
And on her withered dewlap pour the ale.
The wisest aunt, telling the saddest tale,
Sometime for three-foot stool mistaketh me;
Then slip I from her bum, down topples she
And "&ldquo;Tailor!&rdquo; cries and falls into a cough,
And then the whole choir hold their hips and loffe
And waxen in their mirth and neeze and swear
A merrier hour was never wasted there.
But room, fairy. Here comes Oberon.

<speaker>FAIRY</speaker>
And here my mistress. Would that he were gone!

[<i>Enter Oberon the King of Fairies at one door, with his
train, and Titania the Queen at another, with hers.</i>]

<speaker>OBERON</speaker>
Ill met by moonlight, proud Titania.

<speaker>TITANIA</speaker>
What, jealous Oberon? Fairies, skip hence.
I have forsworn his bed and company.

<speaker>OBERON</speaker>
Tarry, rash wanton. Am not I thy lord?

<speaker>TITANIA</speaker>
Then I must be thy lady. But I know
When thou hast stolen away from Fairyland
And in the shape of Corin sat all day
Playing on pipes of corn and versing love
To amorous Phillida. Why art thou here,
Come from the farthest steep of India,
But that, forsooth, the bouncing Amazon,
Your buskined mistress and your warrior love,
To Theseus must be wedded, and you come
To give their bed joy and prosperity?

<speaker>OBERON</speaker>
How canst thou thus for shame, Titania,
Glance at my credit with Hippolyta,
Knowing I know thy love to Theseus?
Didst not thou lead him through the glimmering
night
From Perigouna, whom he ravished,
And make him with fair Aegles break his faith,
With Ariadne and Antiopa?

<speaker>TITANIA</speaker>
These are the forgeries of jealousy;
And never, since the middle summer&rsquo;s spring,
Met we on hill, in dale, forest, or mead,
By paved fountain or by rushy brook,
Or in the beached margent of the sea,
To dance our ringlets to the whistling wind,
But with thy brawls thou hast disturbed our sport.
Therefore the winds, piping to us in vain,
As in revenge have sucked up from the sea
Contagious fogs, which, falling in the land,
Hath every pelting river made so proud
That they have overborne their continents.
The ox hath therefore stretched his yoke in vain,
The plowman lost his sweat, and the green corn
Hath rotted ere his youth attained a beard.
The fold stands empty in the drowned field,
And crows are fatted with the murrain flock.
The nine-men&rsquo;s-morris is filled up with mud,
And the quaint mazes in the wanton green,
For lack of tread, are undistinguishable.
The human mortals want their winter here.
No night is now with hymn or carol blessed.
Therefore the moon, the governess of floods,
Pale in her anger, washes all the air,
That rheumatic diseases do abound.
And thorough this distemperature we see
The seasons alter: hoary-headed frosts
Fall in the fresh lap of the crimson rose,
And on old Hiems&rsquo; thin and icy crown
An odorous chaplet of sweet summer buds
Is, as in mockery, set. The spring, the summer,
The childing autumn, angry winter, change
Their wonted liveries, and the mazed world
By their increase now knows not which is which.
And this same progeny of evils comes
From our debate, from our dissension;
We are their parents and original.

<speaker>OBERON</speaker>
Do you amend it, then. It lies in you.
Why should Titania cross her Oberon?
I do but beg a little changeling boy
To be my henchman.

<speaker>TITANIA</speaker>
Set your heart at rest:
The Fairyland buys not the child of me.
His mother was a vot&rsquo;ress of my order,
And in the spiced Indian air by night
Full often hath she gossiped by my side
And sat with me on Neptune&rsquo;s yellow sands,
Marking th&rsquo; embarked traders on the flood,
When we have laughed to see the sails conceive
And grow big-bellied with the wanton wind;
Which she, with pretty and with swimming gait,
Following (her womb then rich with my young
squire),
Would imitate and sail upon the land
To fetch me trifles and return again,
As from a voyage, rich with merchandise.
But she, being mortal, of that boy did die,
And for her sake do I rear up her boy,
And for her sake I will not part with him.

<speaker>OBERON</speaker>
How long within this wood intend you stay?

<speaker>TITANIA</speaker>
Perchance till after Theseus&rsquo; wedding day.
If you will patiently dance in our round
And see our moonlight revels, go with us.
If not, shun me, and I will spare your haunts.

<speaker>OBERON</speaker>
Give me that boy and I will go with thee.

<speaker>TITANIA</speaker>
Not for thy fairy kingdom. Fairies, away.
We shall chide downright if I longer stay.
[<i>Titania and her fairies exit.</i>]

<speaker>OBERON</speaker>
Well, go thy way. Thou shalt not from this grove
Till I torment thee for this injury.&mdash;
My gentle Puck, come hither. Thou rememb&rsquo;rest
Since once I sat upon a promontory
And heard a mermaid on a dolphin&rsquo;s back
Uttering such dulcet and harmonious breath
That the rude sea grew civil at her song
And certain stars shot madly from their spheres
To hear the sea-maid&rsquo;s music.

<speaker>ROBIN</speaker>
I remember.

<speaker>OBERON</speaker>
That very time I saw (but thou couldst not),
Flying between the cold moon and the Earth,
Cupid all armed. A certain aim he took
At a fair vestal throned by the west,
And loosed his love-shaft smartly from his bow
As it should pierce a hundred thousand hearts.
But I might see young Cupid&rsquo;s fiery shaft
Quenched in the chaste beams of the wat&rsquo;ry moon,
And the imperial vot&rsquo;ress passed on
In maiden meditation, fancy-free.
Yet marked I where the bolt of Cupid fell.
It fell upon a little western flower,
Before, milk-white, now purple with love&rsquo;s wound,
And maidens call it "&ldquo;love-in-idleness.&rdquo;
Fetch me that flower; the herb I showed thee once.
The juice of it on sleeping eyelids laid
Will make or man or woman madly dote
Upon the next live creature that it sees.
Fetch me this herb, and be thou here again
Ere the leviathan can swim a league.

<speaker>ROBIN</speaker>
I&rsquo;ll put a girdle round about the Earth
In forty minutes.	[<i>He exits.</i>]

<speaker>OBERON</speaker>
Having once this juice,
I&rsquo;ll watch Titania when she is asleep
And drop the liquor of it in her eyes.
The next thing then she, waking, looks upon
(Be it on lion, bear, or wolf, or bull,
On meddling monkey, or on busy ape)
She shall pursue it with the soul of love.
And ere I take this charm from off her sight
(As I can take it with another herb),
I&rsquo;ll make her render up her page to me.
But who comes here? I am invisible,
And I will overhear their conference.

[<i>Enter Demetrius, Helena following him.</i>]

<speaker>DEMETRIUS</speaker>
I love thee not; therefore pursue me not.
Where is Lysander and fair Hermia?
The one I&rsquo;ll stay; the other stayeth me.
Thou told&rsquo;st me they were stol&rsquo;n unto this wood,
And here am I, and wood within this wood
Because I cannot meet my Hermia.
Hence, get thee gone, and follow me no more.

<speaker>HELENA</speaker>
You draw me, you hard-hearted adamant!
But yet you draw not iron, for my heart
Is true as steel. Leave you your power to draw,
And I shall have no power to follow you.

<speaker>DEMETRIUS</speaker>
Do I entice you? Do I speak you fair?
Or rather do I not in plainest truth
Tell you I do not, nor I cannot love you?

<speaker>HELENA</speaker>
And even for that do I love you the more.
I am your spaniel, and, Demetrius,
The more you beat me I will fawn on you.
Use me but as your spaniel: spurn me, strike me,
Neglect me, lose me; only give me leave
(Unworthy as I am) to follow you.
What worser place can I beg in your love
(And yet a place of high respect with me)
Than to be used as you use your dog?

<speaker>DEMETRIUS</speaker>
Tempt not too much the hatred of my spirit,
For I am sick when I do look on thee.

<speaker>HELENA</speaker>
And I am sick when I look not on you.

<speaker>DEMETRIUS</speaker>
You do impeach your modesty too much
To leave the city and commit yourself
Into the hands of one that loves you not,
To trust the opportunity of night
And the ill counsel of a desert place
With the rich worth of your virginity.

<speaker>HELENA</speaker>
Your virtue is my privilege. For that
It is not night when I do see your face,
Therefore I think I am not in the night.
Nor doth this wood lack worlds of company,
For you, in my respect, are all the world.
Then, how can it be said I am alone
When all the world is here to look on me?

<speaker>DEMETRIUS</speaker>
I&rsquo;ll run from thee and hide me in the brakes
And leave thee to the mercy of wild beasts.

<speaker>HELENA</speaker>
The wildest hath not such a heart as you.
Run when you will. The story shall be changed:
Apollo flies and Daphne holds the chase;
The dove pursues the griffin; the mild hind
Makes speed to catch the tiger. Bootless speed
When cowardice pursues and valor flies!

<speaker>DEMETRIUS</speaker>
I will not stay thy questions. Let me go,
Or if thou follow me, do not believe
But I shall do thee mischief in the wood.

<speaker>HELENA</speaker>
Ay, in the temple, in the town, the field,
You do me mischief. Fie, Demetrius!
Your wrongs do set a scandal on my sex.
We cannot fight for love as men may do.
We should be wooed and were not made to woo.
[<i>Demetrius exits.</i>]
I&rsquo;ll follow thee and make a heaven of hell
To die upon the hand I love so well.	[<i>Helena exits.</i>]

<speaker>OBERON</speaker>
Fare thee well, nymph. Ere he do leave this grove,
Thou shalt fly him, and he shall seek thy love.

[<i>Enter Robin.</i>]

Hast thou the flower there? Welcome, wanderer.

<speaker>ROBIN</speaker>
Ay, there it is.

<speaker>OBERON</speaker>
I pray thee give it me.
[<i>Robin gives him the flower.</i>]
I know a bank where the wild thyme blows,
Where oxlips and the nodding violet grows,
Quite overcanopied with luscious woodbine,
With sweet muskroses, and with eglantine.
There sleeps Titania sometime of the night,
Lulled in these flowers with dances and delight.
And there the snake throws her enameled skin,
Weed wide enough to wrap a fairy in.
And with the juice of this I&rsquo;ll streak her eyes
And make her full of hateful fantasies.
Take thou some of it, and seek through this grove.
[<i>He gives Robin part of the flower.</i>]
A sweet Athenian lady is in love
With a disdainful youth. Anoint his eyes,
But do it when the next thing he espies
May be the lady. Thou shalt know the man
By the Athenian garments he hath on.
Effect it with some care, that he may prove
More fond on her than she upon her love.
And look thou meet me ere the first cock crow.

<speaker>ROBIN</speaker>
Fear not, my lord. Your servant shall do so.
[<i>They exit.</i>]

<b id="act-2-scene-2" class="scene-header">Scene 2</b>
<hr>
[<i>Enter Titania, Queen of Fairies, with her train.</i>]

<speaker>TITANIA</speaker>
Come, now a roundel and a fairy song;
Then, for the third part of a minute, hence&mdash;
Some to kill cankers in the muskrose buds,
Some war with reremice for their leathern wings
To make my small elves coats, and some keep back
The clamorous owl that nightly hoots and wonders
At our quaint spirits. Sing me now asleep.
Then to your offices and let me rest.	[<i>She lies down.</i>]

[<i>Fairies sing.</i>]

<speaker>FIRST FAIRY</speaker>
	You spotted snakes with double tongue,
	   Thorny hedgehogs, be not seen.
	Newts and blindworms, do no wrong,
	   Come not near our Fairy Queen.

<speaker>CHORUS</speaker>
	   Philomel, with melody
	   Sing in our sweet lullaby.
	Lulla, lulla, lullaby, lulla, lulla, lullaby.
	   Never harm
	   Nor spell nor charm
	Come our lovely lady nigh.
	So good night, with lullaby.

<speaker>FIRST FAIRY</speaker>
	Weaving spiders, come not here.
	   Hence, you long-legged spinners, hence.
	Beetles black, approach not near.
	   Worm nor snail, do no offence.

<speaker>CHORUS</speaker>
	   Philomel, with melody
	   Sing in our sweet lullaby.
	Lulla, lulla, lullaby, lulla, lulla, lullaby.
	   Never harm
	   Nor spell nor charm
	Come our lovely lady nigh.
	So good night, with lullaby.
[<i>Titania sleeps.</i>]

<speaker>SECOND FAIRY</speaker>
Hence, away! Now all is well.
One aloof stand sentinel.	[<i> Fairies exit.</i>]

[<i>Enter Oberon, who anoints Titania&rsquo;s eyelids with the
nectar.</i>]

<speaker>OBERON</speaker>
	What thou seest when thou dost wake
	Do it for thy true love take.
	Love and languish for his sake.
	Be it ounce, or cat, or bear,
	Pard, or boar with bristled hair,
	In thy eye that shall appear
	When thou wak&rsquo;st, it is thy dear.
	Wake when some vile thing is near.	[<i>He exits.</i>]

[<i>Enter Lysander and Hermia.</i>]

<speaker>LYSANDER</speaker>
Fair love, you faint with wand&rsquo;ring in the wood.
   And, to speak troth, I have forgot our way.
We&rsquo;ll rest us, Hermia, if you think it good,
   And tarry for the comfort of the day.

<speaker>HERMIA</speaker>
Be it so, Lysander. Find you out a bed,
For I upon this bank will rest my head.

<speaker>LYSANDER</speaker>
One turf shall serve as pillow for us both;
One heart, one bed, two bosoms, and one troth.

<speaker>HERMIA</speaker>
Nay, good Lysander. For my sake, my dear,
Lie further off yet. Do not lie so near.

<speaker>LYSANDER</speaker>
O, take the sense, sweet, of my innocence!
Love takes the meaning in love&rsquo;s conference.
I mean that my heart unto yours is knit,
So that but one heart we can make of it;
Two bosoms interchained with an oath&mdash;
So then two bosoms and a single troth.
Then by your side no bed-room me deny,
For lying so, Hermia, I do not lie.

<speaker>HERMIA</speaker>
Lysander riddles very prettily.
Now much beshrew my manners and my pride
If Hermia meant to say Lysander lied.
But, gentle friend, for love and courtesy,
Lie further off in human modesty.
Such separation, as may well be said,
Becomes a virtuous bachelor and a maid.
So far be distant; and good night, sweet friend.
Thy love ne&rsquo;er alter till thy sweet life end!

<speaker>LYSANDER</speaker>
"&ldquo;Amen, amen&rdquo; to that fair prayer, say I,
And then end life when I end loyalty!
Here is my bed. Sleep give thee all his rest!

<speaker>HERMIA</speaker>
With half that wish the wisher&rsquo;s eyes be pressed!
[<i>They sleep.</i>]

[<i>Enter Robin.</i>]

<speaker>ROBIN</speaker>
	Through the forest have I gone,
	But Athenian found I none
	On whose eyes I might approve
	This flower&rsquo;s force in stirring love.
[<i>He sees Lysander.</i>]
	Night and silence! Who is here?
	Weeds of Athens he doth wear.
	This is he my master said
	Despised the Athenian maid.
	And here the maiden, sleeping sound
	On the dank and dirty ground.
	Pretty soul, she durst not lie
	Near this lack-love, this kill-courtesy.&mdash;
	Churl, upon thy eyes I throw
	All the power this charm doth owe.
[<i>He anoints Lysander&rsquo;s eyelids
with the nectar.</i>]
	When thou wak&rsquo;st, let love forbid
	Sleep his seat on thy eyelid.
	So, awake when I am gone,
	For I must now to Oberon.	[<i>He exits.</i>]

[<i>Enter Demetrius and Helena, running.</i>]

<speaker>HELENA</speaker>
Stay, though thou kill me, sweet Demetrius.

<speaker>DEMETRIUS</speaker>
I charge thee, hence, and do not haunt me thus.

<speaker>HELENA</speaker>
O, wilt thou darkling leave me? Do not so.

<speaker>DEMETRIUS</speaker>
Stay, on thy peril. I alone will go.	[<i>Demetrius exits.</i>]

<speaker>HELENA</speaker>
O, I am out of breath in this fond chase.
The more my prayer, the lesser is my grace.
Happy is Hermia, wheresoe&rsquo;er she lies,
For she hath blessed and attractive eyes.
How came her eyes so bright? Not with salt tears.
If so, my eyes are oftener washed than hers.
No, no, I am as ugly as a bear,
For beasts that meet me run away for fear.
Therefore no marvel though Demetrius
Do as a monster fly my presence thus.
What wicked and dissembling glass of mine
Made me compare with Hermia&rsquo;s sphery eyne?
But who is here? Lysander, on the ground!
Dead or asleep? I see no blood, no wound.&mdash;
Lysander, if you live, good sir, awake.

<speaker>LYSANDER</speaker>
[<i>waking up</i>]
And run through fire I will for thy sweet sake.
Transparent Helena! Nature shows art,
That through thy bosom makes me see thy heart.
Where is Demetrius? O, how fit a word
Is that vile name to perish on my sword!

<speaker>HELENA</speaker>
Do not say so. Lysander, say not so.
What though he love your Hermia? Lord, what
though?
Yet Hermia still loves you. Then be content.

<speaker>LYSANDER</speaker>
Content with Hermia? No, I do repent
The tedious minutes I with her have spent.
Not Hermia, but Helena I love.
Who will not change a raven for a dove?
The will of man is by his reason swayed,
And reason says you are the worthier maid.
Things growing are not ripe until their season;
So I, being young, till now ripe not to reason.
And touching now the point of human skill,
Reason becomes the marshal to my will
And leads me to your eyes, where I o&rsquo;erlook
Love&rsquo;s stories written in love&rsquo;s richest book.

<speaker>HELENA</speaker>
Wherefore was I to this keen mockery born?
When at your hands did I deserve this scorn?
Is &rsquo;t not enough, is &rsquo;t not enough, young man,
That I did never, no, nor never can
Deserve a sweet look from Demetrius&rsquo; eye,
But you must flout my insufficiency?
Good troth, you do me wrong, good sooth, you do,
In such disdainful manner me to woo.
But fare you well. Perforce I must confess
I thought you lord of more true gentleness.
O, that a lady of one man refused
Should of another therefore be abused!	[<i>She exits.</i>]

<speaker>LYSANDER</speaker>
She sees not Hermia.&mdash;Hermia, sleep thou there,
And never mayst thou come Lysander near.
For, as a surfeit of the sweetest things
The deepest loathing to the stomach brings,
Or as the heresies that men do leave
Are hated most of those they did deceive,
So thou, my surfeit and my heresy,
Of all be hated, but the most of me!
And, all my powers, address your love and might
To honor Helen and to be her knight.	[<i>He exits.</i>]

<speaker>HERMIA</speaker>
[<i>waking up</i>]
Help me, Lysander, help me! Do thy best
To pluck this crawling serpent from my breast.
Ay me, for pity! What a dream was here!
Lysander, look how I do quake with fear.
Methought a serpent ate my heart away,
And you sat smiling at his cruel prey.
Lysander! What, removed? Lysander, lord!
What, out of hearing? Gone? No sound, no word?
Alack, where are you? Speak, an if you hear.
Speak, of all loves! I swoon almost with fear.&mdash;
No? Then I well perceive you are not nigh.
Either death or you I&rsquo;ll find immediately.
[<i>She exits.</i>]

<b id="act-3" class="act-header">Act 3</b>
<b id="act-3-scene-1" class="scene-header">Scene 1</b>
<hr>
[<i>With Titania still asleep onstage, enter the Clowns,
Bottom, Quince, Snout, Starveling, Snug, and Flute.</i>]

<speaker>BOTTOM</speaker>
Are we all met?

<speaker>QUINCE</speaker>
Pat, pat. And here&rsquo;s a marvels convenient
place for our rehearsal. This green plot shall be
our stage, this hawthorn brake our tiring-house,
and we will do it in action as we will do it before
the Duke.

<speaker>BOTTOM</speaker>
Peter Quince?

<speaker>QUINCE</speaker>
What sayest thou, bully Bottom?

<speaker>BOTTOM</speaker>
There are things in this comedy of Pyramus
and Thisbe that will never please. First, Pyramus
must draw a sword to kill himself, which the ladies
cannot abide. How answer you that?

<speaker>SNOUT</speaker>
By &rsquo;r lakin, a parlous fear.

<speaker>STARVELING</speaker>
I believe we must leave the killing out,
when all is done.

<speaker>BOTTOM</speaker>
Not a whit! I have a device to make all well.
Write me a prologue, and let the prologue seem to
say we will do no harm with our swords and that
Pyramus is not killed indeed. And, for the more
better assurance, tell them that I, Pyramus, am not
Pyramus, but Bottom the weaver. This will put them
out of fear.

<speaker>QUINCE</speaker>
Well, we will have such a prologue, and it shall
be written in eight and six.`;

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
        // Preserve empty lines by pushing them directly
        if (!line.trim()) {
            processedLines.push('\n');
            continue;
        }

        if (line.includes('class="act-header"')) {
            processedLines.push(`${line}\n`);  // Act header with newline
            continue;
        }

        if (line.includes('class="scene-header"')) {
            currentLineNumber = 0;
            inScene = true;
            processedLines.push(`${line}\n`);  // Scene header with newline
            continue;
        }
        
        if (line.includes('<hr>') ||
            line.trim().startsWith('[') ||
            line.includes('<speaker>')) {
            processedLines.push(line + '\n');
            continue;
        }
        
        // Check for character name with dialogue pattern (NAME  dialogue)
        const speakerMatch = line.match(/^([A-Z][A-Z\s]+?)  (.*)/);
        if (speakerMatch) {
            const [_, speaker, dialogue] = speakerMatch;
            processedLines.push(`<speaker>${speaker.trim()}</speaker>\n${dialogue}\n`);
            continue;
        }
        
        // Check for standalone character names
        if (line.trim().toUpperCase() === line.trim() && line.trim().length > 0 && !line.includes('<')) {
            processedLines.push(`<speaker>${line.trim()}</speaker>\n`);
            continue;
        }
        
        if (inScene && line.trim()) {
            currentLineNumber++;
            const lineClass = currentLineNumber % 5 === 0 ? 'numbered' : '';
            processedLines.push(`<div class="play-line ${lineClass}">${line}</div>`);
        } else {
            processedLines.push(line);
        }
    }
    
    return processedLines.join('');
}
