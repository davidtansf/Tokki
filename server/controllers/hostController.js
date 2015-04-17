var sessions = require('../collections/SessionsCollection').sessions;
var socketUtils = require('../utils/socketUtils');

// Calculates the aggregate stats from cache
// Returns current and average
exports.calculateStats = function(sessionId, cb) {
  cb({
    currentAverage: sessions.getCurrentAverage(sessionId),
    historicalAverage: sessions.getHistoricalAverage(sessionId),
    userCount: sessions.getUserCount(sessionId)
  });
};

// Return a sessionId
// Begins listening to a session
exports.registerSession = function(req, res) {
  var sessionId = sessions.addNewSession();
  socketUtils.init(sessionId, function() {
    res.send(sessionId); // Client will redirect to /#/host/sessionId
  });
};

exports.login = function(req, res) {};

exports.redirect = function(req, res) {
  res.redirect('/#/host/' + (req.params.sessionId || ''));
};
