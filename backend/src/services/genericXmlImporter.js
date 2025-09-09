const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const Surah = require('../models/Surah');

class GenericXmlImporter {
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
   * Generic function to import any XML file containing Quran data
   * @param {string} arabicXmlPath - Path to Arabic XML file
   * @param {string} urduXmlPath - Path to Urdu XML file (optional)
   * @param {Array} surahIndexes - Array of surah indexes to import (e.g., [1, 2, 3] or [112, 113, 114])
   * @param {boolean} clearExisting - Whether to clear existing data before import
   * @returns {Object} Import result
   */
  async importFromXml(arabicXmlPath, urduXmlPath = null, surahIndexes = [], clearExisting = false) {
    try {
      console.log('Starting generic XML import...');
      console.log('Arabic file:', arabicXmlPath);
      console.log('Urdu file:', urduXmlPath);
      console.log('Surah indexes:', surahIndexes);

      // Validate file paths
      if (!fs.existsSync(arabicXmlPath)) {
        throw new Error(`Arabic XML file not found: ${arabicXmlPath}`);
      }

      if (urduXmlPath && !fs.existsSync(urduXmlPath)) {
        throw new Error(`Urdu XML file not found: ${urduXmlPath}`);
      }

      // Clear existing data if requested
      if (clearExisting) {
        console.log('Clearing existing data...');
        await Surah.deleteMany({});
      }

      // Parse XML files
      console.log('Parsing Arabic XML file...');
      const arabicData = await this.parseXmlFile(arabicXmlPath);

      let urduData = null;
      if (urduXmlPath) {
        console.log('Parsing Urdu XML file...');
        urduData = await this.parseXmlFile(urduXmlPath);
      }

      // If no specific indexes provided, import all surahs
      let targetSurahs = surahIndexes;
      if (targetSurahs.length === 0) {
        // Extract all surah indexes from Arabic XML
        const arabicSuras = Array.isArray(arabicData.quran.sura) ? arabicData.quran.sura : [arabicData.quran.sura];
        targetSurahs = arabicSuras.map(s => parseInt(s.$.index));
        console.log('No specific indexes provided. Importing all surahs:', targetSurahs.length);
      }

      console.log('Processing surahs:', targetSurahs);

      let successCount = 0;
      let errorCount = 0;

      // Process each surah
      for (const surahIndex of targetSurahs) {
        try {
          await this.processSurah(surahIndex, arabicData, urduData);
          successCount++;
        } catch (error) {
          console.error(`Failed to process surah ${surahIndex}:`, error.message);
          errorCount++;
        }
      }

      console.log(`Import completed. Success: ${successCount}, Errors: ${errorCount}`);

      return {
        success: true,
        message: 'XML import completed',
        imported: successCount,
        errors: errorCount,
        totalProcessed: targetSurahs.length
      };

    } catch (error) {
      console.error('Generic XML import failed:', error);
      throw error;
    }
  }

