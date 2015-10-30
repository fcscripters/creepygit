[![Code Climate](https://codeclimate.com/github/fcscripters/creepygit/badges/gpa.svg)](https://codeclimate.com/github/fcscripters/creepygit)
[![Build Status](https://travis-ci.org/fcscripters/creepygit.svg)](https://travis-ci.org/fcscripters/creepygit)

# Git Hub Followers Visualisation 'Creepy Git'

to view our app please visit [here](https://pure-reef-8732.herokuapp.com/)

## What?

A visualisation of followers/followed on Github.A user will be able to authenticate their session and see a visual display of if they are follwoing somone and that user is not following them back and vice a versa. The final hurrah of the mighty fcscripters.

To build this app we have used the Git hub API to authenticate and require followers/following data for the current user. 
The data is then sorted and displayed using the D3 Force layout. 

## Who?

User of Github who would like to build their network and improve the visibility and therefore reuse of their repos.

## How to run


### To run locally

Clone this repo and install modules ``` npm install ```

Then run the server. 

node server.js
```
ONCE YOU HAVE AUTHENTICATED THROUGH GIT HUB, GO BACK TO LOCALHOST:8000 IN YOUR BROWSER, AND YOU WILL SEE YOUR FOLLOWERS MAP.

Router

We are using the router outlined in last week's morning challenge, this uses the 'routes' module details of the method can be found. 

https://github.com/foundersandcoders/morning-challenge/tree/master/routerChallenge

This involves two files: server.js, router.js and handler.js

## Categories of Followers

Green - Follow each other

Red - Not following you

Black - Not following them

## Dev Dependencies

Shot
Tape
Istanbul
Qunit


Front-end tests will be achieved using Qunit

## Dependencies
D3 
routes

## Recommended Reading

##Contributors

Gethin, Sohil, Conor, Tormod
