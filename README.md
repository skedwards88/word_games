# Word Games

A collection of word games.

**Intended for mobile only; does not work on desktop.**

**Players:** 1

**Time:** 5 minutes

[Play Now!](https://skedwards88.github.io/word_games/)

<img src="src/images/icon_512.png" alt="game icon" width="70"/>

Do you have feedback or ideas for improvement? [Open an issue](https://github.com/skedwards88/word_games/issues/new).

Want more games? Visit [CnS Games](https://skedwards88.github.io/portfolio/).

## Development

To run locally with live reloading and no service worker, run `npm run dev`. (If a service worker was previously registered, you can unregister it in chrome developer tools `Application` > `Service workers` > `Unregister`.)

To run locally and register the service worker, run `npm start`.

For information about the word lists, see `src/common/wordLists/README.md`. To add a word to "easy mode", add the word to `src/common/wordLists/compiled/notActuallyUncommon.txt`. To exclude a word from easy mode, add the word to `src/common/wordLists/compiled/notActuallyCommon.txt`.
