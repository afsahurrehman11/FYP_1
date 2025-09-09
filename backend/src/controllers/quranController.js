const Surah = require('../models/Surah');

/**
 * Get Surah by index or name
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getSurah = async (req, res) => {
  try {
    console.log('getSurah called with params:', req.params);
    console.log('getSurah called with query:', req.query);

    const { identifier } = req.params;
    const { includeTranslation = false, ayahIndex } = req.query;

    let query = {};
    
    // Determine if identifier is a number (surah index) or string (surah name)
    if (!isNaN(identifier)) {
      query.index = parseInt(identifier);
      console.log('Searching by index:', query.index);
    } else {
      // Search by Arabic name or English name
      query.$or = [
        { name: identifier },
        { englishName: identifier }
      ];
      console.log('Searching by name:', identifier);
    }

    const surah = await Surah.findOne(query);
    
    if (!surah) {
      console.log('Surah not found for identifier:', identifier);
      return res.status(404).json({
        success: false,
        message: 'Surah not found',
        identifier: identifier
      });
    }

    console.log('Surah found:', surah.name, '(Index:', surah.index + ')');

    // Prepare response data
    let responseData = {
      success: true,
      data: {
        index: surah.index,
        name: surah.name,
        englishName: surah.englishName,
        totalAyahs: surah.totalAyahs,
        ayahs: []
      }
    };

    // If specific ayah index is requested
    if (ayahIndex) {
      const ayahIndexNum = parseInt(ayahIndex);
      const specificAyah = surah.ayahs.find(ayah => ayah.index === ayahIndexNum);
      
      if (!specificAyah) {
        console.log('Ayah not found at index:', ayahIndexNum);
        return res.status(404).json({
          success: false,
          message: `Ayah ${ayahIndexNum} not found in Surah ${surah.name}`
        });
      }

      console.log('Specific ayah found at index:', ayahIndexNum);
      responseData.data.ayahs = [formatAyah(specificAyah, includeTranslation === 'true')];
    } else {
      // Return all ayahs
      responseData.data.ayahs = surah.ayahs.map(ayah => 
        formatAyah(ayah, includeTranslation === 'true')
      );
    }

    console.log('Sending response with', responseData.data.ayahs.length, 'ayahs');
    res.json(responseData);

  } catch (error) {
    console.error('Error in getSurah:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get all Surahs (summary)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllSurahs = async (req, res) => {
  try {
    console.log('getAllSurahs called');

    const surahs = await Surah.find({}, {
      index: 1,
      name: 1,
      englishName: 1,
      totalAyahs: 1
    }).sort({ index: 1 });

    console.log('Found', surahs.length, 'surahs');

    res.json({
      success: true,
      data: surahs,
      total: surahs.length
    });

  } catch (error) {
    console.error('Error in getAllSurahs:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Format ayah for response
 * @param {Object} ayah - Ayah object
 * @param {Boolean} includeTranslation - Whether to include Urdu translation
 * @returns {Object} Formatted ayah
 */
const formatAyah = (ayah, includeTranslation) => {
  const formatted = {
    index: ayah.index,
    arabicText: ayah.arabicText
  };

  if (ayah.bismillah) {
    formatted.bismillah = ayah.bismillah;
  }

  if (includeTranslation && ayah.urduTranslation) {
    formatted.urduTranslation = ayah.urduTranslation;
  }

  return formatted;
};

module.exports = {
  getSurah,
  getAllSurahs
};
