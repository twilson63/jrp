var jackrabbit = require('jackrabbit');
var events = require('events');

module.exports = function(opts) {
  var ee = new events.EventEmitter();
  var jr = jackrabbit(opts.server);
  var connected = false;

  
  jr.on('connected', function() {
    jr.create(opts.queue, function() {
      connected = true;
      ee.emit('connected', 'connected to ' + opts.queue);
    });  
  });
  
  jr.on('error', function(err) {
    ee.emit('error', err);
  });

  ee.publish = function(doc, cb) {
    if (!connected) return cb(new Error('not connected to service'));  
    jr.publish(opts.queue, doc, cb);
  };

  return ee;
};
