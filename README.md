# Cocos Challenge API

API for portfolio management implemented using Clean Architecture and SOLID principles with NestJS.

## Project Structure

This project follows a Clean Architecture approach with the following layers:

- **Domain**: Contains business entities, repository interfaces, and business rules.
- **Application**: Contains use cases, DTOs, and mappers.
- **Infrastructure**: Contains controllers, repository implementations, and framework-specific code.

## Setup and Installation

```bash
# Install dependencies
$ npm install

# Run in development mode
$ npm run start:dev

# Run in production mode
$ npm run start:prod
```

## API Endpoints

### Get User Portfolio

```
GET /users/:userId/portfolio
```

Retrieves the portfolio information for a specific user.

#### Path Parameters

- `userId` - The ID of the user to retrieve the portfolio for.

#### Query Parameters

- `requireCompleteValuation` (optional, boolean) - If set to true, the API will return a 404 error if market data is not available for any position. If false or not provided, the API will return the portfolio with positions that may not have market valuation.

#### Response

Status: 200 OK

```json
{
  "userId": "user-1",
  "totalAccountValue": 12540,
  "availableCash": 6250,
  "positions": [
    {
      "instrumentId": "aapl",
      "ticker": "AAPL",
      "name": "Apple Inc.",
      "quantity": 3,
      "marketValue": 471,
      "dailyReturnPercentage": 3.29
    },
    {
      "instrumentId": "msft",
      "ticker": "MSFT",
      "name": "Microsoft Corporation",
      "quantity": 10,
      "marketValue": 3120,
      "dailyReturnPercentage": 2.30
    }
  ]
}
```

#### Error Responses

- **404 Not Found** - If the user is not found or if market data is not available for a position and `requireCompleteValuation` is true.

```json
{
  "statusCode": 404,
  "message": "User with ID user-999 not found",
  "timestamp": "2025-09-16T14:30:00.000Z",
  "path": "/users/user-999/portfolio"
}
```

```json
{
  "statusCode": 404,
  "message": "No market data found for instrument ID: aapl",
  "timestamp": "2025-09-16T14:30:00.000Z",
  "path": "/users/user-1/portfolio?requireCompleteValuation=true"
}
```

## Business Rules

### Portfolio Calculation

- Cash is calculated based on CASH_IN/OUT transactions plus BUY/SELL transactions.
- Positions are calculated as the net quantity of each instrument from all filled orders.
- Market value is calculated as `quantity * close`.
- Daily return percentage is calculated as `(close - previousClose) / previousClose * 100`.
- Total account value is the sum of available cash and the market value of all positions.
- Cash instruments are reported as available cash, not as positions.

### Market Data

When market data is not available for a position:
- If `requireCompleteValuation=true`, the API will return a 404 error.
- Otherwise, the API will return the portfolio with `marketValue` and `dailyReturnPercentage` set to null for positions without market data.

## Testing

```bash
# Run unit tests
$ npm run test

# Run e2e tests
$ npm run test:e2e

# Generate test coverage report
$ npm run test:cov
```

## License

This project is [MIT licensed](LICENSE).


# Build the Docker image
docker build -t cocos-challenge-api .

# Run the container with environment variables
docker run -d \
  --name cocos-api \
  -p 3000:3000 \
  -e DB_HOST=your_db_host \
  -e DB_PORT=your_db_port \
  -e DB_DATABASE=your_database_name \
  -e DB_USERNAME=your_username \
  -e DB_PASSWORD=your_password \
  cocos-challenge-api