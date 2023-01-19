const data = require('./zips.json');

module.exports.lookupByZipCode =  (zip) => {
    let found = false; //for display purpose
    for(var i = 0; i<data.length;i++){
        if (zip === data[i]._id){
            console.log(data[i]);
            found = true; //setting this true will make sure the next if condition isn't executed if a match is found
        }
    }
    if(found === false){ //execute when no match was found.
        console.log("undefined");
    }
};

module.exports.lookupByCityState = (city, state) => {
    let found = false; //for display purpose
    let myObj={}; //new object to store rearranged data object
    let myArray=[]; // an array to display myzipAndpop objects
    for(var i = 0; i<data.length;i++){
        let myzipAndpop = {} // object to store zip and pop and update within for loop
        myObj["city"] = city;
        myObj["state"]= state;
        if (city === data[i].city && state === data[i].state){
            found = true;
            myzipAndpop["zip"] = data[i]._id;
            myzipAndpop["pop"]= data[i].pop;
            myArray.push(myzipAndpop);
            myObj["data"]= myArray;
        }
        if (found === false){
            myObj["data"]= [];
        }
    }
    console.log(myObj); //display the re arranged data object just like the hw screenshot
};

module.exports.getPopulationByState = (state) => {
    let found = false; //for display purpose
    let populationObj = {};
    populationObj["state"] = state;
    var totalPop = 0;
    for(var i = 0; i<data.length;i++){
        if(state === data[i].state){
            totalPop += data[i].pop;
        }
    }
    populationObj["pop"] = totalPop;
    console.log(populationObj);

  
};

