import { Request, Response } from 'express';
import {User, Thought } from '../models/index.js';
// import User from '../models/user.js';

// Get all thoughts
export const getThoughts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single thought by ID
export const getSingleThought = async (req: Request, res: Response): Promise<void> => {
    try {
      // Fetch the thought by ID provided in the route parameter
      const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
  
      if (!thought) {
        res.status(404).json({ message: 'No thought found with that ID' });
        return;
      }
  
      // Respond with the found thought
      res.status(200).json(thought);
    } catch (err) {
      if (err instanceof Error) { // Type guard
        console.error("Error fetching thought:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  };

// Create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
    try {
        // Create a new thought from the request body
        const newThought = await Thought.create({
          thoughtText: req.body.thoughtText,
          username: req.body.username,
        });
    
        // Update the user's thoughts array with the new thought's ID
        const userUpdate = await User.findOneAndUpdate(
          { username: req.body.username }, // Using username to find user; ensure it's unique or use _id
          { $push: { thoughts: newThought._id } }, // Push the new thought's ID to the user's thoughts array
          { new: true }  // Returns the updated user document
        );
    
        if (!userUpdate) {
          // If no user is found or the update fails
          res.status(404).json({ message: 'User not found, thought not linked' });
          return;
        }
    
        // Respond with the newly created thought
        res.status(201).json(newThought);
      } catch (err) {
        if (err instanceof Error) {
          // Improved error handling with more specific error information
          res.status(500).json({ error: 'Internal Server Error', details: err.message });
        } else {
          res.status(500).json({ error: "An unexpected error occurred" });
        }
      }
    };

// Update an existing thought by ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!thought) {
      res.status(404).json({ message: 'No thought with this ID' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'No thought with this ID' });
      return;
    }
    res.json({ message: 'Thought deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this ID' });
        return;
      }
      thought.reactions.push(req.body);  // Assuming req.body contains { reactionBody, username }
      await thought.save();
      res.json({ message: 'Reaction added successfully', thought });
    } catch (err) {
        if (err instanceof Error) { // Type guard
          res.status(500).json({ error: err.message });
        } else {
          res.status(500).json({ error: "An unexpected error occurred" });
        }
      }
  };
  
// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        // Ensure that the thoughtId and reactionId are provided
        const { thoughtId, reactionId } = req.params;
    
        // Perform the update to pull the reaction from the reactions array
        const updatedThought = await Thought.findByIdAndUpdate(
          thoughtId,
          { $pull: { reactions: { _id: reactionId } } }, // Use $pull to remove the reaction with the specified reactionId
          { new: true }  // Return the updated document
        );
    
        if (!updatedThought) {
          res.status(404).json({ message: 'No thought found with this ID, or reaction does not exist' });
          return;
        }
    
        res.json({ message: 'Reaction removed successfully', updatedThought });
      } catch (err) {
        if (err instanceof Error) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(500).json({ error: "An unexpected error occurred" });
        }
      }
  };
  