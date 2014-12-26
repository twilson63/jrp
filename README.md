# jrp - Jack Rabbit Publish

This is a wrapper module over the RabbitMQ Publish method for Request/Response message pattern.

[![build status](https://secure.travis-ci.org/twilson63/jrp.png)](http://travis-ci.org/twilson63/jrp)

## Usage

``` js
var search = jrp({
  server: 'amqp://localhost',
  queue: 'plasticman.search'
});

search({ index: 'myapp', type: 'error', q: 'Beep '}, function(err, results){
  console.log(results);
});
```

The jrp constructor takes an object that contians a server and queue node, these nodes connect the client to the rabbitmq, the server node must have all connection info embedded: ie. amqp://[user]:[pwd]@server%f2/[vhost]

## Install

``` sh
npm install jrp
```

## Test

```
npm test
```

## License

MIT

## Contributions

see CONTRIBUTING.md

## Thanks

* JackRabbit Module
* NodeJS



