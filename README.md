### Bookmark Spotlight

An incredibly fast way to search through your bookmarks and bookmark folders in Chrome.  It's like OSX Spotlight, but for Chrome Bookmarks.

To use the extension, press `Cmd + Shift + Space` and search for the bookmark.

### Installation

Since this is unfinished, it is not yet on the Chrome app store.  However, if you're eager to use the tool, you can use it by manually loading it.  To use this extension:
- Clone the source
- Run `npm install && gulp` (you'll need [Node](https://nodejs.org/en/) and [Gulp](http://gulpjs.com/) to build this locally)
- In Chrome, go to [chrome://extensions/](chrome://extensions/) and select "Developer Mode"
  - Click "Load Unpacked Extension..."
  - Load the extension by selecting the `dist` directory (which should have been built from running `gulp`)

### Misc
There's still a lot of work to be done.  If you have any suggestions, feel free to open an issue.  If you'd like to contribute, follow the Installation steps for ways to build.  There's also a `gulp watch` task which will watch for Javascript changes so you don't have to rebuild every time.

### License

MIT -- Project by [Jonny Krysh](https://github.com/jonnykry)
