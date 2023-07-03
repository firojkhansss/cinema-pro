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

## Running the API

1. Run the API using the following command: `npm start`
2. The API will be available at `http://localhost:3000` by default.

## Endpoints

1. **POST /cinemas** - Create a cinema with N seats.

   - Request body: `{ "seats": N }`
   - Response: `{ "cinemaId": "CINEMA_ID" }`

2. **POST /cinemas/:cinemaId/purchase/:seatNumber** - Purchase a specific seat number in cinema C.

   - Response: `{ "message": "Seat purchased successfully." }` or `{ "message": "Seat already purchased." }`

3. **POST /cinemas/:cinemaId/purchase-consecutive** - Purchase the first two free consecutive seats in cinema C.
   - Response: `{ "seats": [seat1, seat2] }` or `{ "message": "No two consecutive seats available." }`

## Important Notes
- Concurrent requests to purchase the same seat are handled to avoid multiple purchases.
- The API uses Redis as the data store for simplicity. Ensure that Redis is running and accessible.

## Assumptions
- The cinema seats are numbered sequentially from 1 to N.
- The API does not handle user authentication or user-specific purchases for simplicity.
- The API does not handle seat reservations or ticket pricing for simplicity.