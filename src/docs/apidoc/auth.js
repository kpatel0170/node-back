/**
 * @api {post} /auth/register Register
 * @apiDescription Register a new user
 * @apiVersion 1.0.0
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam {String} name User's name
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password (min length: 6 characters)
 *
 * @apiSuccess (Created 201) {String} message Registration success message
 * @apiSuccess (Created 201) {Object} data User's data (id, name, email, role, createdAt)
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Conflict 409) DuplicateValueError The email is already registered
 */

/**
 * @api {post} /auth/login Login
 * @apiDescription Login with registered credentials
 * @apiVersion 1.0.0
 * @apiName LoginUser
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 *
 * @apiSuccess (OK 200) {String} message Login success message
 * @apiSuccess (OK 200) {Object} data User's data (id, name, email, role, createdAt)
 * @apiSuccess (OK 200) {String} token JWT Access Token
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Unauthorized 401) AuthenticationError Invalid email or password
 */

/**
 * @api {get} /auth/logout Logout
 * @apiDescription Logs out the user
 * @apiVersion 1.0.0
 * @apiName LogoutUser
 * @apiGroup Auth
 * @apiPermission authenticated
 *
 * @apiSuccess {Boolean} data False if logged out successfully
 */

/**
 * @api {get} /auth/google Google OAuth
 * @apiDescription Initiates Google OAuth authentication
 * @apiVersion 1.0.0
 * @apiName GoogleOAuth
 * @apiGroup Auth
 * @apiPermission public
 */

/**
 * @api {get} /auth/google/callback Google OAuth Callback
 * @apiDescription Callback route for Google OAuth authentication
 * @apiVersion 1.0.0
 * @apiName GoogleOAuthCallback
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiSuccess {String} data Redirects to '/success' route after successful authentication
 */
