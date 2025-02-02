# Shakespeare
The [https://shakespeare.pizza](https://shakespeare.pizza) AI Shakespeare Tutor in the Browser

### Current Version
<!-- VERSION -->1.0.1<!-- /VERSION -->

### what is this?
1. i always wanted an epub reading companion where i could use an LLM to interrogate the text live
2. easiest to start with shakespeare, known formats, and a pick-a-play format, rather than an upload-your-own

### TODO
- should tie in a line-by-line reference, o3-mini is not quite good enough. see e.g. https://myshakespeare.com/midsummer-nights-dream/act-1-scene-1-popup-note-index-item-i-wooed-thee
- fix www.shakespeare.pizza DNS
- return shakespeare head to original position during rotation
- maybe bother with more correctly enumerating stage directions: https://internetshakespeare.uvic.ca/Foyer/guidelines/lineation/index.html#:~:text=Stage%20directions%20should%20be%20assigned,who%20a%20speaker%20is%20addressing).
- Go through all the character files and fix the formatting.. what we have is not ideal
- make line breaks more clear, indent slightly when a line is broken
- some of these line transcriptions are just wrong. e.g. in my textfile download, "Crowns him with flowers and makes him all her joy."  is listed as two verses, but it's actually one if you look at https://www.folger.edu/explore/shakespeares-works/a-midsummer-nights-dream/read/
- think about weirdly indented lines, like when they're singing in a midsummer night's dream


### Characters
The text sources are not quite satisfactory, pulled the formatting from Folger sites like https://www.folger.edu/explore/shakespeares-works/coriolanus/read/characterList/

### Text Sources
All the Shakespeare plays in `plays/` are from https://github.com/cobanov/shakespeare-dataset. That repository itself appears to be sourced from the Folger Shakespeare Library.