  /**
   * Parse XML file with error handling
   * @param {string} filePath - Path to XML file
   * @returns {Object} Parsed XML data
   */
  async parseXmlFile(filePath) {
    try {
      let xmlContent = fs.readFileSync(filePath, 'utf8');
      
      // Clean up problematic comments
      xmlContent = xmlContent.replace(/<!--[\s\S]*?-->/g, '');
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
   * @param {Object} urduData - Parsed Urdu XML data (optional)
   */
  async processSurah(surahIndex, arabicData, urduData = null) {
    try {
      console.log(`Processing Surah ${surahIndex}...`);

      // Find surah in Arabic data
      const arabicSuras = Array.isArray(arabicData.quran.sura) ? arabicData.quran.sura : [arabicData.quran.sura];
      const arabicSurah = arabicSuras.find(s => parseInt(s.$.index) === surahIndex);

      if (!arabicSurah) {
        throw new Error(`Arabic surah ${surahIndex} not found in XML`);
      }

      // Find surah in Urdu data (if provided)
      let urduSurah = null;
      if (urduData) {
        const urduSuras = Array.isArray(urduData.quran.sura) ? urduData.quran.sura : [urduData.quran.sura];
        urduSurah = urduSuras.find(s => parseInt(s.$.index) === surahIndex);
        
        if (!urduSurah) {
          console.log(`Warning: Urdu surah ${surahIndex} not found, continuing without translation`);
        }
      }

      // Process ayahs
      const ayahs = [];
      const arabicAyahs = Array.isArray(arabicSurah.aya) ? arabicSurah.aya : [arabicSurah.aya];
      const urduAyahs = urduSurah ? (Array.isArray(urduSurah.aya) ? urduSurah.aya : [urduSurah.aya]) : [];
      
      for (const arabicAyah of arabicAyahs) {
        const ayahIndex = parseInt(arabicAyah.$.index);
        
        // Find corresponding Urdu ayah
        const urduAyah = urduAyahs.find(a => parseInt(a.$.index) === ayahIndex);

        const ayahData = {
          index: ayahIndex,
          arabicText: arabicAyah.$.text || '',
          urduTranslation: urduAyah ? (urduAyah.$.text || '') : '',
          bismillah: arabicAyah.$.bismillah || ''
        };

        ayahs.push(ayahData);
      }

      // Create or update surah in database
      const surahData = {
        index: surahIndex,
        name: arabicSurah.$.name || '',
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
   * Get English name for surah (you can extend this mapping)
   * @param {number} surahIndex - Surah index
   * @returns {string} English name
   */
  getEnglishName(surahIndex) {
    const englishNames = {
      1: 'Al-Fatihah',
      2: 'Al-Baqarah',
      3: 'Al-Imran',
      // Add more mappings as needed
      112: 'Al-Ikhlas',
      113: 'Al-Falaq',
      114: 'An-Nas'
    };
    
    return englishNames[surahIndex] || `Surah-${surahIndex}`;
  }

  /**
   * Helper function to import specific range of surahs
   * @param {string} arabicXmlPath - Path to Arabic XML file
   * @param {string} urduXmlPath - Path to Urdu XML file
   * @param {number} startIndex - Starting surah index
   * @param {number} endIndex - Ending surah index
   * @param {boolean} clearExisting - Whether to clear existing data
   */
  async importSurahRange(arabicXmlPath, urduXmlPath, startIndex, endIndex, clearExisting = false) {
    const surahIndexes = [];
    for (let i = startIndex; i <= endIndex; i++) {
      surahIndexes.push(i);
    }
    
    return this.importFromXml(arabicXmlPath, urduXmlPath, surahIndexes, clearExisting);
  }

  /**
   * Helper function to import first N surahs
   * @param {string} arabicXmlPath - Path to Arabic XML file
   * @param {string} urduXmlPath - Path to Urdu XML file
   * @param {number} count - Number of surahs to import from start
   * @param {boolean} clearExisting - Whether to clear existing data
   */
  async importFirstNSurahs(arabicXmlPath, urduXmlPath, count, clearExisting = false) {
    const surahIndexes = [];
    for (let i = 1; i <= count; i++) {
      surahIndexes.push(i);
    }
    
    return this.importFromXml(arabicXmlPath, urduXmlPath, surahIndexes, clearExisting);
  }

  /**
   * Helper function to import last N surahs
   * @param {string} arabicXmlPath - Path to Arabic XML file
   * @param {string} urduXmlPath - Path to Urdu XML file
   * @param {number} count - Number of surahs to import from end
   * @param {boolean} clearExisting - Whether to clear existing data
   */
  async importLastNSurahs(arabicXmlPath, urduXmlPath, count, clearExisting = false) {
    const surahIndexes = [];
    for (let i = 114 - count + 1; i <= 114; i++) {
      surahIndexes.push(i);
    }
    
    return this.importFromXml(arabicXmlPath, urduXmlPath, surahIndexes, clearExisting);
  }
}

module.exports = new GenericXmlImporter();
