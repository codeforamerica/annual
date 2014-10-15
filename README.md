Code for Münster Homepage at [codeformuenster.org](http://www.codeformuenster.org).

Install
-------

This site is build using jekyll.

    sudo gem install jekyll
    sudo gem install rdiscount

Change Stylesheets
------------------

Compile the SASS code manually:

    compass compile

Add the "watch" parameter to automatically recompile after saving a file:

    compass watch

Run
---

Compiles the page after saving a code change:

    jekyll serve --watch

The website is now available at http://localhost:3000