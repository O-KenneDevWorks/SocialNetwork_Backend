import connection from '../config/connection.js';
import User from '../models/user.js';
import Thought from '../models/thought.js';
import Reaction from '../models/reaction.js';

// Database connection string
connection.on('error', (err) => err);
  
connection.once('open', async () => {
    console.log('connected');
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});

    // Create sample users
    await User.create([
      { username: "JohnDoe", email: "john@example.com" },
      { username: "JaneDoe", email: "jane@example.com" }
    ]);

    // Create sample thoughts
    await Thought.create([
      { thoughtText: "What a wonderful day!", username: "JohnDoe", createdAt: new Date() },
      { thoughtText: "Learning Mongoose is fun!", username: "JaneDoe", createdAt: new Date() }
    ]);

    // Assume reactions are part of thoughts
    await Reaction.create([
      { reactionBody: "I totally agree!", username: "JaneDoe", createdAt: new Date() },
      { reactionBody: "Indeed it is!", username: "JohnDoe", createdAt: new Date() }
    ]);

    // Link reactions to thoughts if needed


    console.log("Database has been seeded!");
    process.exit(0);
})
