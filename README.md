# Blockchain Price Tracker

A Nest.js application to track Ethereum and Polygon prices, set alerts, and retrieve swap rates.

## Features
- Fetch and store Ethereum and Polygon prices every 5 minutes.
- Alert if a chain's price increases by more than 3% in one hour.
- Retrieve price history for the last 24 hours.
- Set price alerts and send email notifications.
- Calculate ETH to BTC swap rates with fees.

## Requirements
- Docker
- PostgreSQL

## Running the Application
1. Clone the repository.
2. Add environment variables to `.env`.
3. Run `docker-compose up --build`.
4. Access the Swagger API at `http://localhost:3000/api`.

