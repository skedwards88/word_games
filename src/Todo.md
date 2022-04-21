local storage:

- elapsed time
- found words
- letters

precommit hooks

linters run

tests
enums

multiplayer play
errors/error boundaries
works on desktop too

Other word games:

Interword: Make cross word, but only show letters at intersections. player needs to fill in remaining letters. Any known word that matches intersection letters works. Alternative: instead of showing grid spaces to fill, just show number of letters/blanks in that row like nonagrams.

? would it be more efficient to store known words as text file and read in?

have script to generate trie and store in json file. run this as part of build, before bundling. then have the game code just read the json file. this should make it so that the initial word list isn't bundled.

updates:

- easy mode knows more words
- fewer "s"s
- word count instead of letter count, counts down
- easy mode shows bonus vs known
