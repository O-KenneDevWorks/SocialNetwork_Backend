# SocialNetwork_Backend

The Social Network API is a backend application designed to manage user interactions similar to a social media platform. It facilitates the creation of user profiles, thoughts (akin to posts or tweets), reactions to thoughts (similar to comments or likes), and managing friendships between users.

# Table of Contents
1. [Features](#features)
2. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Steps](#steps)
3. [Usage](#usage)
   - [API Endpoints](#api-endpoints)
4. [License](#license)
5. [Questions](#questions)

## Features

- **User Management**: Create, update, and delete user profiles.
- **Thoughts**: Users can post thoughts and view thoughts from other users.
- **Reactions**: Users can react to thoughts, simulating comments or likes.
- **Friendships**: Users can add or remove friends, allowing for a dynamic social network graph.

## Installation

To set up the Social Network API locally, follow these steps:

### Prerequisites

- Node.js
- MongoDB
- npm (Node Package Manager)

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/socialnetwork-api.git
cd socialnetwork-api
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure the MongoDB URI:**

Edit the config/connection.js file to point to your MongoDB server. For local development, it usually looks like this:

```javascript
mongoose.connect('mongodb://127.0.0.1:27017/SocialNetwork');
```

4. **Seed the database (optional):**

If you want to populate your database with sample data:

```bash
npm run seed
```

## Usage
Start the server with:

```bash
npm run start
```

This will start the server on the default port (usually 3001). You can access the API through http://localhost:3001/.

## Video Example

Check out this video for a quick run-through of how to set up and use our application:

[Watch the video](https://drive.google.com/file/d/13vLmCO7b54Zo7VadPRc5fIRB7iUErHhu/view)

## API Endpoints
- Users:
    - GET /api/users: Fetch all users
    - POST /api/users: Create a new user
    - GET /api/users/:userId: Fetch a single user
    - PUT /api/users/:userId: Update a user
    - DELETE /api/users/:userId: Delete a user
    - POST /api/users/:userId/friends/:friendId: Add a friend
    - DELETE /api/users/:userId/friends/:friendId: Remove a friend

- Thoughts:
    - GET /api/thoughts: Fetch all thoughts
    - POST /api/thoughts: Create a new thought
    - GET /api/thoughts/:thoughtId: Fetch a single thought
    - PUT /api/thoughts/:thoughtId: Update a thought
    - DELETE /api/thoughts/:thoughtId: Delete a thought

- Reactions:
    - POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought
    - DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction

## License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Questions
For any inquiries or issues, please contact:

- Name: Owen Kenne
- Email: <okenne.devworks@gmail.com>
- GitHub: [O-KenneDevWorks](https://github.com/O-KenneDevWorks/)