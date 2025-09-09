const express = require('express');
const { getSurah, getAllSurahs } = require('../controllers/quranController');

const router = express.Router();

// Get all surahs (summary)
router.get('/surahs', getAllSurahs);

// Get specific surah by index or name
// Query parameters:
// - includeTranslation: boolean (true/false) - Include Urdu translation
// - ayahIndex: number - Get specific ayah by index
router.get('/surah/:identifier', getSurah);

module.exports = router;
