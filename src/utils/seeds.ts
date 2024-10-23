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
        // const thoughts = await Thought.create([
        //   { thoughtText: "It's a great day to code!", username: "JohnDoe" },
        //   { thoughtText: "I love MongoDB!", username: "JaneDoe" },
        //   { thoughtText: "Express is awesome!", username: "Alice" },
        //   { thoughtText: "Typescript is amazing!", username: "Bob" }
        // ]);
        
        // const thoughts = [
        //     { thoughtText: "It's a great day to code!", username: "JohnDoe" },
        //     { thoughtText: "I love MongoDB!", username: "JaneDoe" },
        //     { thoughtText: "Express is awesome!", username: "Alice" },
        //     { thoughtText: "Typescript is amazing!", username: "Bob" }
        // ]
        // // console.log('Thoughts added:', thoughts);

        // const getAllUsers = () => {
        //     return User.find();
        // };

        // const addFriend = (userId: string, friendId: string) => {
        //     const user = User.findByIdAndUpdate(userId, {
        //         $addToSet: { friends: friendId }
        //     }, { new: true });
        //     if (!user) {
        //         return { message: 'No user found with this ID' };
        //     }
        //     return user;
        // };

        // const createThought = async (username: string, thought: string) => {
        //     // Create a new thought from the request body
        //     const newThought = await Thought.create({
        //         thoughtText: thought,
        //         username: username,
        //     });

        //     // Update the user's thoughts array with the new thought's ID
        //     const userUpdate = await User.findOneAndUpdate(
        //         { username: username }, // Using username to find user; ensure it's unique or use _id
        //         { $push: { thoughts: newThought._id } }, // Push the new thought's ID to the user's thoughts array
        //         { new: true }  // Returns the updated user document
        //     );

        //     if (!userUpdate) {
        //         // If no user is found or the update fails
        //         return { message: 'User not found, thought not linked' };
        //     }

        //     // Respond with the newly created thought
        //     return newThought;
        // };

        // const getAllThoughts = () => {
        //     return Thought.find();
        // };

        // const createReaction = async (thoughtId: string, reaction: any) => {
        //     const thought = await Thought.findById(thoughtId);
        //     if (!thought) {
        //         return { message: 'No thought found with this ID' };
        //     }

        //     thought.reactions.push(reaction);  // Assuming req.body contains { reactionBody, username }
        //     await thought.save();

        //     return { message: 'Reaction added successfully', thought };
        // }

        // Thoughts to be added with reactions
        const thoughtsData = [
            { thoughtText: "It's a great day to code!", username: "JohnDoe", reactions: [{ reactionBody: "Absolutely agree!", username: "JaneDoe" }] },
            { thoughtText: "I love MongoDB!", username: "JaneDoe", reactions: [{ reactionBody: "Couldn't agree more!", username: "JohnDoe" }] },
            { thoughtText: "Express is awesome!", username: "Alice", reactions: [{ reactionBody: "That's the spirit!", username: "Bob" }] },
            { thoughtText: "Typescript is amazing!", username: "Bob", reactions: [{ reactionBody: "Yes, indeed!", username: "Alice" }] }
        ];

        const thoughts = await Promise.all(thoughtsData.map(async (data) => {
            const newThought = new Thought({
                thoughtText: data.thoughtText,
                username: data.username,
                reactions: data.reactions
            });
            await newThought.save();
            await User.findOneAndUpdate(
                { username: data.username },
                { $push: { thoughts: newThought._id } }
            );
            return newThought;
        }));

        console.log('Thoughts and reactions added:', thoughts);

        // Randomly create friendships
        for (let i = 0; i < users.length; i++) {
            const randomIndex = Math.floor(Math.random() * users.length);
            // Ensure not to add oneself as friend
            if (users[i]._id !== users[randomIndex]._id) {
                await User.findByIdAndUpdate(users[i]._id, { $addToSet: { friends: users[randomIndex]._id } });
                await User.findByIdAndUpdate(users[randomIndex]._id, { $addToSet: { friends: users[i]._id } });
            }
        }

        console.log('Random friendships created.');

        // Close the connection
        mongoose.disconnect();
        console.log('Database seeded and connection closed');
    } catch (err) {
        console.error('Error seeding database:', err);
        mongoose.disconnect();
    }
}

seedDB();
