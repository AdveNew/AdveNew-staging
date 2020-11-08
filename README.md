# AdveNew-v1
Web Application for hosted services

### Requirements
Install: 
- npm
- MongoDB

### Development
Once repo is cloned/pulled, run the follow commands in the root directory of the project (where `package.json` is)
- `npm install`: installs dependencies

### Execution
Before starting the server or bundling the front end, make sure to seed the database `npm run seed`. This will fill the database with 100 stores and 100 customers. 

To get the server up and running, run any combination of 1 even and 1 odd command (two different cmd windows). While developing, it's best to run #3 and #4.
1. `npm start`: starts express server, doesn't watch for updates
2. `npm run build`: creates a bundle of any react code to serve up
3. `npm run start-dev`: starts express server, watches for updates
4. `npm run build-dev`: creates a bundle of any react code to serve up, rebundles on any save within client/src directory

### Sub Readme's
- [Server Readme](/server/README.md)
- [Database Readme](/database/README.md)
- [Client (Front end) Readme](/client/README.md)