## EXPRESS SERVER
Handles requests from front end to database, with CORS and Morgan as middleware features. Also included express json to help parse the data. 

### Execution
In the terminal, run:
- `npm run start-dev` for development server (listens for code changes on server)
- `npm run start` for production server
- *Note: to shutdown the server (and free the port), use **Ctrl+C***  
If a port gets stuck for whatever reason, run (as admin+ for MacOS): `lsof -i :3000` and then `kill -9 <PID>`.
If a port gets stuck for windows, run: `netstat -ano | findstr :3000` and then `taskkill /PID <PID> /F`

#### Using MVC:
  - **Model**: Handles queries to the database
  - **Controller**: Parsing/Formatting of results return from model (using callbacks)
  - **Route**: End-points for querying; data addresses
  - **index.js**: main entry for server, will handle basic endpoints and some security (cross-site scripting, etc.) 

#### Resources:
- [Express JS](https://expressjs.com/)