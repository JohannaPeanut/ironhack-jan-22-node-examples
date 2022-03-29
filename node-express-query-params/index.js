const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Hello World');
});

// We're encoding arbitary information in the URL
// through request params

// We have to know ahead of time where these arbitrary values
// will be expect in the url path

// We tell express to match get requests for a path following
// the /name/* pattern
// The value passed after /name/ will be available
// in the request handling function through
// request.params.student (student being the "param" name)
app.get('/name/:student', (request, response) => {
  const student = request.params.student;
  response.send('Hello ' + student);
});

// Any request in the path follows the pattern
// /abc/*/def/* will be matched
// The values for the foo and bar params
// will be available in the request.params object
// under the corresponding keys
app.get('/abc/:foo/def/:bar', (request, response) => {
  const foo = request.params.foo;
  const bar = request.params.bar;
  response.send('Foo: ' + foo + '; Bar: ' + bar);
});

// Request query

// Any request can have encoded a request query
// by adding a ? at the end of the path followed
// by key-value pairs separated by &
// These key-value pairs will be parsed by express
// and made available through the request.query object
// which will hold each value in a property named
// after the corresponding key
// There is no way to enforce that a must be passed
// for this route handler to match a request
app.get('/contact', (request, response) => {
  const name = request.query.name;
  const location = request.query.location;
  const message = request.query.message;
  if (!name || !location || !message) {
    response.send('This request must have a message, name and location encoded in the url query!');
  } else {
    response.send('A request was received from ' + name + ', living in ' + location + ', who said ' + message);
  }
});

app.listen(3000);
