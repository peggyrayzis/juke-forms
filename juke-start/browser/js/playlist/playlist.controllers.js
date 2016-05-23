'use strict';

juke.controller('PlaylistCtrl', function ($scope, PlaylistFactory, $state) {


  $scope.logScope = function () {
	 $scope.playlist = {
	  	name: $scope.playlistName
	  }
    console.log("The new playlist: ", $scope.playlist);
  };

  $scope.addPlaylist = function(playlistName){
  	return PlaylistFactory.create({name: playlistName})
  	.then(function(playlist){
  		$scope.playlistForm.$setPristine();
  		$scope.playlistName = null;
  		console.log("Here is a new playlist", playlist)
  		$state.go('singlePlaylist', {"id": playlist.id})
  		return playlist;
  	})

  } 

});

juke.controller('AllPlaylistsCtrl', function ($scope, PlaylistFactory) {
	
	$scope.getPlaylists = function(){
		console.log('im running')
		return PlaylistFactory.fetchAll()
			.then(function(playlists){
				$scope.playlists = playlists
				console.log('here are the playlists', playlists)
				return playlists;
			})
	}
	$scope.getPlaylists()


});


juke.controller('SinglePlaylistCtrl', function ($scope, thePlaylist, theSongs, PlayerFactory, SongFactory, PlaylistFactory) {
	
	$scope.playlist = thePlaylist
	var songsArray = $scope.playlist.songs;
	console.log("this is the songsArray", songsArray)

	$scope.songs = theSongs

	$scope.getCurrentSong = function () {
    	return PlayerFactory.getCurrentSong();
  	};

  	$scope.isPlaying = function (song) {
    	return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  	};

  	$scope.addSong = function(song){
  		var id = thePlaylist.id
  		return PlaylistFactory.addSong(id, song)
  		.then(function(song){
  			songsArray.push(song);
  			console.log("this is the songs array", songsArray)
  		})
  	}

  	$scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

});
