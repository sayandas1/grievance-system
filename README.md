Authentication Endpoints:

POST /auth/login
Request Body: { "email": "user@example.com", "password": "password" }
Response: JWT token on successful login.

POST /auth/register
Request Body: { "email": "user@example.com", "password": "password", "role": "employee" }
Response: Success message on successful registration.

Grievances Endpoints:

POST /grievances
Request Body: { "issue": "Description of the grievance" }
Authentication: Required
Response: Created grievance object.

GET /grievances
Authentication: Required
Response: Array of all grievances.

PATCH /grievances/:id
Request Body: { "status": "resolved" }
Authentication: Required
Response: Updated grievance object.

Chat Endpoints:

POST /chat/:grievanceId
Request Body: { "message": "Message content" }
Authentication: Required
Response: Created message object.

GET /chat/:grievanceId
Authentication: Required
Response: Array of all messages for the specified grievance.
