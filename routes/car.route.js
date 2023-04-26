/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - owner
 *         - status
 *         - brand
 *         - model
 *         - gear_type
 *         - year
 *         - license_plate
 *         - registration_book_id
 *         - registration_book_url
 *         - energy_types
 *         - province
 *         - rental_price
 *         - passenger
 *         - hygieneRating
 *         - carConditionRating
 *         - serviceRating
 *         - rating
 *         - reviewCount
 *       properties:
 *         owner:
 *           type: string
 *           description: The owner of the car.
 *           example: "john_doe"
 *         renter:
 *           type: string
 *           description: The renter of the car.
 *           example: "jane_doe"
 *         status:
 *           type: string
 *           enum: [ "Pending", "Rejected", "Unavailable", "Available" ]
 *           description: The status of the car.
 *           example: "Pending"
 *         brand:
 *           type: string
 *           description: The brand of the car.
 *           example: "Toyota"
 *         model:
 *           type: string
 *           description: The model of the car.
 *           example: "Camry"
 *         gear_type:
 *           type: string
 *           enum: [ "Manual", "Auto" ]
 *           description: The type of the car's gear.
 *           example: "Manual"
 *         year:
 *           type: number
 *           description: The year of the car.
 *           example: 2022
 *         description:
 *           type: string
 *           description: A description of the car.
 *           example: "A brand new car!"
 *         license_plate:
 *           type: string
 *           description: The license plate of the car.
 *           example: "ABC123"
 *         registration_book_id:
 *           type: string
 *           description: The ID of the registration book of the car.
 *           example: "123456789"
 *         registration_book_url:
 *           type: string
 *           description: The URL of the registration book of the car.
 *           example: "https://example.com/registration_book.pdf"
 *         available_location:
 *           type: string
 *           description: The location where the car is available for rent.
 *           example: "Bangkok"
 *         energy_types:
 *           type: array
 *           items:
 *             type: string
 *             enum: [ "DieselB7", "DieselB10", "Gasohol95", "Gasohol91", "E20", "E85", "LPG", "NGV", "EV" ]
 *             description: The energy types of the car.
 *             example: [ "DieselB7", "DieselB10" ]
 *         province:
 *           type: string
 *           description: The province where the car is located.
 *           example: "Bangkok"
 *         unavailable_times:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               start:
 *                 type: string
 *                 format: date-time
 *                 description: The start time of the car's unavailability.
 *                 example: "2022-01-01T12:00:00Z"
 *               end:
 *                 type: string
 *                 format: date-time
 *                 description: The end time of the unavailable time.
 *                 example: '2022-01-02T12:00:00Z'
 *               username:
 *                  type: string
 *                  description: The username of the person who marked the car as unavailable during this time.
 *                  example: john_doe
 *               description: The times when the car is unavailable for rent.
 *               example: [{start: '2022-01-01T12:00:00Z', end: '2022-01-02T12:00:00Z', username: john_doe}]
 *         car_images:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of image URLs for the car
 *           example: ['https://example.com/car-image1.jpg', 'https://example.com/car-image2.jpg']
 *         rental_price:
 *           type: number
 *           minimum: 0
 *           description: The rental price for the car
 *           example: 5000
 *         passenger:
 *           type: number
 *           minimum: 0
 *           description: The number of passengers the car can accommodate
 *           example: 4
 *         hygieneRating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           default: 5
 *           description: The hygiene rating for the car, on a scale of 0 to 5
 *           example: 3
 *         carConditionRating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           default: 5
 *           description: The condition rating for the car, on a scale of 0 to 5
 *           example: 4
 *         serviceRating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           default: 5
 *           description: The service rating for the car rental provider, on a scale of 0 to 5
 *           example: 5
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           default: 0
 *           description: The overall rating for the car, based on customer reviews, on a scale of 0 to 5
 *           example: 4
 *         reviewCount:
 *           type: number
 *           default: 0
 *           description: The number of customer reviews for the car
 *           example: 2
 *         rentedOutCount:
 *           type: number
 *           default: 0
 *           description: The number of times the car has been rented out
 *           example: 3
 * @swagger
 * tags:
 *   name: Car
 *   description: API for managing cars
 */
