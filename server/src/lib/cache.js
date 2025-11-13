const NodeCache = require("node-cache");

// TTL reading: use short TTL in dev to observe behavior easily.
// Value is in seconds. Default to 600s (10 minutes) in prod-like mode.


const cache = new NodeCache({ stdTTL: 600 });

module.exports = cache;