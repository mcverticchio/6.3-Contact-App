window.$ = window.jQuery = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap');
var Backbone = require('backbone');
var contactItemTemplate = require('../../templates/contactitem.hbs');



var ContactListView = Backbone.View.extend({
  tagName: 'ul',
  attributes: {
    'class': 'contact-list col-md-12'
  },
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderContactItem);
  },
  // render: function(){
  //   return this;
  // },
  renderContactItem: function(contact){
    var contactItem = new ContactItemView({model: contact});
    this.$el.append(contactItem.render().el);
  }
});





var ContactItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template:  contactItemTemplate,
  events: {
    'click .delete': 'complete'
  },
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    // this.listenTo(this.model, 'changed', this.render);
    // this.listenTo(this.model, 'change:visible', this.toggleVisible);
  },

  render: function(){
    var context = this.model.toJSON();
    var renderedTemplate = this.template(context);

    this.$el.html(renderedTemplate);
    this.$el.html(this.model.get('form-group'));
    // this.$el.html(this.model.get('name'));
    // this.$el.html(this.model.get('email'));
    // this.$el.html(this.model.get('phonenumber'));
    // this.$el.html(this.model.get('birthday'));

    return this;
  },
  // hide: function(){
  //   this.model.set('visible', false);
  // },
  // toggleVisible: function(){
  //   this.$el.hide();
  // },
  complete: function(){
    confirmModal.model = this.model;
    confirmModal.show();
  }
});



var ContactFormView = Backbone.View.extend({
  events: {
    'submit' : 'addContact'
  },

  addContact: function(event){
    event.preventDefault();

    var nameForm = $('#name').val();
    this.collection.create({name: nameForm});
    $('#name').val('');

    var emailForm = $('#email').val();
    this.collection.create({email: emailForm});
    $('#email').val('');

    var phoneForm = $('#phone').val();
    this.collection.create({phone: phoneForm});
    $('#phone').val('');

    var birthdayForm = $('#birthday').val();
    this.collection.create({birthday: birthdayForm});
    $('#birthday').val('');

  }
});


var ContactConfirmModal = Backbone.View.extend({
  el: $('#confirm-delete')[0],
  events: {
    "click .btn-primary": 'delete',
  },
  hide: function(){
    this.$el.modal('hide');
  },
  show: function(){
    this.$el.modal('show');
  },
  delete: function(){
    this.model.destroy();

    this.hide();
  }
});

var confirmModal = new ContactConfirmModal();

module.exports = {
  ContactFormView: ContactFormView,
  ContactListView: ContactListView
  // ContactItemView: ContactItemView
}
