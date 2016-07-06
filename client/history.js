Template.history.tracks = function () {
    var username = Session.get('user');
    return Content.find({'type': 'track', 'user': username},
                        {'limit': 10, sort: {'created_at': -1}});
};

Template.history.noSharedTracks = function () {
    var username = Session.get('user');
    var tracks = Content.find({'type': 'track', 'user': username},
                          {'limit': 10, sort: {'created_at': -1}}).fetch();
    return tracks.length === 0;
}

Template.track.events({
    "click": function (clickEvent) {
        var track = clickEvent.currentTarget;
        var shortlink = $(track).attr('shortlink');
        $('.selected').removeClass('selected');
        $(track).addClass('selected');
        Meteor.call('getTrackId', shortlink, function (e, trackId) {
            Session.set('currentTrackId', trackId);
        });
    }
});

Template.player.currentTrackId = function () {
    return Session.get('currentTrackId');
}

Template.player.playerHeight = function () {
    return Session.get('playerHeight');
};

Template.history.rendered = function () {
    $(window).resize(function () {
        height = (document.width <= 728) ? '80' : '380';
        Session.set('playerHeight', height);
    });
};

Template.findUserPage.events({
    'click button': function (event) {
        var username = $('input').val();
        var path = '/recent/' + username;
        event.preventDefault();
        window.location.href = path;
    }
});

Template.tweetThis.currentUrl = function () {
    return document.URL;
};