/**
 * @swagger
 * /car:
 *   post:
 *     summary: Create a new car
 *     description: Create a new car with the given car details and owner information
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *               status:
 *                 type: string
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: number
 *               gear_type:
 *                 type: string
 *               license_plate:
 *                 type: string
 *               registration_book_id:
 *                 type: string
 *               description:
 *                 type: string
 *               available_location:
 *                 type: string
 *               energy_types:
 *                 type: array
 *                 items:
 *                   type: string
 *               province:
 *                 type: string
 *               passenger:
 *                 type: number
 *               rating:
 *                 type: number
 *               rental_price:
 *                 type: number
 *               owner_user_id:
 *                 type: string
 *               car_images:
 *                 type: array
 *                 items:
 *                   type: string
 *               registration_book_image:
 *                 type: string
 *             example:
 *               owner: "John Doe"
 *               status: "Available"
 *               brand: "Toyota"
 *               model: "Camry"
 *               year: 2021
 *               gear_type: "Automatic"
 *               license_plate: "ABC 123"
 *               registration_book_id: "123456"
 *               description: "This is a great car"
 *               available_location: "Miami"
 *               energy_types: ["Gasoline", "Electric"]
 *               province: "FL"
 *               passenger: 5
 *               rating: 4.5
 *               rental_price: 100
 *     responses:
 *       200:
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car:
 *                   $ref: '#/components/schemas/Car'
 *             example:
 *               car:
 *                 owner: "John Doe"
 *                 brand: "Toyota"
 *                 model: "Camry"
 *                 license_plate: "ABC 123"
 *                 gear_type: "Automatic"
 *                 year: 2021
 *                 energy_types: ["Gasoline", "Electric"]
 *                 province: "FL"
 *                 passenger: 5
 *                 rating: 4.5
 *                 car_images: ["image1.jpg", "image2.jpg"]
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "license_plate or registration_book_id or registration_book_url already exists"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Server error occurred"
 */
