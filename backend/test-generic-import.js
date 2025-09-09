// Test script for generic XML importer
// Run this with: node test-generic-import.js

const genericXmlImporter = require('./src/services/genericXmlImporter');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

async function testGenericImporter() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Define file paths
    const arabicFile = path.join(__dirname, '../dataset to load in DB/quran-simple.xml');
    const urduFile = path.join(__dirname, '../dataset to load in DB/ur.jalandhry.xml');

    console.log('=== GENERIC XML IMPORTER TEST EXAMPLES ===\n');

    // Example 1: Import specific surahs
    console.log('1. Import specific surahs (1, 2, 112):');
    const result1 = await genericXmlImporter.importFromXml(
      arabicFile,
      urduFile,
      [1, 2, 112],  // Specific surah indexes
      true          // Clear existing data
    );
    console.log('Result:', result1);
    console.log('');

    // Example 2: Import range of surahs
    console.log('2. Import range of surahs (110-114):');
    const result2 = await genericXmlImporter.importSurahRange(
      arabicFile,
      urduFile,
      110,          // Start index
      114,          // End index
      false         // Don't clear existing data
    );
    console.log('Result:', result2);
    console.log('');

    // Example 3: Import first 5 surahs
    console.log('3. Import first 5 surahs:');
    const result3 = await genericXmlImporter.importFirstNSurahs(
      arabicFile,
      urduFile,
      5,            // Count
      false         // Don't clear existing data
    );
    console.log('Result:', result3);
    console.log('');

    // Example 4: Import last 3 surahs
    console.log('4. Import last 3 surahs:');
    const result4 = await genericXmlImporter.importLastNSurahs(
      arabicFile,
      urduFile,
      3,            // Count
      false         // Don't clear existing data
    );
    console.log('Result:', result4);
    console.log('');

    // Example 5: Import all surahs (empty array means all)
    console.log('5. Import ALL surahs (this may take time):');
    // Uncomment the next lines to import all surahs
    /*
    const result5 = await genericXmlImporter.importFromXml(
      arabicFile,
      urduFile,
      [],           // Empty array = all surahs
      true          // Clear existing data
    );
    console.log('Result:', result5);
    */
    console.log('(Commented out - uncomment to import all 114 surahs)');

    console.log('\n=== TEST COMPLETED ===');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the test
testGenericImporter();
