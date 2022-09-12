const router = require('express').Router();
const { Song } = require('../app/models/song');
const { Playlist } = require('../app/models/playlist');
const auth = require('../app/middlewares/auth');

router.get('/', auth, async (req, res) => {
    const search = req.query.search.trim();
    if (search !== '') {
        const songs = await Song.find({
            name: { $regex: search, $options: 'i' },
        }).limit(10);
        const playlists = await Playlist.find({
            name: { $regex: search, $options: 'i' },
        }).limit(10);
        const result = { songs, playlists };
        res.status(200).send(result);
    } else {
        res.status(200).send({});
    }
});

module.exports = router;
