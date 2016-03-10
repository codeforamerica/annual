openarchcollab.org
=======

This repository holds the code that powers the Open Architecture Collaborative website at http://www.openarchcollab.org. This website is built by pulling data out of a Google Sheet.

# What it's built on

This website is built using the following technologies:
* **Node** - To download and cache the Google Sheet data, and to build our pages and serve our HTML
* **Express** - For routing, and render dynamic data server-side
* **SASS** - To process SCSS and build our CSS

# Deploy it locally

**Core dependencies:**
* [Node 0.10.x](https://github.com/codeforamerica/howto/blob/master/Node.js.md)
* Express 2.5.3

To install it for the first time:

```
$ git clone https://github.com/gjacobs86/openarchcollab.org.git
$ cd openarchcollab.org
$ npm install
$ node app.js
```

Then open your web browser of choice and head over to [http://localhost:3000](http://localhost:3000/).

To build your SASS into CSS while you develop:

```
$ grunt
```

To package your SASS for distribution (minify/remove .map):

```
$ grunt dist
```

To start pulling from a different Google Sheet, you'll need to edit `getData.js` and change the Google Sheet URL.
