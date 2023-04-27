<h1 align="center">Car Rental API</h1>

<p align="center">
  <strong>A RESTful API built with Express.js for a car rental business.</strong>
</p>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Description

This project is a RESTful API built with Express.js for a car rental business. The API handles CRUD operations for cars, rentals, matches, notifications, payments, reviews, and users. It also includes websocket for chat system. The authentication and authorization middleware for protected routes. The API is used by the car rental website built with React.js.

## Installation

To get started with this project, you need to:

1. Clone this repository to your local machine
2. Install dependencies by running the following command: `npm install`
3. Create a `.env` file based on the example provided in `.env.example` file
4. Start the server with the following command: `npm start`

Alternatively, if you want to run it in development mode, use: `npm run dev`


## API Endpoints

This API supports the following endpoints:

- `GET /car`: Get all cars, POST create a new car, PATCH update a car, DELETE a car
- `GET /car/admin`: Get all cars for admin, filter and search
- `POST /car/me/:username`: Get cars of the logged in lessor
- `GET /car/:id`: Get a car by id
- `GET /car/busy/:id`: Get unavailable times for a car
- `GET /car/number-of-rental/:id`: Get number of rentals for a car
- `PATCH /car/change-car-info`: Change car info
- `PATCH /car/status`: Toggle car status
- `PATCH /car/reserve`: Reserve a car
- `POST /chat`: Create a new chat
- `PATCH /chat/noti`: Toggle chat notification
- `GET /match`: Get matches of the logged in user, POST create a new match
- `GET /match/status`: Get match statuses
- `GET /match/admin`: Get matches for admin, filter and search
- `GET /match/:id`: Get match info by id
- `GET /match/me/:id`: Get bookings of the logged in user
- `PATCH /match/cancel-reservation`: Cancel a reservation
- `PATCH /match/status`: Toggle match status
- `PATCH /match/complete`: Complete a match
- `POST /notification`: Create a new notification, GET all notifications, PATCH read notifications
- `GET /notification/have-noti`: Check if user has unread notifications
- `GET /payment`: Get all payments, POST create a new payment
- `GET /payment/:id`: Get a payment by id
- `POST /payment/charge/:id`: Create an Omise charge
- `POST /payment/transfer/:id`: Create an Omise transfer
- `POST /payment/transaction/:id`: Get Omise transactions
- `GET /review`: Get all reviews, POST create a new review
- `GET /review/:id`: Get a review by id
- `POST /user`: Create a new user
- `PATCH /user`: Update a user's rented count
- `POST /user/login`: Login a user
- `GET /auth/google`: Authenticate user with Google
- `GET /auth/google/callback`: Callback for Google authentication
- `POST /user/role`: Get a user's role
- `POST /user/info`: Get a user's info, PATCH update a user's info
- `POST /user/logout`: Logout a user
- `POST /user/forgot-password`: Send reset link to user's email
- `POST /user/reset-password`: Reset user's password
- `GET /user/navbar`: Get navbar info
- `PATCH /user/update-role`: Update user's role as a lessor
- `PATCH /user/lessor`: Change user's role to a lessor
- `PATCH /user/togglereqLessor`: Toggle user's request to be a lessor
- `PATCH /user/update-role-admin`: Update user's role as an admin
- `PATCH /user/status`: Toggle user's status
- `GET /user/admin`: Get users for admin, filter and search
- `GET /api/user/chatRooms/:userId`: Get all chats for a user
- `GET /csrf-token`: Get a CSRF token


## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.



