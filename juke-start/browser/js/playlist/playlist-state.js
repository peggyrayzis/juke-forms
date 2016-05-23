'use strict';

juke.config(function ($stateProvider) {

	$stateProvider.state('newPlaylist', {
		url: '/playlists/new',
		templateUrl: '/js/playlist/playlist-template.html',
		controller: 'PlaylistCtrl'
	});


});

juke.config(function ($stateProvider) {

	$stateProvider.state('singlePlaylist', {
		url: '/playlists/:id',
		templateUrl: '/js/playlist/single-playlist.html',
		controller: 'SinglePlaylistCtrl',
		resolve: {
			thePlaylist: function(PlaylistFactory, $stateParams){
				return PlaylistFactory.fetchById($stateParams.id)
			},
			theSongs: function(SongFactory){
				return SongFactory.fetchAll()
			}

			// thePlaylistSongs: function(PlaylistFactory, $stateParams){
			// 	return PlaylistFactory.fetch($stateParams.id)
			// }
		}
	});


});