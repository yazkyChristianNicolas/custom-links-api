var Template = require('../models/TemplatesModel');

module.exports = {

    save: function(newTemplate) {       
        let template = new Template(newTemplate);
        template.id = template._id;
        return template.save();
    },

    findByName: function(name) {
        return Template.findOneAsync({ 'name': name });
    },

    findById: function(id) {
        return Template.findOne({ 'id': id }).execAsync();
    },

    update: function(template) {
        return Template.findOneAndUpdateAsync({ 'id': template.id }, { $set: template }, { new: true });
    },

    delete: function(template){
          return Template.findOneAndRemoveAsync({ 'id': template.id});
    }
}




