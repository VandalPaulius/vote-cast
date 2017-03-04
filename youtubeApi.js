

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
//api_key =AIzaSyB2aa0BrSaCnumIRyXUnn8nVi0Jxeloac0
function getYouTubeData(url) {
         var id= GetVideoId(url);
         url1 = "https://www.googleapis.com/youtube/v3/videos?id=" +'id'+ "&key=AIzaSyB2aa0BrSaCnumIRyXUnn8nVi0Jxeloac0";
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
 
//alert("Title: " + json.entry.title.$t +"\nDescription:\n " + json.entry.media$group.media$description.$t + "\n");