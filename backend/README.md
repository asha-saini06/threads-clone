# Threads Clone - Backend

Welcome to the backend of Threads Clone! This repository contains the server-side codebase for the Threads Clone project, a full-stack social networking platform.

## Features

- User authentication (signup, login, logout)
- Create, edit, and delete posts
- Like and comment on posts
- Real-time notifications using Socket.io

## Tech Stack

- **Node.js:** JavaScript runtime for building server-side applications
- **Express:** Web application framework for Node.js
- **MongoDB:** NoSQL database for storing application data
- **Mongoose:** MongoDB object modeling tool for Node.js
- **Socket.io:** Real-time communication library for enabling instant updates
- **JWT:** JSON Web Tokens for user authentication

## Installation

To get started with the Threads Clone backend, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/asha-saini06/threads-clone.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd threads-clone/backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

After completing the installation steps, you can start the backend server:

```bash
npm start
```

This will run the backend server. Make sure MongoDB is running on your system.

## Folder Structure

The folder structure of the backend part is as follows:

```
backend/
├── config/
├── controllers/
├── models/
├── routes/
├── server.js
└── .env
```

- **config:** Contains configuration files for the server
- **controllers:** Contains logic for handling requests and responses
- **models:** Contains Mongoose models for MongoDB collections
- **routes:** Contains API routes
- **server.js:** Entry point of the backend application
- **.env:** Environment variables file (e.g., database connection string, JWT secret)

## Contributing

Contributions to the Threads Clone backend are welcome! If you want to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.
