2014 Annual Report
=======

This branch holds the code that powers the 2014 Code for America Annual Report. This is in **alpha development phase**. We will be breaking things frequently.

This version pulls all data out of a Google Sheet and builds it into HTML.

# Past annual reports

We built our annual report differently in the past. To see or use that code, you can check out these branches:

* [`2013-report`](https://github.com/codeforamerica/annual/tree/2013-report)
* [`2012-report`](https://github.com/codeforamerica/annual/tree/2013-report)

# What it's built on

This is currently built using the following technologies:
* **Jekyll** - To generate the site, put some data into partials, and serve it up on Github Pages
* **Backbone** - Pulls the data out of our Google Sheet and turns it into HTML (currently does this in the browser)
* **Google Sheets** - Acts as our backend, holds all of our content

# Deploy it locally

**Dependencies:**
* >= Ruby 1.9.3
* Jekyll 2.5.3

```
git clone https://github.com/codeforamerica/annual.git
cd annual
gem install jekyll
jekyll serve --watch
```

Then open your web browser of choice and head over to the url printed that's printed out.