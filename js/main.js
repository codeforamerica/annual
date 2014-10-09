$(function(){
  meetup_url = "https://api.meetup.com/ew/events?callback=?&sign=true&status=upcoming&urlname=codeforde&community_urlname=Munster-DE&page=20&sign=true&key=48406a31956272b2f12c3965547d"
  $.getJSON(meetup_url,function (data) { 
    if(data.results.length > 0) {
      result = data.results[0]
      title = result.short_description;
      description = result.description;
      date = result.time;
      venue = result.venue_name;
      if(venue) {
        latLng = [result.lat, result.lon];
      }
      $('#date span').html(new Date(date).toLocaleDateString());
      $('#next-meetup #title').html(title);
      $('#next-meetup #venue').html(venue);
      $('#next-meetup #description').html(description);

    }
  });
});
