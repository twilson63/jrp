var test = require('tap').test;
var rewire = require('rewire');
var jrp = rewire('../');

jrp.__set__('jackrabbit', function(server) {
  return {
    create: function(queue, fn) { process.nextTick(function() { fn(); })},
    publish: function(queue, data, cb) {
      process.nextTick(function() {
        cb(null, { hello: 'world'});
      });
    },
    on: function(name, fn) {
      if (name === 'connected') {
        setTimeout(function() { fn(); }, 200);
      }
    }
  };
});

var opts = { server: 'amqp://localhost', queue: 'foo.bar'};

test('publish to queue', function(t) {
  var q = jrp(opts);
  q.on('connected', function() {
    q.publish({ foo: 'bar'}, function(err, result) {
      t.equals(result.hello, 'world');
      t.end();
    });
  });
});
