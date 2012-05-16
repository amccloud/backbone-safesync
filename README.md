# Backbone Safe Sync [![Build Status](https://secure.travis-ci.org/amccloud/backbone-safesync.png)](http://travis-ci.org/amccloud/backbone-safesync]) #
A wrapper around Backbone.sync to prevent model and collection request race conditions.

## Example ##
```javascript
var bookSearch = new Books();

var xhr1 = bookSearch.fetch({ // imagine this request took 1000ms
    data: {
        q: 'javascript'
    }
});

var xhr2 = bookSearch.fetch({ // and this request took 50ms
    data: {
        q: 'dom'
    }
});

xhr1.state(); // 'rejected'
xhr2.state(); // 'pending'
```

## Why? ##
Currently slow request can cause havok on the the state of your collections and models. Imagine this scenario:
A user search for 'javascript' first and then 'dom'. The 'javascript' search hangs so the user never got to see
the results. They then search for 'dom' and that response comes in right away while the 'javascript' search is still
pending. The user is presented with books on 'dom'. The old 'javascript' request now responds. The collection and
the users UI is abruptly changed to books on 'javascript'. Not good! backbone-safesync tried to remedy this by aborting
old request.


## Forcing Parallel Request (default behavior) ##

```javascript
var bookSearch = new Books();

var xhr1 = bookSearch.fetch({
    data: {
        q: 'javascript'
    }
});

var xhr2 = bookSearch.fetch({
    safe: false,
    data: {
        q: 'dom'
    }
});

xhr1.state(); // 'pending'
xhr2.state(); // 'pending'

```
