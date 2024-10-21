import connection from '../config/connection.js';
import User from '../models/user.js';
import Thought from '../models/thought.js';

// Database connection string
connection.on('error', (err) => err);
  
connection.once('open', async () => {
    console.log('connected');
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create sample users
    await User.create([
      { username: "JohnDoe", email: "john@example.com" },
      { username: "JaneDoe", email: "jane@example.com" }
    ]);

    // Create sample thoughts with embedded reactions
    await Thought.create([
        { 
            thoughtText: "What a wonderful day!", 
            username: "JohnDoe", 
            createdAt: new Date(),
            reactions: [
                { reactionBody: "I totally agree!", username: "JaneDoe", createdAt: new Date() }
            ]
        },
        { 
            thoughtText: "Learning Mongoose is fun!", 
            username: "JaneDoe", 
            createdAt: new Date(),
            reactions: [
                { reactionBody: "Indeed it is!", username: "JohnDoe", createdAt: new Date() }
            ]
        }
    ]);


    console.log("Database has been seeded!");
    process.exit(0);
})
