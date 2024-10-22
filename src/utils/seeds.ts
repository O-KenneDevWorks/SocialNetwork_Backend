import mongoose from 'mongoose';
import User from '../models/user.js';  // Update the path to where your User model is located
import Thought from '../models/thought.js';  // Update the path to where your Thought model is located

// MongoDB connection string
const mongoURI = 'mongodb://127.0.0.1:27017/SocialNetwork';

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

async function seedDB() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Users to be added
    const users = await User.create([
      { username: "JohnDoe", email: "john@example.com" },
      { username: "JaneDoe", email: "jane@example.com" },
      { username: "Alice", email: "alice@example.com" },
      { username: "Bob", email: "bob@example.com" }
    ]);

    console.log('Users added:', users);

    // Thoughts to be added
    const thoughts = await Thought.create([
      { thoughtText: "It's a great day to code!", username: "JohnDoe" },
      { thoughtText: "I love MongoDB!", username: "JaneDoe" },
      { thoughtText: "Express is awesome!", username: "Alice" },
      { thoughtText: "Typescript is amazing!", username: "Bob" }
    ]);

    console.log('Thoughts added:', thoughts);

    // Close the connection
    mongoose.disconnect();
    console.log('Database seeded and connection closed');
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.disconnect();
  }
}

seedDB();
