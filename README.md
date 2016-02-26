OAC staging: http://tranquil-peak-49895.herokuapp.com/


2014 Annual Report
=======

This branch holds the code that powers the 2014 Code for America Annual Report. This is in **alpha development phase**. We will be breaking things frequently. Don't fork this unless you want to have bad stuff happen.

This version pulls all data out of a Google Sheet and builds it into HTML.

* Check out the report at this link: [2014.codeforamerica.org](http://2014.codeforamerica.org)
* Check out the Google Sheet that serves it [at this link](https://docs.google.com/a/codeforamerica.org/spreadsheets/d/1UTmofeY8rPZvXdN_CNJXfFgPlexiMmlSs5W8oPhqFko/edit#gid=179182240).

# Past annual reports

We built our annual report differently in the past. To see old versions of the report source code, you can visit these tags:

* [`2013`](https://github.com/codeforamerica/annual/releases/tag/2013)
* [`2012`](https://github.com/codeforamerica/annual/releases/tag/2012)

# What it's built on

This is currently built using the following technologies:
* **Node** - To download and cache the Google Sheet data, and to build our pages and serve our HTML
* **Express** - For routing, and render dynamic data server-side
* **SASS** - To process SCSS and build our CSS

# Deploy it locally

**Core dependencies:**
* [Node 0.10.x](https://github.com/codeforamerica/howto/blob/master/Node.js.md)
* Express 2.5.3

```
git clone https://github.com/codeforamerica/annual.git
cd annual
npm install
node app.js
```

Then open your web browser of choice and head over to [http://localhost:3000](http://localhost:3000/).

To start pulling from a different Google Sheet, you'll need to edit `getData.js` and change the Google Sheet URL. More to come on this later.

# In the future

* Create a way to "make your own story" - submit your own story card
* Create a super simple path to Fork this, copy the Google Sheet, and start generating your own Annual Report
