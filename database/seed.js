// eslint-disable-next-line import/no-extraneous-dependencies
const { Faker } = require('fakergem');
const db = require('./index.js');

const storeSeed = 4;
const guideSeed = 10;
const customerSeed = 10;

// delete the previous data from Store schema so as to not overload it
async function clearDatabase() {
  await db.Store.deleteMany()
    .then((data) => console.log(`  🗑️   'Store' schema cleared    - Deleted ${data.deletedCount} entries.`))
    .catch((err) => console.error(`  ❌  Unable to clear Store schema, error: ${err.message}.`));

  // delete the previous data from Guide scehma so as to not overload it (fresh)
  await db.Guide.deleteMany()
    .then((data) => console.log(`  🗑️   'Guide' schema cleared    - Deleted ${data.deletedCount} entries.`))
    .catch((err) => console.error(`  ❌  Unable to clear Guide schema, error: ${err.message}.`));

  // delete the previous data from Customer schema so as to not overload it
  await db.Customer.deleteMany()
    .then((data) => console.log(`  🗑️   'Customer' schema cleared - Deleted ${data.deletedCount} entries.`))
    .catch((err) => console.error(`  ❌  Unable to clear Customer schema, error: ${err.message}.`));
}

async function generateData() {
  /* ************ seed data for 4 stores ************ */
  const stores = [];
  const shopNames = ["Yogi's Goldfish Emporium", "Scott's Ole Tackle", "George's Fly Fishing Unlimited", "Josh's Fishing Tackle"];
  const shopWebsites = ['https://www.golfish.emp', 'https://www.oletackle.com', 'https://www.flyfishingulim.com', 'https://www.fishtackle.com'];
  const shopEmails = ['yogi@golfish.emp', 'scott@oletackle.com', 'george@flyfishingulim.com', 'josh@fishtackle.com'];
  for (let i = 1; i <= storeSeed; i += 1) {
    // make some calendar bookings for each store
    const calendar = [];
    const numberOfBookings = Math.floor((Math.random() * 101) + 500); // 500 - 600 bookings
    console.log(` >>> Generating ${numberOfBookings} bookings for ${shopNames[i - 1]}.`);
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
        id: j * Math.floor(Math.random() * storeSeed * 3939),
        accommodations: 'None',
        booked: Faker.Random.element([-2, -1, 0, 1]),
        cancellationHours: Faker.Random.element([24, 48, 72, 96]),
        customerId: Faker.Number.between(1, customerSeed),
        endDate: datetime.setHours(hour + (Math.floor((Math.random() * 3) + 1))),
        experience: Faker.Random.element(['Beginner', 'Novice', 'Advanced', 'Pro', 'Expert']),
        guide: Faker.Name.firstName(),
        // location: Faker.Address.city().concat(', ').concat(Faker.Address.state()),
        location: Faker.Address.state(),
        notes: Faker.Matz.quote(),
        price: Faker.Number.between(25, 100) * 4,
        groupSize: Faker.Number.between(1, 6),
        startDate: datetime.setHours(hour),
      };
      // add each generated booking to array (for db)
      calendar.push(newBooking);
    }

    // for all of store info
    const store = {
      name: shopNames[i - 1],
      logo: Faker.Company.logo(),
      details: Faker.Hipster.sentences(5).join(' '),
      phoneNumber: Faker.Random.element(['303-', '720-']).concat(Faker.PhoneNumber.exchangeCode().concat('-').concat(Faker.PhoneNumber.subscriberNumber())),
      emailAddress: shopEmails[i - 1],
      websiteUrl: shopWebsites[i - 1],
      hours: '\n     Mon-Fri: '.concat(Faker.Number.between(7, 10)).concat('-').concat(Faker.Number.between(4, 6)).concat('\n     Sat-Sun: '.concat(Faker.Number.between(7, 10)).concat('-').concat(Faker.Number.between(1, 3))),
      calendar,
    };
    // add each store data created to array (for db)
    stores.push(store);
  }

  // generate some guide data (guides on website)
  const guides = [];
  for (let i = 1; i <= guideSeed; i += 1) {
    // for all of customer info
    const guide = {
      avatar: Faker.Avatar.image(),
      emailAddress: Faker.Internet.freeEmail(),
      location: Faker.Address.state(),
      name: Faker.Name.name(),
      phoneNumber: Faker.Random.element(['303-', '720-']).concat(Faker.PhoneNumber.exchangeCode().concat('-').concat(Faker.PhoneNumber.subscriberNumber())),
    };
    // add each customer data created to array (for db)
    guides.push(guide);
  }

  // generate some customers (users on website)
  const customers = [];
  for (let i = 1; i <= customerSeed; i += 1) {
    // for all of customer info
    const customer = {
      avatar: Faker.Avatar.image(),
      emailAddress: Faker.Internet.freeEmail(),
      location: Faker.Address.state(),
      name: Faker.Name.name(),
      phoneNumber: Faker.Random.element(['303-', '720-']).concat(Faker.PhoneNumber.exchangeCode().concat('-').concat(Faker.PhoneNumber.subscriberNumber())),
    };
    // add each customer data created to array (for db)
    customers.push(customer);
  }

  // add all generated data to the 'Store' schema
  await db.Store.insertMany(stores)
    .then(() => console.log(`  🌱  Created ${stores.length} new 'Store' seeds, planted into 'Store' schema.`))
    .catch((err) => console.error(`  ❌  Error seeding data to Store schema: ${err.message}.`));

  await db.Guide.insertMany(guides)
    .then(() => console.log(`  🌱  Created ${guides.length} new 'Guide' seeds, planted into 'Guide' schema.`))
    .catch((err) => console.error(`  ❌  Error seeding data to Guide schema: ${err.message}.`));

  // add all generated data to the 'Customer' schema
  await db.Customer.insertMany(customers)
    .then(() => console.log(`  🌱  Created ${customers.length} new 'Customer' seeds, planted into 'Customer' schema.`))
    .catch((err) => console.error(`  ❌  Error seeding data to Customer schema: ${err.message}.`))
    .finally(() => {
      console.log('  👋  Exiting seed script...');
      process.exit();
    });
}

async function runFunction() {
  await clearDatabase();
  await generateData();
} runFunction();
