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
    'click .delete': 'complete'       //NEEDS TO BE IN QUOTES B/C OTHERWISE IT WILL THINK It is a variable.
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
    var emailForm = $('#email').val();
    var phoneForm = $('#phone').val();
    var birthdayForm = $('#birthday').val();

    this.collection.create({name: nameForm, email: emailForm, phone: phoneForm, birthday: birthdayForm});


    $('#name').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#birthday').val('');

  }
});


var ContactConfirmModal = Backbone.View.extend({
  el: $('#confirm-delete')[0],            //passes jquery object directly to element property on the view.
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


//Confirm Modal Singleton
var confirmModal = new ContactConfirmModal();

module.exports = {
  ContactFormView: ContactFormView,
  ContactListView: ContactListView
  // ContactItemView: ContactItemView
}
