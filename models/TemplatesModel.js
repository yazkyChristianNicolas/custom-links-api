var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TemplateSchema = new Schema({
	id: { type: String },
  	name: { type: String},
  	preview_img: { type: String},
	template: { type: String},
    type: { type: String},
	creation_date:{ type: Date, default: Date.now }
}, { collection : 'Templates' });

var Template = mongoose.model('Template', TemplateSchema);

module.exports = Template;