Project Name

"test task for Codebridge"

Installation

# Clone the repository

git clone https://github.com/YuliiaGagina/test-codebridge.git

# Change to the project directory

cd test-codebridge

# Install dependencies

npm install

Usage

# Start the application

npm start

# Start dev version

npm run start:dev

Example Endpoints
GET/ping: See version
GET /dogs: Retrieve a list of all dogs.
POST /dogs: Add a new dog to the database.
DELETE /dogs/id: Remove a dog from the database.

# example of body json if you want to add a new dog

{
"name": "Hero",
"color": "White",
"tail_length": 20,
"weight": 10
}