/**
 * @swagger
 * /car:
 *   get:
 *     summary: Get a list of available cars
 *     description: Retrieve a paginated list of available cars based on the provided query parameters
 *     tags: [Car]
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number of the results to retrieve. Defaults to 1.
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: size
 *         description: Number of results per page. Defaults to 25.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *       - in: query
 *         name: minprice
 *         description: Minimum rental price of the car. Must be a valid number.
 *         schema:
 *           type: number
 *           minimum: 0
 *       - in: query
 *         name: maxprice
 *         description: Maximum rental price of the car. Must be a valid number.
 *         schema:
 *           type: number
 *           minimum: 0
 *       - in: query
 *         name: minrating
 *         description: Minimum rating of the car. Must be a number between 0 and 5.
 *         schema:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *       - in: query
 *         name: maxrating
 *         description: Maximum rating of the car. Must be a number between 0 and 5.
 *         schema:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *       - in: query
 *         name: startdate
 *         description: Start date of the rental period. Must be a valid date string in the format YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: enddate
 *         description: End date of the rental period. Must be a valid date string in the format YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: province
 *         description: Name of the province where the car is located.
 *         schema:
 *           type: string
 *       - in: query
 *         name: brandlist
 *         description: A JSON-encoded list of car brands to filter by.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: number
 *                   description: The current page number
 *                 pages:
 *                   type: number
 *                   description: The total number of pages
 *                 currentCount:
 *                   type: number
 *                   description: The number of items returned in the current page
 *                 totalCount:
 *                   type: number
 *                   description: The total number of items matching the query
 *                 remainCount:
 *                   type: number
 *                   description: The remaining number of items matching the query
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       owner:
 *                         type: string
 *                         description: The owner of the car
 *                       brand:
 *                         type: string
 *                         description: The brand of the car
 *                       model:
 *                         type: string
 *                         description: The model of the car
 *                       gear_type:
 *                         type: string
 *                         description: The gear type of the car
 *                       energy_types:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: The energy types of the car
 *                       passenger:
 *                         type: number
 *                         description: The maximum number of passengers the car can accommodate
 *                       rating:
 *                         type: number
 *                         description: The rating of the car
 *                       province:
 *                         type: string
 *                         description: The province where the car is located
 *                       rental_price:
 *                         type: number
 *                         description: The rental price of the car per day
 *                       user_image:
 *                         type: string
 *                         description: The URL of the profile image of the car owner
 *                       car_image:
 *                         type: string
 *                         description: The URL of the primary image of the car
 *                       reviewCount:
 *                         type: number
 *                         description: The number of reviews for the car
 *             example:
 *              {
 *                "currentPage": 1,
 *                "pages": 10,
 *                "currentCount": 25,
 *                "totalCount": 240,
 *                "remainCount": 215,
 *                "data": [
 *                  {
 *                    "owner": "john_doe",
 *                    "brand": "Toyota",
 *                    "model": "Camry",
 *                    "gear_type": "Automatic",
 *                    "energy_types": [
 *                      "Gasoline",
 *                      "Hybrid"
 *                    ],
 *                    "passenger": 5,
 *                    "rating": 4.5,
 *                    "province": "California",
 *                    "rental_price": 50,
 *                    "user_image": "https://example.com/user/john_doe.jpg",
 *                    "car_image": "https://example.com/car/toyota_camry.jpg",
 *                    "reviewCount": 10
 *                  },
 *                  {
 *                    "owner": "jane_doe",
 *                    "brand": "Ford",
 *                    "model": "Fusion",
 *                    "gear_type": "Automatic",
 *                    "energy_types": [
 *                      "Gasoline"
 *                    ],
 *                    "passenger": 4,
 *                    "rating": 4,
 *                    "province": "Texas",
 *                    "rental_price": 45,
 *                    "user_image": "https://example.com/user/jane_doe.jpg",
 *                    "car_image": "https://example.com/car/ford_fusion.jpg",
 *                    "reviewCount": 8
 *                  },
 *                  ...
 *                ]
 *              }
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Server error occurred"
 *
 */
