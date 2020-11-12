// eslint-disable-next-line import/no-extraneous-dependencies
const { Faker } = require('fakergem');
const db = require('./index.js');

const storeSeed = 100;
const customerSeed = 100;

// delete the previous data from Store schema so as to not overload it
async function clearDatabase() {
  await db.Store.deleteMany()
    .then((data) => console.log(`  🗑️   'Store' schema cleared    - Deleted ${data.deletedCount} entries.`))
    .catch((err) => console.error(`  ❌  Unable to clear Store schema, error: ${err.message}.`));

  // delete the previous data from Customer schema so as to not overload it
  await db.Customer.deleteMany()
    .then((data) => console.log(`  🗑️   'Customer' schema cleared - Deleted ${data.deletedCount} entries.`))
    .catch((err) => console.error(`  ❌  Unable to clear Customer schema, error: ${err.message}.`));
}

async function generateData() {
  /* ************ seed data for 100 stores ************ */
  const stores = [];
  for (let i = 1; i <= storeSeed; i += 1) {
    // make some calendar bookings for each store
    const calendar = [];
    const numberOfBookings = Math.floor((Math.random() * 31) + 30); // 30 - 60 bookings
    for (let j = 1; j <= numberOfBookings; j += 1) {
      // creates dates 3 months forward and 3 months back
      const datetime = Faker.Time.between(
        Faker.Time.forward(90),
        Faker.Time.backward(90),
        Faker.Time.DAY,
      );
      const hour = Math.floor((Math.random() * 7) + 8); // hours 0800 - 1500 (odd, I know)
      datetime.setMinutes(Math.floor((Math.random() * 1.5)) * 30); // on the hour, or half hour
      const newBooking = {
        id: j,
        startDate: datetime.setHours(hour),
        endDate: datetime.setHours(hour + (Math.floor((Math.random() * 3) + 1))),
        guide: Faker.Name.firstName(),
        price: Faker.Number.between(75, 280),
        booked: Faker.Boolean.boolean(),
        customerName: Faker.Name.name(), // eventually tie to customer schema
        experience: Faker.Random.element(['Beginner', 'Novice', 'Advanced', 'Pro', 'Expert']),
        notes: Faker.Matz.quote(),
      };
      // add each generated booking to array (for db)
      calendar.push(newBooking);
    }

    // make some custom bookings requests
    const customBookings = [];
    const numberOfCustomerBookings = Math.floor((Math.random() * 11) + 20); // 20-30 custom bookings
    // creates dates 4 months forward
    const datetime = Faker.Time.forward(90, Faker.Time.DAY);
    const hour = Math.floor((Math.random() * 7) + 8); // hours 0800 - 1500 (odd, I know)
    datetime.setMinutes(Math.floor((Math.random() * 1.5)) * 30); // on the hour, or half hour
    for (let j = 0; j < numberOfCustomerBookings; j += 1) {
      const newBooking = {
        startDate: datetime.setHours(hour),
        endDate: datetime.setHours(hour + (Math.floor((Math.random() * 3) + 1))),
        guide: Faker.Name.firstName(),
        price: Faker.Number.between(75, 280),
        booked: Faker.Boolean.boolean(),
        customerName: Faker.Name.name(), // eventually tie to customer schema
        experience: Faker.Random.element(['Beginner', 'Novice', 'Advanced', 'Pro', 'Expert']),
        notes: Faker.Matz.quote(),
      };
      // add each generated booking to array (for db)
      customBookings.push(newBooking);
    }

    // for all of store info
    const storeAll = {
      storeId: i,
      name: `${Faker.Name.firstName().concat("'s")} ${Faker.Team.sport().replace(/\b./g, (a) => a.toUpperCase())} ${Faker.Company.suffix()}`,
      logo: Faker.Company.logo(),
      phrase: Faker.Hipster.sentences(3).join(' '),
      phoneNumber: Faker.Random.element(['303-', '720-']).concat(Faker.PhoneNumber.exchangeCode().concat('-').concat(Faker.PhoneNumber.subscriberNumber())),
      emailAddress: Faker.Internet.email(),
      websiteUrl: Faker.Internet.url(),
      hours: '\n     Mon-Fri: '.concat(Faker.Number.between(7, 10)).concat('-').concat(Faker.Number.between(4, 6)).concat('\n     Sat-Sun: '.concat(Faker.Number.between(7, 10)).concat('-').concat(Faker.Number.between(1, 3))),
      calendar,
      calendar_request: customBookings,
    };
    // add each store data created to array (for db)
    stores.push(storeAll);
  }

  // generate some customers (users on website)
  const customers = [];
  for (let i = 0; i < customerSeed; i += 1) {
    // for all of customer info
    const customerAll = {
      name: Faker.Name.name(),
      avatar: Faker.Avatar.image(),
      phoneNumber: Faker.PhoneNumber.cellPhone(),
      emailAddress: Faker.Internet.freeEmail(),
    };
    // add each customer data created to array (for db)
    customers.push(customerAll);
  }

  // add all generated data to the 'Store' schema
  await db.Store.insertMany(stores)
    .then(() => console.log(`  🌱  Created ${stores.length} new seeds, planted into 'Store' schema.`))
    .catch((err) => console.error(`  ❌  Error seeding data to Store schema: ${err.message}.`));

  // add all generated data to the 'Customer' schema
  await db.Customer.insertMany(customers)
    .then(() => console.log(`  🌱  Created ${stores.length} new seeds, planted into 'Customer' schema.`))
    .catch((err) => console.error(`  ❌  Error seeding data to Customer schema: ${err.message}.`))
    .finally(() => {
      console.log('  👋  Exiting seeder script...');
      process.exit();
    });
}

async function runFunction() {
  await clearDatabase();
  await generateData();
} runFunction();
