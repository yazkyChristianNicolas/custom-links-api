var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AccountSchema = new Schema({
	id: { type: String },
  	email: { type: String},
  	password: { type: String},
	page: {type: Schema.Types.ObjectId, ref: 'Page'},
	type: { type: String},
	creation_date:{ type: Date, default: Date.now }
}, { collection : 'Accounts' });

var Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
