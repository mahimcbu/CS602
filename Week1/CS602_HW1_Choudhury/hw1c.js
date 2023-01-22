const colors = require('colors');
const { lookupByCityState } = require('./zipCodeModule_v2');

const ZipCodeEmitter = require('./zipCodeEmitter').ZipCodeEmitter;

const cities = new ZipCodeEmitter();

console.log("Lookup by zip code: 02215".red);
cities.on("lookupByZipCode", (args)=>{
    console.log("Event lookupByZipCode raised!".blue, colors.blue(args));
});

cities.lookupByZipCode("02215");
console.log("\n");

console.log("Lookup by city, state: BOSTON, MA".red);
cities.on("lookupByCityState",((arg1,arg2)=>{
    console.log("Event lookupByCityState raised! (Handler1)\n".blue, arg1, arg2);
}));
console.log("\n");

cities.on("lookupByCityState",((obj)=>{
    const display = (data)=>{
        for(var i = 0 ; i<data.length;i++){
            console.log(colors.blue("  "+data[i].zip+" has population of "+data[i].pop));
        }
    }
    console.log(colors.blue("\nEvent lookupByCityState raised! (Handler2)\n"+"City: "+obj.city+", State: "+obj.state));
    display(obj.data)
}));


cities.lookupByCityState("BOSTON", "MA");
console.log("\n");



console.log("Get population by state: MA".red);


cities.on("getPopulationByState", (args)=>{
    console.log("Event getPopulationByState raised!\n".blue, colors.blue(args));
});

cities.getPopulationByState("MA");



