# 🛒 Full-Stack E-Commerce Platform

A modern, responsive e-commerce application built with the **MERN** stack (MongoDB, Express, React, Node.js). Featuring secure authentication and optimized image management via **ImageKit**.

**🌐 Live Demo:** [https://dulcet-buttercream-9880cb.netlify.app](https://dulcet-buttercream-9880cb.netlify.app)

---

## ✨ Features

*   **Responsive UI:** Built with [Material UI (MUI)](https://mui.com) for a seamless experience across mobile and desktop.
*   **Authentication:** Secure user login and signup using **JWT** and **Bcrypt** for password hashing.
*   **Image Management:** Integrated with [ImageKit.io](https://imagekit.io) for automated image optimization, real-time transformations, and cloud storage.
*   **Client-Side Routing:** Smooth navigation using **React Router DOM v7**.
*   **State Management & API:** Efficient data fetching with **Axios** and real-time notifications via **React Hot Toast**.
*   **Database:** Scalable data storage using **MongoDB Atlas** and **Mongoose ODM**.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** [React 19](https://react.dev)
*   **Styling:** Emotion & Material UI
*   **Routing:** React Router DOM
*   **Icons:** MUI Icons

### Backend
*   **Environment:** Node.js
*   **Framework:** [Express.js](https://expressjs.com)
*   **Database:** [MongoDB Atlas](https://www.mongodb.com)
*   **File Handling:** Multer & ImageKit Node.js SDK
*   **Logging:** Morgan

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB Atlas Account
*   ImageKit.io Account (Public Key, Private Key, and URL Endpoint)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com
    cd your-repo-name
    ```

2.  **Setup Backend:**
    ```bash
    # Navigate to your server folder
    npm install
    ```
    Create a `.env` file in your backend directory:
    ```env
    MONGO_URI=your_mongodb_atlas_uri
    JWT_SECRET=your_secret_key
    IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
    ```

3.  **Setup Frontend:**
    ```bash
    cd frontend 
    npm install
    ```

4.  **Run the application:**
    ```bash
    # Run backend (from server folder)
    npm run dev 

    # Run frontend (from frontend folder)
    npm start
    ```

---

## 📂 Project Structure
```text
├── frontend/             # React application (CRA)
│   ├── public/           # Includes _redirects for Netlify
│   └── src/              # Components, Pages, and Hooks
├── backend/              # Express server
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   └── middleware/       # Auth & ImageKit upload logic
└── netlify.toml          # Deployment configuration
