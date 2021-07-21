const fetchSearch = (spotifyApi, search, setSearchResults) => {
  let cancel = false;

  spotifyApi.searchTracks(search).then((res) => {
    if (cancel) return;
    setSearchResults(
      res.body.tracks.items.map((track) => {
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          },
          track.album.images[0]
        );

        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
        };
      })
    );
  });
  return () => (cancel = true);
};

const fetchCategories = (
  spotifyApi,
  setCategories,
  setPppppDes,
  setCategoryPlaylist
) => {
  spotifyApi
    .getCategories({
      limit: 10,
      offset: 0,
      country: 'US',
    })
    .then(
      function (data) {
        console.log('chec', data.body);
        setCategories(data.body.categories.items);
        data.body.categories.items.forEach((category) => {
          spotifyApi
            .getPlaylistsForCategory(category.id, {
              country: 'US',
              limit: 30,
              offset: 0,
            })
            .then(
              function (data) {
                console.log(`${category.id} `, data.body);
                setPppppDes((old) => [...old, category.name]);
                setCategoryPlaylist((old) => [
                  ...old,
                  data.body.playlists.items,
                ]);
              },
              function (err) {
                console.log('Something went wrong!', err);
              }
            );
        });
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
};

const fetchUserPlaylists = (spotifyApi, setUserPlaylists) => {
  spotifyApi.getMe().then(
    function (data) {
      console.log('Some information about the authenticated user', data.body);

      spotifyApi.getUserPlaylists(data.body.id).then(
        function (data) {
          setUserPlaylists(data.body.items);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
};

const fetchSavedTracks = (spotifyApi, setSavedTracks) => {
  spotifyApi
    .getMySavedTracks({
      market: 'ES',
      limit: 50,
      offset: 0,
    })
    .then((data) => {
      setSavedTracks({
        items: data.body.items.map((item) => {
          return item.track;
        }),
      });
    });
};

const fetchPlaylistTracks = (spotifyApi, one, setPlayList) => {
  spotifyApi
    .getPlaylistTracks(one.id, {
      offset: 1,
      limit: 100,
      fields: 'items',
    })
    .then(
      function (data) {
        setPlayList({
          items: data.body.items.map((item) => {
            return item.track;
          }),
        });
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
};

export {
  fetchSearch,
  fetchCategories,
  fetchUserPlaylists,
  fetchSavedTracks,
  fetchPlaylistTracks,
};