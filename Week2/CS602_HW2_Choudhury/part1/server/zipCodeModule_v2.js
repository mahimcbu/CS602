const data = require('./zips.json');

module.exports.lookupByZipCode =  (zip) => {
	let findMe = data.find((e) => {
        if (e._id === zip) return true;
        else return undefined});
    return(findMe);
};

module.exports.lookupByCityState = (city, state) => {
    let found = false; //for display purpose
    let myObj = {};
    let myArray=[];
    myObj["city"]= city;
    myObj["state"]= state;
	const place = data.filter(e =>{ //filter out the places for the given city and state
        if (e.city === city && e.state === state){
            found = true;
            return true;
        }
        if (found === false){
            myObj["data"]= [];
        }
    });
   const zip_pop= place.map(e=>{ //map the place array object to extract the zip and pop
        let myzipAndpop = {} // object to store zip and pop and update within for loop
        myzipAndpop["zip"]=e._id;
        myzipAndpop["pop"]=e.pop;
        myArray.push(myzipAndpop);
        myObj["data"]= myArray;
        
    });
    
    return(myObj);
};

module.exports.getPopulationByState = (state) => {
        let myObj = {};
        myObj["state"]= state;
		const totalPop = data.reduce((total, e)=>{
            if(state === e.state) return total + e.pop;
            else return total;
        },0);
        myObj["pop"]=totalPop;
        return (myObj);

};

