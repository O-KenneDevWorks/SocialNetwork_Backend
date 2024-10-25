/*
/api/thoughts

GET to get all thoughts

GET to get a single thought by its _id

POST to create a new thought. Don't forget to push the created thought's _id to the associated user's thoughts array field. (note that the examples below are just sample data):

{
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino",
    "userId": "5edff358a0fcb779aa7b118b"
}
PUT to update a thought by its _id

DELETE to remove a thought by its _id

/api/thoughts/:thoughtId/reactions

POST to create a reaction stored in a single thought's reactions array field

DELETE to pull and remove a reaction by the reaction's reactionId value
 */

import { Router } from 'express';
import {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtController.js';

const router = Router();

// GET all thoughts
router.get('/', getThoughts);

// GET a single thought by its _id
router.get('/:thoughtId', getSingleThought);

// POST a new thought
router.post('/', createThought);

// PUT to update a thought by its _id
router.put('/:thoughtId', updateThought);

// DELETE to remove a thought by its _id
router.delete('/:thoughtId', deleteThought);

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', addReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', removeReaction)

export default router;