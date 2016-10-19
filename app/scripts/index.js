// console.log("Hello World!");
var $ = require('jquery');
var views = require('./views/contact');
var models = require('./models/contact');



//DOM Ready
$(function(){
  var contactCollection = new models.ContactCollection();

  var contactForm = new views.ContactFormView({collection: contactCollection});
  contactForm.setElement($('#form-group')[0]);

  var contactList = new views.ContactListView({collection: contactCollection});
  $('.app').append(contactList.render().el);


contactCollection.fetch();




});
