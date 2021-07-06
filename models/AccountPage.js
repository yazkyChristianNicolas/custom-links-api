var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PageSchema = new Schema({
	id: { type: String },
  	name: { type: String},
    title: { type: String},
    fav_ico: { type: String},
    rendered_page:{ type: String},
    profile: {
        name:{
            value: { type: String},
            style: {type: String}
        },
        img:{
            value: { type: String},
            style: {type: String}
        },
        detail:{
            value: { type: String},
            style: {type: String}
        },
    },
    background_style:{ type: String},
    links:{
        style: {type: String},
        buttons:[
            {
                text: { type: String},
                url: { type: String},
                style: {type: String},
                ïmg:{type: String},
                icon:{type: String},
            }
        ]
    },
	template: {type: Schema.Types.ObjectId, ref: 'Template'},
    type: { type: String},
	creation_date:{ type: Date, default: Date.now }
}, { collection : 'Pages' });

var Template = mongoose.model('Page', PageSchema);

module.exports = Template;