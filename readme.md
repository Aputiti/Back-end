# Dummy REST API Server

This is a simple REST API server that serves a list of car companies and provides a random fun fact generator. It's designed for demonstration and learning purposes.

## Getting Started

To run the API server, make sure you have [Node.js](https://nodejs.org/) installed on your system.

Clone this repo.

run npm init.

run npm start.

The server will start running at http://localhost:3000/.

## Endpoints

Get a List of Car Companies
URL: /items
Method: GET

Get a Car Company by ID
URL: /items/:id
Method: GET

Get a Random Fun Fact
URL: /random-fact
Method: GET

Add a Car company
URL: /items
Method: POST

Delete a Car company
URL: /items/:id
Method: DELETE

Change a Car company
URL: /items/:id
Method: PUT