/**
 * Retrieve information about a specific car
 * @swagger
 * /car/{id}:
 *   get:
 *     summary: Get information about a specific car
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to retrieve
 *         schema:
 *           type: string
 *           example: 6098c4e1dabf4e4f4e4b4d47
 *     tags:
 *       - Car
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *             example:
 *               _id: 6098c4e1dabf4e4f4e4b4d47
 *               owner: alice123
 *               brand: Toyota
 *               model: Camry
 *               gear_type: Automatic
 *               energy_types: Gasoline
 *               passenger: 4
 *               rating: 4.5
 *               province: Ontario
 *               rental_price: 45
 *               car_images:
 *                 - https://example.com/car_image1.jpg
 *                 - https://example.com/car_image2.jpg
 *               user_image: https://example.com/user_image.jpg
 *               user_rating: 4.2
 *               owner_id: 6098c4e1dabf4e4f4e4b4d49
 *       404:
 *         description: The specified car ID was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car not found
 *       500:
 *         description: Internal server error. Something went wrong while retrieving the car's detailed information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
/**
 * @swagger
 * /car/me/:username:
 *   post:
 *     summary: Retrieve cars by owner username, sorted by various options
 *     description: Retrieve cars that belong to a specific user, optionally filtered by province, and sorted by rating or price.
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username of the car owner.
 *         schema:
 *           type: string
 *       - name: sortBy
 *         in: body
 *         required: false
 *         description: The sorting option for the result set.
 *         schema:
 *           type: string
 *           enum: ["highest rating", "lowest rating", "highest price", "lowest price"]
 *       - name: province
 *         in: body
 *         required: false
 *         description: The province of the car.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   status:
 *                     type: string
 *                   energy_types:
 *                     type: array
 *                     items:
 *                       type: string
 *                   rating:
 *                     type: number
 *                   reviewCount:
 *                     type: number
 *                   rentedOutCount:
 *                     type: number
 *                   brand:
 *                     type: string
 *                   model:
 *                     type: string
 *                   gear_type:
 *                     type: string
 *                   available_location:
 *                     type: string
 *                   rental_price:
 *                     type: number
 *                   passenger:
 *                     type: number
 *                   car_images:
 *                     type: array
 *                     items:
 *                       type: string
 *                   unavailable_times:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         start:
 *                           type: string
 *                           format: date-time
 *                         end:
 *                           type: string
 *                           format: date-time
 *                   car_image:
 *                     type: string
 *                   show_images:
 *                     type: array
 *                     items:
 *                       type: string
 *                   owner:
 *                     type: string
 *                 example:
 *                   - _id: "123456"
 *                     status: "Available"
 *                     energy_types: ["electric"]
 *                     rating: 4.5
 *                     reviewCount: 10
 *                     rentedOutCount: 5
 *                     brand: "Tesla"
 *                     model: "Model S"
 *                     gear_type: "Auto"
 *                     available_location: "123 Main Street"
 *                     rental_price: 200
 *                     passenger: 5
 *                     car_images: ["image1.jpg", "image2.jpg"]
 *                     unavailable_times: [{start: "2023-05-01T00:00:00.000Z", end: "2023-05-10T00:00:00.000Z"}]
 *                     car_image: "image1.jpg"
 *                     show_images: ["image1.jpg", "image2.jpg"]
 *                     owner: "johndoe"
 *       404:
 *         description: Cannot find car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot find car
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */
/**
 * @swagger
 * /car:
 *   post:
 *     summary: Rent a car
 *     description: Rent a car and increment rentedOutCount
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: car_id
 *         description: ID of the car to rent
 *         schema:
 *           type: string
 *           example: 61593d160cf2c7d567c0f47d
 *     responses:
 *       '200':
 *         description: Car rented successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: car rented
 *       '404':
 *         description: Cannot find car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot find car
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */
/**
 * @swagger
 * /car:
 *   delete:
 *     summary: Deletes a car.
 *     description: Deletes a car with the specified ID.
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: car_id
 *         description: ID of the car to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car with ID 123 deleted successfully.
 *       404:
 *         description: Car not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot find car.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error message.
 */
/**
 * @swagger
 * /car/number-of-rental/{id}:
 *   get:
 *     summary: Get the number of times a car has been rented out.
 *     description: Retrieves the number of times a car has been rented out with the specified ID.
 *     tags:
 *       - Car
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the car to retrieve rental count for.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The number of times the car has been rented out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rentedOutCount:
 *                   type: integer
 *                   example: 3
 *       404:
 *         description: Car not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot find car.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error message.
 */
/**
 * @swagger
 * /car/change-car-info:
 *   patch:
 *     summary: Update a car's information
 *     description: Update a car's information by ID
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: car_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the car to update
 *       - in: header
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user making the request
 *       - in: header
 *         name: Content-Type
 *         schema:
 *           type: string
 *         required: true
 *         description: The content type of the request payload. Must be set to 'application/json'
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization token in the format 'Bearer {token}'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the car. Can only be changed to "Unavailable".
 *               delete_image:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of image URLs to remove from the car's image gallery.
 *               car_images:
 *                 type: array
 *                 items:
 *                   type: string (binary)
 *                 description: An array of images to add to the car's image gallery.
 *           example:
 *              {
 *                "status": "Unavailable",
 *                "delete_image": [
 *                  "https://storage.googleapis.com/monkeyd-car-images/1234abcd?GoogleAccessId=access-id"
 *                ],
 *                "make": "Honda",
 *                "model": "Civic",
 *                "year": 2019,
 *                "color": "Blue"
 *              }
 *     responses:
 *       '200':
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Car with ID 123 updated successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: "Status can only be changed to Unavailable"
 *       '404':
 *         description: Car not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Cannot find car"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */
