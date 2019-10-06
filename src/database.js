
const mongoose = require('mongoose');
const URI = 'mongodb+srv://admin:temporalpassword@dbcluster-wtqbv.mongodb.net/admin?retryWrites=true&w=majority';

mongoose.connect(URI)
  .then((cliente) =>{
    console.log('Db is connected', cliente.db)
  })
  .catch(error => console.error(error));

module.exports = mongoose;


