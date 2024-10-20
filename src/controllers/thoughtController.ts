import { Request, Response } from 'express';
import Thought from '../models/thought.js';  // Ensure the import is correct

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
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'No thought with that ID' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const newThought = await Thought.create(req.body);
    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json(err);
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
  