/*
describe("Clicking a track", function () {

    var track = {'type': 'track',
                 'shortlink': 'http://spoti.fi/stubTrack',
                 'trackname': 'stub track - stub artist'}

    trackNode = $('<span class="testTrack"></span>');
    beforeEach(function () {
        trackNode.append(Template.track(track));
        $('body').append(trackNode);
    });

    afterEach(function () {
//        $('.testTrack').remove();
    });

    it('update the Session veriable currentTrackId for the clicked track',
       function () {
           expect(Session.get('currentTrackId')).toBe(undefined);
           $('.testTrack .track').trigger('click');
           expect(Session.get('currentTrackId')).not.toBe(undefined);
    });
});*/
