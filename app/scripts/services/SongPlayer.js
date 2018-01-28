(function() {
  function SongPlayer() {
    var SongPlayer = {};
    /**
     * @desc the song that is being played
     * @type {Array}
     */
    var currentSong = null;
    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;
    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };
    /**
     * @function playSong
     * @desc plays the audio file in currentBuzzObject and sets song.playing to true
     * @param {Object} song
     */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };
    /**
     * @function SongPlayer.play
     * @desc plays the song if the play button is clicked. If current song is paused, plays song.
     * @param {Object} song
     */
    SongPlayer.play = function(song) {

      if (currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (currentSong == song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };
    /**
     * @function SongPlayer.pause
     * @desc pauses the song & sets song.playing to false if the pauses button is clicked. 
     * @param {Object} song
     */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();