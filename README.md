# AdveNew-v1
> Web Application for our customers to connect with listed guides.

### Requirements
Install: 
- npm >=6.14.8 (check with `npm -v`)
- MongoDB >=[4.4.x](https://mongoosejs.com/docs/compatibility.html) (check with `mongo -version`)

### Development
Once repo is cloned/pulled, run the following command in the root directory of the project (where `package.json` is)
- `npm install`: installs dependencies

### Execution
Before starting the server or bundling the front end, make sure to seed the database `npm run seed`. This will fill the database with 100 stores and 100 customers. (or whatever amount) as a side note make sure mongodb has started if you installed for the first time. If installed with homebrew (Mac), `brew services start mongodb-community`.

To get the server up and running, run any combination of 1 even and 1 odd command (two different cmd windows). While developing, it's best to run #3 and #4.
1. `npm start`: starts express server, doesn't watch for updates
2. `npm run build`: creates a bundle of any react code to serve up
3. `npm run start-dev`: starts express server, watches for updates
4. `npm run build-dev`: creates a bundle of any react code to serve up, rebundles on any save within client/src directory
5. To help with quicker development, use the cmd `npm run dev` to get the server and webpack going together.

### Sub Readme's
- [Server Readme](/server/README.md)
- [Database Readme](/database/README.md)
- [Client (Front end) Readme](/client/README.md)

### useful git commands
1. `git status` see file changes, current branch
2. `git branch -b <BRANCH>` creates and switches to specific branch
2. `git add <FILES>` add files to commit/push (if all, just substitute `.` for `<FILES>`)
3. `git commit -m "<MESSAGE>"` stage added files with a meaningful message (ie 'added hashing for user passwords')
4. `git push origin <BRANCH>` push files to desired branch (avoid pushing straight to main, unless meaning to)
5. `git fetch origin main` before starting a new branch, this will bring in any changes to local main branch
5. `git remote update origin --prune` remove any deleted branches and pull in any branches created
8. `git branch -a` see all branches

### Demo v0.1.02 (2/19)
![V1](demo/v1_2-29_homepage.png)
