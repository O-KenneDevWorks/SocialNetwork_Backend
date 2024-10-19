/* Components
    thoughtText 
        String
        Required
        Must be between 1 and 280 characters
    createdAt 
        Date
        Set default value to the current timestamp
        Use a getter method to format the timestamp on query
    username string required
        String
        Required
    reactions
        Array of nested documents created with the reactionSchema

    Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
*/