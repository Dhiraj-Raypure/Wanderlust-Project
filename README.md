# 🌍 WanderLust

WanderLust is a full-stack web application inspired by Airbnb that allows users to discover, create, and manage travel listings. Users can sign up, log in, add their own listings with images, browse destinations by category, search for places, and leave reviews.

---

## 🚀 Features

* 🔐 User Authentication (Sign Up, Log In, Log Out)
* 🏡 Create, Edit, and Delete Listings
* 📷 Image Uploads using Cloudinary
* 📍 Interactive Maps with Mapbox
* ⭐ Add and Delete Reviews
* 👤 Authorization (Only listing owners can edit/delete their listings)
* 🔎 Search listings by title or location
* 🗂️ Browse listings by category
* ✅ Server-side validation using Joi
* 💬 Flash messages for success and error notifications
* 📱 Responsive UI built with Bootstrap

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* Bootstrap 5
* EJS (Embedded JavaScript Templates)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Passport.js
* Passport Local Strategy
* Express Session

### Image Storage

* Cloudinary
* Multer

### Maps

* Mapbox Geocoding API

---

## 📂 Project Structure

```
WanderLust
│
├── controllers/
├── models/
├── routes/
├── middleware.js
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── utils/
├── views/
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Navigate to the project folder

```bash
cd WanderLust
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file and add your environment variables

```
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_access_token
```

5. Start the development server

```bash
npm start
```

or

```bash
nodemon app.js
```

---

## 📸 Screenshots

Add screenshots of:

* Home Page
* Listing Details
* Create Listing
* Edit Listing
* Login Page
* Category Page
* Search Results

---

## 📖 What I Learned

While building WanderLust, I learned:

* RESTful Routing
* MVC Architecture
* Authentication & Authorization
* Session Management
* CRUD Operations
* MongoDB & Mongoose
* File Uploads with Multer
* Cloudinary Integration
* Mapbox Geocoding
* Server-side Validation using Joi
* Responsive UI Design with Bootstrap

---

## 🔮 Future Improvements

* ❤️ Wishlist / Favorites
* 💳 Online Booking & Payments
* 📅 Availability Calendar
* 📍 Nearby Listings
* 🔔 Notifications
* 🌙 Dark Mode
* 📱 Progressive Web App (PWA)
* 🌐 Google Authentication
