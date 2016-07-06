TYSON.pathHandlers.recent = function (username) {
    /* display the 10 most recent tracks from the given user */
    if (!username) {
        window.location.pathname = "/recent/spotifind";
    }
    /* update the collection with the most recent tracks */
    Meteor.call('getTracks', username, 50, function (e, ret) {
        /* grab the most recent track and set currentTrackId */
        track = Content.findOne({'type': 'track', 'user': username},
                                {sort: {'created_at': -1}});
        Meteor.call('getTrackId', track.shortlink, function (e, trackId) {
            Session.set('currentTrackId', trackId);
        });
    });

    /* Set the initial player height and user*/
    height = (document.width <= 728) ? '80' : '380';
    Session.set('playerHeight', height);
    Session.set('user', username);

    history = { 'username': username };
    return Template.history(history);
}

TYSON.pathHandlers.tos = function () {
    return Template.tos();
}
