

//Get video id from video url
function GetVideoId(url) {
  var id;
        if(v.indexOf('watch?v=') > 0){
            id = v.split('watch?v=')[1];
        } else if(v.indexOf('youtu.be/') > 0) {
            id = v.split('youtu.be/')[1];
        }
        return id;
}
//https://www.googleapis.com/youtube/v3/videos?id=GKSRyLdjsPA&key=AIzaSyDDh5IaSjuApU4Q4wWeauL1z6zuaeXyBg0&part=snippet,contentDetails,statistics,status
//api_key =AIzaSyDDh5IaSjuApU4Q4wWeauL1z6zuaeXyBg0
//https://developers.google.com/youtube/v3/docs/videos
function getYouTubeData(url) {
         var id= GetVideoId(url);
         url1 = "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=AIzaSyDDh5IaSjuApU4Q4wWeauL1z6zuaeXyBg0" + "&part=snippet,contentDetails,statistics,status";
     //   $.getJSON(url,
  //  function(response){
    //    title = response.data.items[0].title;
      //  description = response.data.items[0].description;
      //  duration = response.data.items[0].duration;
     //   });
          $.ajax({
                     url = url1,
                     type: 'GET',
                       // url: "http://gdata.youtube.com/feeds/api/videos/<?php echo $_GET['id']; ?>?v=2&alt=json",
                        dataType: 'json',
                        data:   data,
                        success: function (data) {
                     json = data;    
                         }       
                });
            
                return json;               
        }

function urlToStream(url){
    stream = ytdl(url)

    proc = new ffmpeg({source:stream})
    proc.setFfmpegPath('/Applications/ffmpeg')
return proc;
}

// youtube duration returns to iso8601 format
//get  time: hour, min, sec.
  function convertISO8601ToTime(input) {

        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;

        if (reptms.test(input)) {
            var matches = reptms.exec(input);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
           totalseconds = hours * 3600  + minutes * 60 + seconds;
        // var time = hours.toString()+":" + minutes.toString() +":" + seconds.toString();
        }

        return (totalseconds);
    }
//alert("Title: " + json.entry.title.$t +"\nDescription:\n " + json.entry.media$group.media$description.$t + "\n");
