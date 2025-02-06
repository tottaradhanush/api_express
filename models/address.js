const mongodb = require('mongoose');


const address_schema = new mongodb.Schema({
  door_no: { type: String, required: true },
  street_name: { type: String, required: true },
  area: { type: String, required: true },
  district: { type: String, required: true },
  pincode: { type: Number, required: true },
  phone_number: { type: Number, required: true },
});

const Address = mongodb.model('Address', address_schema);
module.exports = Address;
