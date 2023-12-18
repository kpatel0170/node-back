/**
 * @api {get} /v1/users Retrieve all users
 * @apiDescription Retrieve all users from the database
 * @apiVersion 1.0.0
 * @apiName GetAllUsers
 * @apiGroup Users
 * @apiPermission authenticated
 *
 * @apiSuccess (OK 200) {Array} data List of user objects
 * @apiSuccess (OK 200) {Object} data.user User's information
 * @apiSuccess (OK 200) {String} data.user.id User's unique ID
 * @apiSuccess (OK 200) {String} data.user.name User's name
 * @apiSuccess (OK 200) {String} data.user.email User's email
 * @apiSuccess (OK 200) {Date} data.user.createdAt User's creation date
 *
 * @apiError (Conflict 409) NoUsersFound No users found
 */

/**
 * @api {get} /v1/users/:userId Retrieve a user by ID
 * @apiDescription Retrieve a user based on their unique ID
 * @apiVersion 1.0.0
 * @apiName GetUserByID
 * @apiGroup Users
 * @apiPermission authenticated
 *
 * @apiParam {String} userId User's unique ID
 *
 * @apiSuccess (OK 200) {Object} data User object
 * @apiSuccess (OK 200) {String} data.id User's unique ID
 * @apiSuccess (OK 200) {String} data.name User's name
 * @apiSuccess (OK 200) {String} data.email User's email
 * @apiSuccess (OK 200) {Date} data.createdAt User's creation date
 *
 * @apiError (Conflict 409) NoUsersFound No user found
 * @apiError (Unauthorized 401) Unauthorized User is not authorized
 * @apiError (Not Found 404) UserNotFound User not found
 */

/**
 * @api {put} /v1/users/:userId Update User
 * @apiDescription Update a user's details based on their unique ID
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiPermission authenticated
 *
 * @apiParam {String} userId User's unique ID
 * @apiParam {Object} userData User's updated information
 * @apiParam {String} userData.name Updated user's name
 * @apiParam {String} userData.email Updated user's email
 * @apiParam {String} userData.password Updated user's password
 *
 * @apiSuccess (OK 200) {String} message Success message
 * @apiSuccess (OK 200) {Object} data Updated user object
 * @apiSuccess (OK 200) {String} data.id User's unique ID
 * @apiSuccess (OK 200) {String} data.name User's updated name
 * @apiSuccess (OK 200) {String} data.email User's updated email
 * @apiSuccess (OK 200) {Date} data.createdAt User's creation date
 *
 * @apiError (Conflict 409) NoUsersFound No user found
 * @apiError (Unauthorized 401) Unauthorized User is not authorized
 * @apiError (Not Found 404) UserNotFound User not found
 */

/**
 * @api {delete} /v1/users/:userId Delete User
 * @apiDescription Delete a user based on their unique ID
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiPermission authenticated
 *
 * @apiParam {String} userId User's unique ID
 *
 * @apiSuccess (OK 200) {String} message Success message
 *
 * @apiError (Conflict 409) NoUsersFound No user found
 * @apiError (Unauthorized 401) Unauthorized User is not authorized
 * @apiError (Not Found 404) UserNotFound User not found
 */
