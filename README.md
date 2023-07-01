# Word Games

A collection of word games.

**Players:** 1

**Time:** 5 minutes

[Play Now!](https://skedwards88.github.io/word_games/)

<img src="src/images/icon_512.png" alt="game icon" width="70"/>

Do you have feedback or ideas for improvement? [Open an issue](https://github.com/skedwards88/word_games/issues/new).

Want more games? Visit [SECT Games](https://skedwards88.github.io/).

## Development

To build, run `npm run build`.

To run locally with live reloading and no service worker, run `npm run dev`. (If a service worker was previously registered, you can unregister it in chrome developer tools: `Application` > `Service workers` > `Unregister`.)

To run locally and register the service worker, run `npm start`.

To deploy, push to `main` or manually trigger the GitHub Actions `deploy.yml` workflow.

The word lists are from https://github.com/skedwards88/word_lists/pkgs/npm/word_lists. To modify the word lists, make changes in https://github.com/skedwards88/word_lists and create a new version of the package. Then, import the new version to this project (`npm install @skedwards88/word_lists@VERSION_NUMBER`).
