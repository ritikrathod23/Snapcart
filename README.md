
# Snapcart

Snapcart is a full-stack modern e-commerce web application built using the MERN stack with secure Stripe payment integration.
It provides a seamless online shopping experience with features like dynamic product listings, user authentication, cart management, and order processing.## 🚀 Tech Stack

### Frontend

React.js

Tailwind CSS

Material UI

Context API

React Tanstack Query

Redux 

Responsive UI

### Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

### Payments

Stripe Payment Gateway


## 📌 Features
### 🛍 User Features

Browse products with clean UI

Product details page

Add to cart / Remove from cart

Update item quantity

Checkout with Stripe

View Orders

Fully responsive design

### 🔐 Authentication

User Signup & Login

Password hashing with bcrypt

Protected routes using JWT

### 🛒 Cart & Orders

Add multiple items

Auto calculation of totals

Secure order creation

Payment success + order storage

### 🛠 Admin Capabilities

Add / Update / Delete products

Manage inventory

Access order list

## Installation

### Install my-project with npm

```bash
  git clone https://github.com/ritikrathid23/Snapcart.git
  cd Snapcart
```
    
### Install dependencies

#### Frontend
```bash
  cd frontend
  npm install
```
#### Backend

```bash
  cd Backend
  npm install
```
#### Add your environment variables into the backend folder
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
CLIENT_URL=http://localhost:5173
```
#### Add your environment variables into the backend folder
```bash
VITE_API_URL=your-server-url/api/v1
```
### Run the Project

Start backend:
```bash
cd backend
npm start
```
Start frontend:
```bash
cd frontend
npm run dev
```
## 📜License

This project is released under the MIT License.

