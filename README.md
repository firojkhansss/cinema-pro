# Cinema Ticket Purchasing Platform API

This is a simple web API built with Node.js and TypeScript to handle ticket purchases for a cinema.


## Problem Statement

The API should provide the following operations:
Create a cinema with N seats. Returns the cinema ID.
Purchase a specific seat number in cinema C. If the seat is already purchased, return an error, otherwise return the seat.
Purchase the first two free consecutive seats in cinema C. If there are no two consecutive seats available, return an error, otherwise return the list of seats.

Concurrent requests to purchase the same seat should not result in multiple purchases and the algorithm should be able to scale to multiple servers.

## Requirements




- Node.js

- npm (Node Package Manager)

- Redis server (used as the data store)




## Getting Started




1. Clone this repository to your local machine.

2. Install dependencies by running: `npm install`

3. Make sure you have Redis installed and running on your system.