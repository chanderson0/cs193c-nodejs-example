NodeJS + Express Example for CS193C
==================

This is a quick example set up for Stanford's CS193C during Summer 2011 to demo how to use NodeJS, with supplemental files for getting this running on Heroku. It's intended to get people up to speed very quickly, so it sacrifices breadth for brevity.

Layout
------

- `simple.js` is a very simple example that doesn't depend on any other files. It uses just express, without any templates.
- `complex.js` is a more complicated example that includes rendering templates and accepting POST requests, as well as serving static files. Depends on:
    
    - `/public` contains a `css` directory that contains the static CSS files that are served to style the pages found in...
    - `/views` contains [EJS](http://embeddedjs.com/ "EmbeddedJS") templates. `layout.ejs` is rendered for every page, and subpages replace the `<%- body %>` element. Each other *.ejs file contains a template that can be rendered. 

- `package.json` defines the packages that we want to use with node to serve the website. That's Express and EmbeddedJS.
- `Procfile` is used on Heroku to define what we want to run. It's set right now to run the complex example.

Directions
----------

1. Get node and npm working

        curl http://nodejs.org/dist/node-v0.4.7.tar.gz | tar xvz
        cd node-v0.4.7
        ./configure
        make
        sudo make install       # you'll have to enter your password
        curl http://npmjs.org/install.sh | sudo sh

2. Navigate to your tutorial directory, then run:

        npm install      # installs needed packages
        node simple.js   # runs webserver

3. Try these urls:

    - http://localhost:3000/
    - http://localhost:3000/hello?name=Sally
    - http://localhost:3000/greetings/John

4. Now, quit that process and load up the complex example.

        node complex.js

5. Try these urls:

    - http://localhost:3000/

Using Heroku
------------

1. First, sign up for [Heroku](http://heroku.com/ "Heroku").

2. Get the heroku gem running on your machine

        gem install heroku

3. Now, we have to get everything setup with Git. This is complicated, so don't worry if this is not obvious. Follow this guide until step 3: http://help.github.com/mac-set-up-git/

4. Get heroku working with the keys you just generated:

        heroku keys:add

5. Create a git repo for all this stuff (inside the tutorial directory):

        git init
        git add .
        git commit -m "initial commit"

6. Create a heroku app, and push our stuff to it

        heroku create --stack cedar
        git push herkou master

7. If everything went well, you should be able to do `heroku open` and see your app!
