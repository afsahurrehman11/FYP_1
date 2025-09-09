const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const Surah = require('../models/Surah');

class DataImportService {
  constructor() {
    this.parser = new xml2js.Parser({
      ignoreAttrs: false,
      explicitArray: false,
      trim: true,
      normalize: true,
      normalizeTags: false,
      async: true
    });
  }

  /**
   * Import last 3 surahs from XML files to database
   */
  async importLastThreeSurahs() {
    try {
      console.log('Starting import of last 3 surahs...');

      // Define paths to XML files
      const arabicXmlPath = path.join(__dirname, '../../../dataset to load in DB/quran-simple.xml');
      const urduXmlPath = path.join(__dirname, '../../../dataset to load in DB/ur.jalandhry.xml');

      // Read and parse XML files
      console.log('Reading Arabic XML file...');
      const arabicData = await this.parseXmlFile(arabicXmlPath);
      
      console.log('Reading Urdu XML file...');
      const urduData = await this.parseXmlFile(urduXmlPath);

      // Extract last 3 surahs (indexes 112, 113, 114)
      const targetSurahs = [112, 113, 114];
      
      console.log('Processing surahs:', targetSurahs);

      for (const surahIndex of targetSurahs) {
        await this.processSurah(surahIndex, arabicData, urduData);
      }

      console.log('Successfully imported last 3 surahs!');
      return { success: true, message: 'Last 3 surahs imported successfully' };

    } catch (error) {
      console.error('Error importing surahs:', error);
      throw error;
    }
  }

  /**
   * Parse XML file
   * @param {string} filePath - Path to XML file
   * @returns {Object} Parsed XML data
   */
  async parseXmlFile(filePath) {
    try {
      let xmlContent = fs.readFileSync(filePath, 'utf8');
      
      // Remove problematic comments entirely
      xmlContent = xmlContent.replace(/<!--[\s\S]*?-->/g, '');
      
      // Clean up any remaining whitespace issues
      xmlContent = xmlContent.trim();
      
      const result = await this.parser.parseStringPromise(xmlContent);
      return result;
    } catch (error) {
      console.error(`Error parsing XML file ${filePath}:`, error);
      throw error;
    }
  }

  /**
   * Process individual surah
   * @param {number} surahIndex - Surah index
   * @param {Object} arabicData - Parsed Arabic XML data
   * @param {Object} urduData - Parsed Urdu XML data
   */
  async processSurah(surahIndex, arabicData, urduData) {
    try {
      console.log(`Processing Surah ${surahIndex}...`);

      // Find surah in Arabic data
      const arabicSuras = Array.isArray(arabicData.quran.sura) ? arabicData.quran.sura : [arabicData.quran.sura];
      const arabicSurah = arabicSuras.find(s => 
        parseInt(s.$.index) === surahIndex
      );

      if (!arabicSurah) {
        throw new Error(`Arabic surah ${surahIndex} not found`);
      }

      // Find surah in Urdu data
      const urduSuras = Array.isArray(urduData.quran.sura) ? urduData.quran.sura : [urduData.quran.sura];
      const urduSurah = urduSuras.find(s => 
        parseInt(s.$.index) === surahIndex
      );

      if (!urduSurah) {
        throw new Error(`Urdu surah ${surahIndex} not found`);
      }

      // Process ayahs
      const ayahs = [];
      const arabicAyahs = Array.isArray(arabicSurah.aya) ? arabicSurah.aya : [arabicSurah.aya];
      const urduAyahs = Array.isArray(urduSurah.aya) ? urduSurah.aya : [urduSurah.aya];
      
      for (const arabicAyah of arabicAyahs) {
        const ayahIndex = parseInt(arabicAyah.$.index);
        
        // Find corresponding Urdu ayah
        const urduAyah = urduAyahs.find(a => 
          parseInt(a.$.index) === ayahIndex
        );

        const ayahData = {
          index: ayahIndex,
          arabicText: arabicAyah.$.text,
          urduTranslation: urduAyah ? urduAyah.$.text : '',
          bismillah: arabicAyah.$.bismillah || ''
        };

        ayahs.push(ayahData);
      }

      // Create or update surah in database
      const surahData = {
        index: surahIndex,
        name: arabicSurah.$.name,
        englishName: this.getEnglishName(surahIndex),
        totalAyahs: ayahs.length,
        ayahs: ayahs
      };

      await Surah.findOneAndUpdate(
        { index: surahIndex },
        surahData,
        { upsert: true, new: true }
      );

      console.log(`Surah ${surahIndex} (${arabicSurah.$.name}) processed successfully with ${ayahs.length} ayahs`);

    } catch (error) {
      console.error(`Error processing surah ${surahIndex}:`, error);
      throw error;
    }
  }

  /**
   * Get English name for surah
   * @param {number} surahIndex - Surah index
   * @returns {string} English name
   */
  getEnglishName(surahIndex) {
    const englishNames = {
      112: 'Al-Ikhlas',
      113: 'Al-Falaq',
      114: 'An-Nas'
    };
    
    return englishNames[surahIndex] || '';
  }

  /**
   * Check database status
   */
  async checkDatabaseStatus() {
    try {
      const count = await Surah.countDocuments();
      const surahs = await Surah.find({}, { index: 1, name: 1, totalAyahs: 1 }).sort({ index: 1 });
      
      return {
        totalSurahs: count,
        surahs: surahs
      };
    } catch (error) {
      console.error('Error checking database status:', error);
      throw error;
    }
  }
}

module.exports = new DataImportService();
