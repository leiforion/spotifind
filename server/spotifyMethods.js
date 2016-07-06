Meteor.methods({

    getTrackId: function (shortlink) {
        /* Return the spotify track id for this shortlink */
        http = Meteor.http;
        var res = http.get(shortlink, {followRedirects: false});
	var location = res.headers.location;
	var trackId = location.split("/").reverse()[0];
	return trackId;
    },

    getTracks: function (username, resultCount) {
        var spotifyUrls = [],
    	    songNames = [],
	    http = Meteor.http,
	    feed = http.get("https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=" + username + "&count=" + resultCount),
	    responseContent = JSON.parse(feed.content);

	for (var i = 0; responseContent.length > i; i++) {
	    try {
	        var name = responseContent[i].text.split('♫ ')[1].split(' http://')[0];
                var spotifyUrl = responseContent[i].entities.urls[0].expanded_url;
                var created_at = Date.parse(responseContent[i].created_at);
                var track = {'type': 'track',
                             'created_at': created_at,
                             'user': username,
                             'shortlink': spotifyUrl,
                             'trackname': name};
                if (Content.find(track).count() === 0) {
	            Content.insert(track);
                }
            } catch (e) {
                Content.remove({'trackname': null});
            }
	}
    }
});
