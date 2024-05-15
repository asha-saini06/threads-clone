# Threads Clone

Threads Clone is a full-stack social networking platform that emulates the core functionalities of Threads. This project includes essential features such as user authentication, post creation, editing, deletion, liking, and commenting. Real-time notifications are implemented using Socket.io, and the interface is built with Chakra UI for a responsive design. Developed using the MERN stack and JWT for authentication, this project serves as an excellent resource for learning full-stack development and real-time communication in a social media context.

## Features

- User Authentication (Sign Up, Login, Logout)
- Create, Edit, and Delete Posts
- Like and Comment on Posts
- Real-time Notifications using Socket.io
- Responsive Design with Chakra UI

## Tech Stack

- **Frontend:** React, Chakra UI
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Real-time Communication:** Socket.io
- **Authentication:** JWT (JSON Web Tokens)


## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/threads-clone.git
   cd threads-clone
   ```

2. **Backend Setup:**

   - Navigate to the backend directory:

     ```bash
     cd backend
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Create a `.env` file in the backend directory and add the following variables:

     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

   - Start the backend server:

     ```bash
     npm start
     ```

3. **Frontend Setup:**

   - Navigate to the frontend directory:

     ```bash
     cd ../frontend
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the frontend development server:

     ```bash
     npm start
     ```

4. **Access the application:**

   Open your browser and go to [http://localhost:3000](http://localhost:3000). The backend server runs on [http://localhost:5000](http://localhost:5000).


## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Open a pull request.

---

**Note:** This project was developed by following along with a tutorial on YouTube. Special thanks to the creator for providing such an informative resource.
