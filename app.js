// Import the module.
var Omx = require('node-omxplayer');

// Create an instance of the player with the source.
var player = Omx('http://159.8.16.16:7107/stream', 'alsa');

player.volUp();
player.volUp();
player.volUp();
player.volUp();
player.volUp();
player.volUp();
player.volUp();
player.volUp();
player.volUp();
player.volUp();

player.play();

setTimeout(function() {
  player.quit();
  console.log("quitted");
}, 30000);