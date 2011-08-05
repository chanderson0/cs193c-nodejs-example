Directions
---------

1. Get node and npm working

        curl http://nodejs.org/dist/node-v0.4.7.tar.gz | tar xvz
        cd node-v0.4.7
        ./configure
        make
        sudo make install
        curl http://npmjs.org/install.sh | sudo sh

2. Navigate to your tutorial directory, then run:

        node simple.js

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

1. First, sign up for Heroku.
2. Get the heroku gem running on your machine

        gem install heroku

3. Now, we have to get everything setup with Git. 
   This is complicated, so don't worry if this is not obvious.
   Follow this guide until step 3: http://help.github.com/mac-set-up-git/

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
