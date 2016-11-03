// var myVideo;
// var title = document.getElementById('Girl Power');
// function handleClick() {
//   myVideo.play();
// }
// title.addEventListener("click", handleClick, false);

// URL for Wistia Api project show
var apiKey = "b78e3bda738bf754c99b74249beff4a9ca65c51fbfa6d148cbea1da4edd7096a";
var projectsUrl = "https://api.wistia.com/v1/projects/bhlo5f1upi.json?api_password=" + apiKey;

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function pickRandomVideo(mediasArray) {
  console.log(mediasArray.length);

  var randomDecimal = Math.random();
  console.log(randomDecimal);

  var randomDecimalNumber = randomDecimal * mediasArray.length;
  console.log(randomDecimalNumber);

  var roundedRandomNumber = Math.floor(randomDecimalNumber);
  console.log(roundedRandomNumber);

  var randomVideo = mediasArray[roundedRandomNumber];
  console.log(randomVideo);

  return randomVideo;
}

function constructEmbedCode(hashedId) {
  return "<div class='wistia_embed wistia_async_" + hashedId + "' style='width:640px;height:360px;'></div>";
}

function playVideoOnTv(embedCode, hashedId) {
  var tvScreen = document.getElementById('tvScreen');
  tvScreen.innerHTML = embedCode;

  window._wq = window._wq || [];
  _wq.push({ id: hashedId, onReady: function(video) {
    video.play();
  }});
}

function handleGetMeAVideo() {
  var myVideo = pickRandomVideo(this.medias);
  var embedCode = constructEmbedCode(myVideo.hashed_id);
  playVideoOnTv(embedCode, myVideo.hashed_id);
}

httpGetAsync(projectsUrl, function(result) {
  var results = JSON.parse(result);
  this.medias = results["medias"];
  console.log(this.medias);
  document.getElementById('getMeAVideo').addEventListener("click", handleGetMeAVideo.bind(this), false);
});
