Project Explanation: 

Step1: We need certain libraries and tools to support authentication, user management, document management, and interactions with the Python backend
for that we're installing certain dependencies: 
We need JWT for authentication, bcrypt for password hashing, and Passport.js for authentication strategies:

npm install @nestjs/jwt passport passport-jwt bcryptjs @nestjs/passport
npm install --save-dev @types/bcryptjs
npm install pg typeorm @nestjs/typeorm
npm install class-validator class-transformer
npm install multer


Step 2: Authentication APIs (Register, Login, Logout)

User Registration: Allow users to sign up by providing a email and password.
User Login: Users log in with their credentials, and if valid, they receive a JWT token.
User Logout: Involves removing/deleting the token on the client side.


Step 3: User Management (Roles, Permissions)
The next feature is User Management, which should support roles and permissions like admin, editor, and viewer.


Step 4: Document Management (CRUD, Uploads)
For Document Management, you will handle CRUD operations on documents (create, read, update, delete), as well as file uploads.

Step 5: Ingestion Trigger API
Created an API endpoint (POST /ingestion/trigger/:documentId)
Called the Python backend using HttpService
Handled errors properly
Configured the module to use HttpModule and ConfigModule
Tested the API with Postman.


