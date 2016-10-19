window.$ = window.jQuery = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap');
var Backbone = require('backbone');



var ContactListView = Backbone.View.extend({
  tagName: 'ul',
  attributes: {
    'class': 'contact-list col-md-12'
  },
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderContactItem)
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
  render: function(){
    // var context = this.model.toJSON();
    // var renderedTemplate = this.template(context);
    //
    this.$el.html(this.model.get('name'));

    return this;
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
  }
});

module.exports = {
  ContactFormView: ContactFormView,
  ContactListView: ContactListView
}
