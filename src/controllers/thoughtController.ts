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
