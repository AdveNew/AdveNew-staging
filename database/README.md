## MONGODB DATABASE
Schema setup for Stores and Customers.

#### Seed data
 - `npm run seed`: fills database with 100 companies and 100 customers.

#### Schema notes
  1. *Store* schema's *booked* entity logic:
    - -2 = 'Cancelled'
    - -1 = 'Requested'
    - 0  = 'Available'
    - 1  = 'Booked'
  2. Any changes to a schema most likely will break any front-end queries.

#### Test/Review data query
 - Go to: http://localhost:3000/api/calendar?storeId=3, where *storeId* param could be any number from 1-100.
 - [Postman](https://www.postman.com/), an awsome fucking platform, could also be used for this.

#### Resources
  1. [fakergem](https://github.com/mrstebo/fakergem) - used for generating data for db, installed as a dev dependency via npm.
  2. [mongoDB](https://docs.mongodb.com/manual/)
  3. [mongoose - mongoDB on node.js](https://mongoosejs.com/)