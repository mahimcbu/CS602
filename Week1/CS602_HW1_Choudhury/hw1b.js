const cities = require('./zipCodeModule_v2');
const colors = require('colors');


console.log("Lookup by zip code: 02215".red);
cities.lookupByZipCode("02215");
console.log("\n");

console.log("Lookup by zip code: 99999".red);
cities.lookupByZipCode("99999");
console.log("\n");


console.log("Lookup by city, state: BOSTON, MA".red);
cities.lookupByCityState("BOSTON", "MA");
console.log("\n");

console.log("Lookup by city, state: BOSTON, TX".red);
cities.lookupByCityState("BOSTON", "TX");
console.log("\n");

console.log("Lookup by city, state: BOSTON, AK".red);
cities.lookupByCityState("BOSTON", "AK");
console.log("\n");

console.log("Get population by state: MA".red);
cities.getPopulationByState("MA");
console.log("\n");

console.log("Get population by state: TX".red);
cities.getPopulationByState("TX");
console.log("\n");

console.log("Get population by state: AA".red);
cities.getPopulationByState("AA");
console.log("\n");