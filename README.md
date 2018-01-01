# Idea-Box
![hound status](https://img.shields.io/badge/Protected%20by-Hound-green.svg) [![Build Status](https://travis-ci.org/Mcdavid95/Idea-Box.svg?branch=development)](https://travis-ci.org/Mcdavid95/Idea-Box) [![Coverage Status](https://coveralls.io/repos/github/Mcdavid95/Idea-Box/badge.svg?branch=development)](https://coveralls.io/github/Mcdavid95/Idea-Box?branch=development)
[![Code Climate](https://codeclimate.com/github/Mcdavid95/Idea-Box/badges/gpa.svg)](https://codeclimate.com/github/Mcdavid95/bc-los-24-postit) [![Issue Count](https://codeclimate.com/github/Mcdavid95/Idea-Box/badges/issue_count.svg)](https://codeclimate.com/github/Mcdavid95/Idea-Box) 
- https://ideaPack.herokuapp.com/

## Description
Ideabox is a simple application that allows users to create a pool of ideas and promote collaboration.
##  Features
* User Registration and Login pages
* User should create new Ideas
* User should edit Ideas
* User can make Ideas either public or private
* Users can comment on public Ideas
* Reset passsword
* Share public Ideas on Twitter
* Use MarkDown
* Filter Ideas by Category


## Tecnologies Used
#### API
* JavaScript(Node) - API
* MongoDB - for data persistency
#### Frontend
* JavaScript(REACT-REDUX) - Frontend
* HTML and SCSS - Front-end Display

## Dependencies

The functionality of this web app being a node.js app depends on the following technologies.

[**Express.js**](https://expressjs.com/): A Fast, opinionated, minimalist web framework for node which was used in routing this application.

[**BodyParser**](https://babeljs.io/): This module was used to collect search data sent from the client side to the routing page.   
[**Babel**](https://babeljs.io/): This project is written in ES6, babel transpiles the code to ES5.  
[**Mongoose**](https://mongoosejs.com/docs/promises.html): Sequelize is a promise-based Node.js ORM for Postgres Server which is the database server for the APP . It features solid transaction support, relations, read replication and more.   
[**Postgresql**](https://docs.mongodb.com/): PostgreSQL is a powerful, open source object-relational database system.  
[**Webpack**](https://webpack.js.org/): webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in browser, it is also used for transpiling scss to css.  
[**React**](https://facebook.github.io/react/): A javascript library for building user interfaces.  
[**Redux**](http://redux.js.org/): Redux is a predictable state container for JavaScript apps.   
[**Json Web Token**](https://jwt.io/): JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties.

## Installation

1. Install nodejs and postgresql if not installed.
2. Navigate to the directory you want it installed to. cd your folder
3. Clone the repository ``` https://github.com/Mcdavid95/Idea-Box.git ```.
4. Create a database with MongoDb.
5. Open the Idea-Box folder.
6. Create a .env file using the .envexample as a guide.
7. ``` npm install ``` to install all dependencies.
8. ``` npm run dev-build ``` to build the app.
9. ``` npm start ``` starts the app.
10. The app runs on port 3000
11. ``` npm run test ``` runs the server test.
12. ``` npm run client-test ``` runs the client-side test
13. The API can be consumed with postman.

## Test  
API test is written with ``` mocha``` and ``` supertest ```.
Frontend tests is written with ``` jest ``` and ``` enzyme ```.

## Limitations.
* The fetching of messages of this project is not real time.
* The In-app Notification system of this project is not set up
* Users can't be removed from a group Yet.
* Messages can't be edited or deleted.

## Documentation
The API documentation for this project can be found [here](http://docs.postit6.apiary.io/)

## How to Contribute
The project is open for contribution. You can start by forking this project repo. If you have improvements you want to add, feel free to do so and create a PR against development branch

## License
[MIT](https://github.com/Mcdavid95/Idea-Box/blob/development/LICENSE)

## FAQs
- Is this an open source application? 
        __Ans:__ Definately it is.
- Can I use it for commercial use or profit making?
        __Ans:__ Yes you can?
- Can I contribute to this project?
        __Ans:__ Yes anyone can contribute.
- How do I contribute?
        __Ans:__ Create your own branch and raise a PR against development
