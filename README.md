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



### Setup .env file

Before running the application, ensure you have a `.env` file in the root directory of the project with the following variables configured:

```dotenv
PORT=5000  # Replace with your preferred port number
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Build the app

To build the Threads Clone application:

```shell
npm run build
```

This command will build the frontend of the application for production use.

### Start the app

To start the Threads Clone application:

```shell
npm start
```

This command will start the backend server and serve the built frontend. Open your browser and go to [http://localhost:5000](http://localhost:5000) to access the application.

---

Make sure to follow the specific setup instructions for the frontend and backend as outlined in their respective README.md files. This section focuses solely on configuring environment variables, building the application, and starting the server. Adjust the port number (`PORT=5000`) and other variables according to your setup preferences and credentials.

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Open a pull request.

---

**Note:** This project was developed by following along with @burakorkmez. Special thanks to the creator for providing such an informative resource.
