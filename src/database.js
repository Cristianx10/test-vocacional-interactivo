const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern-crud-test';

const Auth =  {
  auth:{
    user:"cristianx10",
    password:""
  }
};

mongoose.connect(URI, Auth)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));



  /*
  // Connect using MongoClient
MongoClient.connect(
  "mongodb+srv://cluster0-lyy4u.mongodb.net/tienda",
  
 
  , function(err, client) {
  baseDatos = client.db(dbName);

  app.listen(process.env.PORT || 1234);
  //client.close();
});

*/

module.exports = mongoose;
