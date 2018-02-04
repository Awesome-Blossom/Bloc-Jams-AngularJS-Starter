(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    /**
     * @desc Store album info from Fixtures in currentAlbum
     * @type {Object}
     */
    var currentAlbum = Fixtures.getAlbum();
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
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };
    /*
     * @function playSong
     * @desc plays the audio file in currentBuzzObject and sets song.playing to true
     * @param {Object} song
     */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };
    /*
     * @function getSongIndex
     * @desc returns the index of the current song being played
     * @param {Object} song
     * @returns {Number} 
     */    
    var getSongIndex = function(song){
    	return currentAlbum.songs.indexOf(song);
    };    
    /*
     * @function stopSong
     * @desc stops current song.
     */
    var stopSong = function(){
    	currentBuzzObject.stop();
    	SongPlayer.currentSong.playing = null;
    };
    /**
     * @desc the song that is being played. Active song object from a list of songs
     * @type {Array}
     */
    SongPlayer.currentSong = null;
    /**
     * @function SongPlayer.play
     * @desc plays the song if the play button is clicked. If current song is paused, plays song.
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong == song) {
        if (currentBuzzObject.isPaused()) {
        	// if(song==null){
        	// }
        	// else{
        		
        	// }
        	console.log(getSongIndex);
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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    /**
     * @function SongPlayer.previous
     * @desc decreases the index of the current song and plays it. 
     */
    SongPlayer.previous = function(){
    	var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    	currentSongIndex--;
    	if(currentSongIndex < 0){
    		stopSong();
    	}else{
    		var song = currentAlbum.songs[currentSongIndex];
    		setSong(song);
    		playSong(song);
    	}
    };
    /**
     * @function SongPlayer.next
     * @desc increases the index of the current song and plays it.
     */
    SongPlayer.next = function(){
    	var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    	currentSongIndex++;
    	if(currentSongIndex > currentAlbum.songs.length){
    		stopSong();
    	}else{
    		var song = currentAlbum.songs[currentSongIndex];
    		setSong(song);
    		playSong(song);
    	}
    };
    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();