/**
 * @swagger
 * /car/status:
 *   post:
 *     summary: Toggle the status of a car between Available, Rejected, and Pending
 *     description: Toggle the status of a car between Available, Rejected, and Pending
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               car_id:
 *                 type: string
 *                 description: The ID of the car to update
 *                 example: 6150d67c7167f828383c294a
 *               action:
 *                 type: string
 *                 description: The action to take (either "Approve" or "Reject")
 *                 example: Approve
 *             required:
 *               - car_id
 *               - action
 *     responses:
 *       '200':
 *         description: Car status changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The response message
 *                   example: Car status changed
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Invalid action
 *       '404':
 *         description: Car not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Cannot find car
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: An internal server error occurred
 */
/**
 * @swagger
 * /car/admin:
 *   get:
 *     summary: Get information about cars based on filter, search and sort options
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: The filter option for cars (approved, rejected, pending, all)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: The search term for license plates
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: The sort option for cars (newest date, oldest date)
 *     responses:
 *       200:
 *         description: A list of cars based on the provided filter, search and sort options
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cars:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 *                   description: The list of cars that match the filter and search options
 *                 count:
 *                   type: integer
 *                   description: The number of cars returned in the response
 *               example:
 *                 cars: 
 *                   - _id: "609f3f7485e5e20034d2a68c"
 *                     owner: "609f3f7485e5e20034d2a68b"
 *                     renter: null
 *                     brand: "Toyota"
 *                     model: "Camry"
 *                     year: 2019
 *                     registration_book_id: "3b3ddc9e-e5d5-4d0c-aa06-4e4b4ff4d872"
 *                     license_plate: "XYZ 1234"
 *                     status: "Available"
 *                     createdAt: "2022-04-22T18:40:21.981Z"
 *                     registration_book_url: "https://www.example.com/registration_book_image.jpg"
 *                   - _id: "609f3f7485e5e20034d2a68d"
 *                     owner: "609f3f7485e5e20034d2a68e"
 *                     renter: null
 *                     brand: "Honda"
 *                     model: "Accord"
 *                     year: 2018
 *                     registration_book_id: "2b2ddc9e-e5d5-4d0c-aa06-4e4b4ff4d871"
 *                     license_plate: "ABC 5678"
 *                     status: "Rented"
 *                     createdAt: "2022-04-20T16:45:21.981Z"
 *                     registration_book_url: ""
 *                 count: 2
 *       500:
 *         description: Server error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *               example:
 *                 message: "Server error occurred"
 */
/**
 * Reserve a car for a given time slot and create a new match.
 *
 * @swagger
 * /car/reserve:
 *   post:
 *     summary: Reserve a car
 *     description: Reserve a car for a given time slot and create a new match.
 *     tags:
 *       - Car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carID:
 *                 type: string
 *                 description: ID of the car to reserve.
 *                 example: 61689c24d4897d9a208bcbca
 *               lessorID:
 *                 type: string
 *                 description: ID of the owner of the car.
 *                 example: 61689c24d4897d9a208bcbcb
 *               renterID:
 *                 type: string
 *                 description: ID of the user reserving the car.
 *                 example: 61689c24d4897d9a208bcbcc
 *               status:
 *                 type: string
 *                 description: Status of the reservation match.
 *                 example: pending
 *               pickupLocation:
 *                 type: string
 *                 description: Pickup location for the reservation.
 *                 example: San Francisco, CA
 *               pickUpDateTime:
 *                 type: string
 *                 format: date-time
 *                 description: Pickup date and time for the reservation.
 *                 example: 2023-05-01T12:00:00Z
 *               returnLocation:
 *                 type: string
 *                 description: Return location for the reservation.
 *                 example: Los Angeles, CA
 *               returnDateTime:
 *                 type: string
 *                 format: date-time
 *                 description: Return date and time for the reservation.
 *                 example: 2023-05-03T12:00:00Z
 *               price:
 *                 type: number
 *                 description: Price of the reservation.
 *                 example: 100
*     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 match:
 *                   type: object
 *                   $ref: '#/components/schemas/Match'
 *             example:
 *               match:
 *                 id: "61493e1a793fa62b78e8c527"
 *                 carID: "61493e1a793fa62b78e8c529"
 *                 lessorID: "61493e1a793fa62b78e8c52a"
 *                 renterID: "61493e1a793fa62b78e8c52b"
 *                 status: "pending"
 *                 pickupLocation: "Los Angeles"
 *                 pickUpDateTime: "2023-04-25T10:00:00.000Z"
 *                 returnLocation: "San Francisco"
 *                 returnDateTime: "2023-04-28T10:00:00.000Z"
 *                 price: 500
 *                 createdAt: "2023-04-23T00:00:00.000Z"
 *                 updatedAt: "2023-04-23T00:00:00.000Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "something already exists"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Server error occurred"
 */
