const prices = ([]);
const priceStart = 100;
const priceRange = 300;
for (let i = priceStart; i <= (priceRange + priceStart); i += 1) {
  const price = { id: i, color: 'grey', text: '$'.concat(i) };
  prices.push(price);
}

export default prices;
