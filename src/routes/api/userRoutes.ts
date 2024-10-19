/*
/api/users

GET all users

GET a single user by its _id and populated thought and friend data

POST a new user (note that the examples below are just sample data):

{
    "username": "lernantino",
    "email": "lernantino@gmail.com"
}
PUT to update a user by its _id

DELETE to remove user by its _id

BONUS: Remove a user's associated thoughts when deleted.

/api/users/:userId/friends/:friendId

POST to add a new friend to a user's friend list

DELETE to remove a friend from a user's friend list
*/

import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateSingleUser, 
    deleteUser, addFriend, deleteFriend } from '../../controllers/userController';

// GET all users
router.route('/').get(getUsers)

// Create user
router.route('/').post(createUser);

// Get single user
router.route('/:userId').get(getSingleUser);

// Update user
router.route('/:userId').put(updateSingleUser);

// Delete User
router.route('/:userId').delete(deleteUser);

// Add friend
router.route('/:userId/friends/:friendId').post(addFriend);

// Delete friend
router.route('/:userId/friends/:friendId').delete(deleteFriend);

export default router;
