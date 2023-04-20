# eLitmus-Clueup-Puzzle-Application
An interactive puzzle that can be solved on an online website
This application challenges your problem-solving skills! Solve the puzzle, assess your soft skills, and have fun while sharpening your mind.

https://elitmus-clueup-puzzle-application.onrender.com/

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Soft Skills Assessment](#soft-skills-assessment)
- [Ways to Solve the Puzzle](#ways-to-solve-the-puzzle)
- [Setup Instructions](#setup-instructions)

## Demo

[![Demo][product-screenshot]](https://elitmus-clueup-puzzle-application.onrender.com/)

## Features

- The puzzle must contain 
o	Minimum 5 clues
o	Minimum 2 dead-ends
o	Minimum 1 solution 

- On refreshing, from either browser or website, the puzzle should start from the same step.
- A dashboard for the admin where the progress of all the users can be tracked & analyzed  (email: admin@elitmus.com password: topsecret)
- User analytics (eg - time taken by each user for every riddle) is stored and shown in the admin dashboard

## Soft Skills Assessment

- Problem-solving test: It assesses the mental ability of the participant.
- Role-playing test: It may present you with a scenario and ask you to respond as you would in the role.
- Basic Skills Test (BST): This test aims to evaluate a candidate's verbal and mathematical skills. 

## Ways to Solve the Puzzle

- Start with registering on the website. It contains a total of 5 riddles to be answered, along with 1 multiple-correct type question.
- User can answer the questions by simply adding the answer at the end of the web-link Eg. https://elitmus-clueup-puzzle-application.onrender.com/answer.
- Once a user solves the final riddle, a page showing "The Hunt Has Succeeded !!" gets displayed.

## Setup Instructions

1. Clone the repo
   ```sh
   git clone https://github.com/tusharjain2802/eLitmus-Clueup-Puzzle-Application.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run the mongoDB on localhost using mongo shell.
   ```js
   node app.js
   ```
5. Run the application on localhost using node app.js
   ```shell
   mongod
   ```

[product-screenshot]:https://github.com/tusharjain2802/eLitmus-Clueup-Puzzle-Application/blob/main/public/demo.gif