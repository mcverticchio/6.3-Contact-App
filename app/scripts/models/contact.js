var Backbone = require('backbone');

var Contact = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    visible: true
  }
});

var ContactCollection = Backbone.Collection.extend({
  model: Contact,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/carolinescontacts'
});


module.exports = {
  Contact: Contact,
  ContactCollection: ContactCollection
};
