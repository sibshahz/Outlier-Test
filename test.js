const tape = require('tape');
const jsonist = require('jsonist');
const getPort = require('get-port');

const server = require('./server');

getPort().then(PORT => {
  const urlBase = `http://localhost:${PORT}`;

  tape('should respond hello', (t) => {
    jsonist.get(urlBase, (err, body) => {
      if (err) t.error(err);
      t.equal(body.msg, 'hello');
      t.end();
    });
  });

  tape('should respond user-agent', (t) => {
    const opts = { headers: { 'User-Agent': 'tape' } };
    jsonist.get(`${urlBase}/user-agent`, opts, (err, body) => {
      if (err) t.error(err);
      t.equal(body.ua, 'tape');
      t.end();
    });
  });

  tape('should respond b64', (t) => {
    jsonist.get(`${urlBase}/b64/hello`, (err, body) => {
      if (err) t.error(err);
      t.equal(body.b64, 'aGVsbG8=');
      t.end();
    });
  });

  tape('cleanup', function (t) {
    server.close();
    t.end();
  });
});
