# Itech API

This is an API created for route management, data management and handling, and security (Authentication and authorization). It was developed using Node with Express and MongoDB (NoSQL Database). This is the [User Interface Repository(https://github.com/LukasMartc/eCommerceMERN_frontend) and [Web Demo](https://relaxed-praline-db38a0.netlify.app/).

## 🚀 Getting Started

### Content

This project only have **master** branch. This projects requires several configurations such as Mailtrap Account, and Cloudinary Account. If you need help with this, you can send me an email to lukas@gmail.com asking for help.

### Endpoints

Users Funtions:

- POST **/api/users/** - Register a new user
- POST **/api/users/login** - Authenticates a registered user
- GET **/api/users/confirmed/:token** - Confirm if the token is valid to confirm the account
- POST **/api/users/forget-password/** - The email of the user who forgot his password is indicated
- GET **/api/users/forget-password/:token** - If the token is valid, the user will be able to create a new password
- POST **/api/users/forget-password/:token** - User creates a new password
- GET **/api/users/profile** - Get user profile
- GET **/api/products/** - Get all products
- GET **/api/products/:id** - Get a selected product

Admins Functions:

- POST **/api/users/profile** - A new administrator user is registered 
- POST **/api/products/** - Create a new product  
- PUT **/api/products/:id** - Edit a product
- DELETE **/api/products/:id** - Delete a product

## 🛠️ Technology Stack

This project was built using the following technologies:

- [Nodejs](https://nodejs.org/en/) - JavaScript Runtime
- [Express](https://expressjs.com/) - Framework for Nodejs
- [Mongoose](https://www.mongodb.com/) - NoSQL Database
- [MailtraP](https://mailtrap.io/) - Module for email sending 
- [Cloudinary](https://cloudinary.com/) - Used to upload, store, manipulate, optimize and deliver images

---

Developed by [Lukas Martínez](https://github.com/LukasMartc)
