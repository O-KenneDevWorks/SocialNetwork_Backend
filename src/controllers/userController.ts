import { User } from '../models/index.js';
import { Request, Response } from 'express';


  // Get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get a single user
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      console.log('Fetching user with ID:', req.params.userId);
      const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
      
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
        return;
      }
      res.json(user);
    } catch (err) {
      if (err instanceof Error) { // Type guard
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  // create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Delete a user and associated apps
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'User and associated apps deleted!' })
      
    } catch (err) {
      res.status(500).json(err);
      
    }
  }

  export const updateSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { name: req.params.name },
        req.body.update,
        { new: true, runValidators: true }
      );
      
      res.status(200).json(user);
      console.log(`updated: ${user}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  }

  export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {
        $addToSet: { friends: req.params.friendId }
      }, { new: true });
      if (!user) {
         res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const deleteFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {
        $pull: { friends: req.params.friendId }
      }, { new: true });
      if (!user) {
        res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
