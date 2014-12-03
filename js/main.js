$(function(){
  meetup_url = "https://api.meetup.com/2/events?callback=?&sign=true&status=upcoming&group_urlname=OK-Lab-Munster&format=json&key=48406a31956272b2f12c3965547d"
  $.getJSON(meetup_url,function (data) { 
    if(data.results.length > 0) {
      result = data.results[0];
      title = result.name;
      description = result.description;
      date = result.time;
      venue = result.venue.name;
      eventUrl = result.event_url;
      if(venue) {
        latLng = [result.lat, result.lon];
      }
      $('#date span').html(new Date(date).toLocaleDateString());
      $('#next-meetup #title').html(title);
      $('#next-meetup #venue').html(venue);
      $('#next-meetup #description').html(description);
      $('#next-meetup #rvsp').attr('href', eventUrl);

    }
  });
});
