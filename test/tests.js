var Book = Backbone.Model.extend();
var Books = Backbone.Collection.extend({
    model: Book,
    url: 'https://www.googleapis.com/books/v1/volumes?q=javascript',
  
    parse: function(results){
        return results.items;
    }
});

test("test safe", function() {
    var bookSearch = new Books(),
        xhr1 = bookSearch.fetch(),
        xhr2 = bookSearch.fetch();

    equal(xhr1.state(), 'rejected');
    equal(xhr2.state(), 'pending');
});

test("test unsafe", function() {
    var bookSearch = new Books([], {
        searchTerm: 'django'
    });

    var xhr1 = bookSearch.fetch(),
        xhr2 = bookSearch.fetch({
        safe: false
    });

    equal(xhr1.state(), 'pending');
    equal(xhr2.state(), 'pending');
});

test("test multiple collections", function() {
    var bookSearch1 = new Books(),
        bookSearch2 = new Books();

    var xhr1_1 = bookSearch1.fetch();
    var xhr2_1 = bookSearch2.fetch();
    var xhr2_2 = bookSearch2.fetch();

    equal(xhr1_1.state(), 'pending');
    equal(xhr2_1.state(), 'rejected');
    equal(xhr2_2.state(), 'pending');
});
