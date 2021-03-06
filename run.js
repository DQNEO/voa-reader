var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed
var url = 'http://learningenglish.voanews.com/api/zkm-qem$-o';
var req = request(url);
var feedparser = new FeedParser();

req.on('error', function (error) {
    // handle any request errors
});

req.on('response', function (res) {
    var stream = this; // `this` is `req`, which is a stream

    if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
    }
    else {
        stream.pipe(feedparser);
    }
});

feedparser.on('error', function (error) {
    // always handle errors
});

feedparser.on('readable', function () {
    // This is where the action is!
    var stream = this; // `this` is `feedparser`, which is a stream
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    var item;

    while (item = stream.read()) {
        console.log('===========');
        console.log(item.link);
        console.log(item.title);
        console.log('===========');
        console.log(item.description);
        return;
    }
});
