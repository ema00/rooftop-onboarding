Rooftop Onboarding 2019
=======================

This README gives the description of some of the projects of the Rooftop Onboarding 2019.


Project 05: Javascript, advanced
--------------------------------

Encapsulate the functionality to make requests to a particular REST API using javascript.
Making requests to the unsplash API (https://unsplash.com/developers), for searching images and random images based on a text string.
Made with an SPA using React (https://es.reactjs.org/ and https://en.reactjs.org/docs/create-a-new-react-app.html#create-react-app) to display the search results.


Project 06: Databases and ORMs
------------------------------

Expose a REST API that acesses a database through an ORM.
The ORM is accessed using the Active Record pattern.
Written in Typescript, uses TypeORM (https://typeorm.io/#/).
Snippets for testing the HTTP endpoints are written for use with Visual Studio Code REST Client (https://github.com/Huachao/vscode-restclient).
Just in case, and since these were not defined in the specification. The parameters for querying the HTTP endpoints are passed as JSON in the body of the requests. Description is given for each controller in the "test" folder.
The status codes of the responses are:
200: The request is well composed and the resource was found.
404: The request is well composed but the resource was not found.
400: The request is not well composed, invalid parameters.


Project 07: OOP and Patterns
----------------------------

Rewrite the starter code to implement the same functionality by using OOP.
The starter code is from the Gilded Rose kata. But, the objective is different from the one of the kata.

- v1: is the solution to the Gilded Rose kata, using OOP.
- v2: similar to v1, but objects calculate the state for any date.

