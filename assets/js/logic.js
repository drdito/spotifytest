$(document).ready(function(){
  var hash = window.location.hash.substr(1);

  if (hash === "") {
    window.location = "https://accounts.spotify.com/authorize?redirect_uri=https://drdito.github.io/spotifytest/&client_id=5f86c462170f4cbf8c03daa0c4d71ede&response_type=token"
  }

  //funtion to parse through the url to grab everything from # to &, which will be just the access token
  function gainSpotifyToken(url) {
    //This array gives us the 3 operators we will use to parse the URL
    var splitters = ["#","=","&"];
    for (var i = 0; i < splitters.length; i++){
      var splitUrl = url.split(splitters[i]);
      url = splitUrl[1];
    }
    return splitUrl[0];
  }

  if (hash !== ""){
    var token = gainSpotifyToken(window.location.href.toString());  
  }

  

var counter = 0;

$.ajax({
    url: "https://api.spotify.com/v1/me",
    method:"GET",
    headers: {
      'Authorization': 'Bearer ' + token
    }
}).then(function(result){
 console.log(result);
 console.log(result.id);
 $("#results").prepend("<h6>Welcome " + result.id + "</h6>" );
});

  
  $("#artistSearch").click(function(){
    var query = $("#artistInput").val().trim(); 
   
    
    $.ajax({
      url: "https://api.spotify.com/v1/search?q=" + query + "&type=track",
      method:"GET",
      headers: {
        'Authorization': 'Bearer ' + token
      },
      success: function(response) {
        console.log(response);
        var newDiv = $("<div class='text-center'>");
        newDiv.attr("class", "resultDiv text-center");
        newDiv.attr("id", "result" + counter);
        var newImage = $("<img>");
        newImage.attr("src", response.tracks.items[0].album.images[0].url);
        newImage.css("height", 200);
        newImage.css("width", 200);
        newImage.css("margin", 15);
        $("#results").append(newDiv);
        newDiv.append(newImage);
        newDiv.append("<h6>Artist: " + response.tracks.items[0].artists[0].name + "</h6>" );
        newDiv.append("<h6>Album: " + response.tracks.items[0].album.name + "</h6>" );
        $("#artistInput").val("");
      }
    })

   

    counter++;


  });
});