/**
 * @swagger
 * /car/busy/:id:
 *   get:
 *     summary: Retrieve the unavailable times of a car
 *     description: Retrieve the unavailable times of a car by its id
 *     tags:
 *       - Car
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to retrieve unavailable times for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The unavailable times of the car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the car
 *                 unavailable_times:
 *                   type: array
 *                   description: An array of unavailable times for the car
 *                   items:
 *                     type: object
 *                     properties:
 *                       start:
 *                         type: string
 *                         format: date-time
 *                         description: The start time of the unavailable interval
 *                       end:
 *                         type: string
 *                         format: date-time
 *                         description: The end time of the unavailable interval
 *                       username:
 *                         type: string
 *                         description: The username of the renter who reserved the car during this interval
 *             example:
 *               _id: 1234567890abcdef12345678
 *               unavailable_times:
 *                 - start: "2023-05-01T08:00:00.000Z"
 *                   end: "2023-05-02T08:00:00.000Z"
 *                   username: "johndoe"
 *                 - start: "2023-05-03T10:00:00.000Z"
 *                   end: "2023-05-04T10:00:00.000Z"
 *                   username: "janedoe"
 *       404:
 *         description: Car not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Cannot find car
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: An internal server error occurred
 */




import express from "express";
import {
  createCars,
  getCars,
  getCarInfo,
  getMyCar,
  deleteCar,
  getNumberOfRentals,
  changeCarInfo,
  toggleStatus,
  carReserved,
  getCarsInfoFilterSearch,
  carRented,
  getUnavailableTimes,
} from "../controllers/car.controller.js";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/image.middleware.js";

const router = express.Router();

router
  .route("/car")
  .get(getCars)
  .post(
    authenticateUser.required,
    authorizeUser("lessor"),
    upload.fields([
      {name: "registration_book_image", maxCount: 1},
      {name: "car_images", maxCount: 10},
    ]),
    createCars
  )
  .patch(authenticateUser.required, carRented)
  .delete(
    authenticateUser.required,
    authorizeUser("lessor", "admin"),
    deleteCar
  );

router
  .route("/car/admin")
  .get(
    authenticateUser.required,
    authorizeUser("admin"),
    getCarsInfoFilterSearch
  );

router
  .route("/car/me/:username")
  .post(authenticateUser.required, authorizeUser("lessor"), getMyCar);

router.route("/car/:id").get(getCarInfo);
router.route("/car/busy/:id").get(getUnavailableTimes);
router.route("/car/number-of-rental/:id").get(getNumberOfRentals);

router
  .route("/car/change-car-info")
  .patch(
    authenticateUser.required,
    authorizeUser("lessor", "admin"),
    upload.fields([{name: "car_images", maxCount: 10}]),
    changeCarInfo
  );

router
  .route("/car/status")
  .patch(authenticateUser.required, authorizeUser("admin"), toggleStatus);

router.route("/car/reserve").patch(carReserved);

export default router;

