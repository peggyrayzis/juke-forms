'use strict';

juke.factory('PlaylistFactory', function ($http, SongFactory) {

  var cachedPlaylists = [];

  var PlaylistFactory = {};

  PlaylistFactory.create = function (data) {
    return $http.post('/api/playlists', data)
    .then(function (response) {
      var playlist = response.data
      cachedPlaylists.push(playlist);
      return playlist;
    });
  };

  PlaylistFactory.fetchAll = function (){
  	return $http.get('/api/playlists')
  	.then(function(response){
      angular.copy(response.data, cachedPlaylists);
  		return cachedPlaylists
  	})
  }

  PlaylistFactory.fetchById = function (id){
    return $http.get(`/api/playlists/${id}`)
    .then(function(response){
      return response.data
    })
    .then(function(data){
      data.songs.map(SongFactory.convert);
      return data;
    })
  }

  PlaylistFactory.addSong = function(id, song){
    return $http.post(`/api/playlists/${id}/songs`, song)
    .then(function(response){
      return response.data
    })
    .then(function(song){
      return SongFactory.convert(song);
    })
  }

  PlaylistFactory.deleteSong = function(id, song){
    var songId = song.id
    return $http.delete(`/api/playlists/${id}/songs/${songId}`)
    .then(function(response){
      return response.data
    })
  }

	return PlaylistFactory;
});