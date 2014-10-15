Code for Münster Homepage at [codeformuenster.org](http://www.codeformuenster.org).

## Install & run using Docker

(These instructions are for Linux. On OSX/Windows, Docker has to be installed
differently.)

* Install [Docker](https://docs.docker.com/installation/#installation) and [Fig](http://www.fig.sh/).
* Then run: `sudo fig up`

The website is now available at [http://localhost:4000](http://localhost:4000). Posts and stylesheets will automatically be recompiled on change.

## Non-Docker Install

This site is build using jekyll.

    sudo gem install jekyll
    sudo gem install rdiscount

### Change Stylesheets

Compile the SASS code manually:

    compass compile

Add the "watch" parameter to automatically recompile after saving a file:

    compass watch

### Run

Compiles the page after saving a code change:

    jekyll serve --watch

The website is now available at http://localhost:3000
