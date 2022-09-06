# Showlist / Movie Guide

![Logo](public/assests/best-buds-logo.png) Watch List

Description of project

Users can easily keep track of what Tv shows & movies are next on their must see list with Watch List! 

Full Website: https://showstocker.herokuapp.com/

![Screen shot](public/assests/movies.PNG)

## How It's Made:

**Tech used:** HTML, EJS, CSS, JavaScript, NodeJS, Mongodb

This is a fullstack web app running on NodeJS and Mongodb. Each show is stored as an individual object inside of a database, which can then be retrieved via the server's own web API. The front-end of the application uses EJS to dynamically render show data that the user retrieves. 

# How It's Made

Search:
As a user types into the search box, a call is made to the TMDB API which returns page 1 (up to 20 titles) results. These are loaded into the drop down menu for the user to select from. The lists updates with each key press. A check was added to catch the user submitting an answer not in the API.

Top Lists: 
Users are presented with a list of the shows most recommended by other users. Upon refresh, the database is searched, the recommendations tallied, and the top list displayed. The list is created by filtering by 'recommended' and 'watched' features from the Movie model. 


# Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install` 

---

# Things to add

- Create a `.env` file and add the following as `key: value` 
  - PORT: 2121 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 
 ---

## Optimizations



## Lessons Learned:



## Future Updates:
Additional features:

- Where to watch? Once a user knows what they want to see, the next important question is always, 'Where can I watch it?' A feature can be added to the show cards that displays the info on where each show can be found. This would involve an API call & some additional CSS

- Least Watched, Most Watched, Similar shows, etc Helpful lists can be generated from user feed back to assist users in discovering new content and each would have a button allowing users to quickly add the title to their personal list



