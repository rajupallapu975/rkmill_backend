const dns = require('dns');

dns.setServers(['8.8.8.8']);

dns.resolveSrv('_mongodb._tcp.cluster0.sdokmmr.mongodb.net', (err, addresses) => {
    if (err) {
        console.error('DNS Resolve Error:', err);
        return;
    }
    console.log('SRV Records:', addresses);
});
