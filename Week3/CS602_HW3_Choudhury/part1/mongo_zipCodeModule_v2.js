const MongoClient = require('mongodb').MongoClient;
const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let client = null;

const getConnection = async () => {
	if (client == null)
		client = await MongoClient.connect(dbUrl,  { useNewUrlParser: true ,  useUnifiedTopology: true });
	return client;
}

module.exports.lookupByZipCode =  async (zip) => {
		
	let client = await getConnection();
	let collection = client.db(credentials.database).collection('zipcodes');
	
	let result = await collection.find({'_id': zip}).toArray();
	
	if (result.length > 0)
		return result[0];
	else
		return undefined;
};

// Complete the code for the following

module.exports.lookupByCityState = async (city, state) => {

	let client = await getConnection();
	let collection = client.db(credentials.database).collection('zipcodes');
	
	// Fill in the rest
	let result2=  await collection.find({'city': city,'state': state}).toArray();
	let myObj = {};
    let myArray=[];
	myObj["city"]= city;
    myObj["state"]= state;
	const place = result2.filter(e =>{ //filter out the places for the given city and state
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
module.exports.getPopulationByState = 
	async (state) => {

		let client = await getConnection();
		let collection = client.db(credentials.database).collection('zipcodes');
	
		// Fill in the rest
		let result3=  await collection.find({'state': state}).toArray();

		let myObj = {};
        myObj["state"]= state;
		const totalPop = result3.reduce((total, e)=>{
            if(state === e.state) return total + e.pop;
            else return total;
        },0);
        myObj["pop"]=totalPop;
        return (myObj);
	};

