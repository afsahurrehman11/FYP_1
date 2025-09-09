const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Import routes
const quranRoutes = require('./routes/quranRoutes');
const dataImportService = require('./services/dataImportService');
const genericXmlImporter = require('./services/genericXmlImporter');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:19006', 'http://localhost:8081', 'http://127.0.0.1:5500', 'http://localhost:5500'], // Allow frontend origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    // Auto-import data on startup if not already imported
    setTimeout(checkAndImportData, 2000);
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api', quranRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'Quran API Server is running',
    status: 'Connected to MongoDB',
    endpoints: {
      'GET /api/surahs': 'Get all surahs (summary)',
      'GET /api/surah/:identifier': 'Get specific surah by index or name',
      'GET /api/surah/:identifier?includeTranslation=true': 'Get surah with Urdu translation',
      'GET /api/surah/:identifier?ayahIndex=1': 'Get specific ayah from surah',
      'POST /api/import-data': 'Import last 3 surahs from XML files'
    }
  });
});

// Manual import endpoint for testing
app.post('/api/import-data', async (req, res) => {
  try {
    console.log('Manual data import requested...');
    const result = await dataImportService.importLastThreeSurahs();
    res.json(result);
  } catch (error) {
    console.error('Import failed:', error);
    res.status(500).json({
      success: false,
      message: 'Import failed',
      error: error.message
    });
  }
});

// Manual test data insertion
app.post('/api/insert-test-data', async (req, res) => {
  try {
    console.log('Inserting test data...');
    const Surah = require('./models/Surah');
    
    // Clear existing data
    await Surah.deleteMany({});
    
    // Insert test data for Surah Al-Ikhlas (112)
    const testSurah = new Surah({
      index: 112,
      name: 'الإخلاص',
      englishName: 'Al-Ikhlas',
      totalAyahs: 4,
      ayahs: [
        {
          index: 1,
          arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
          urduTranslation: 'کہو کہ وہ (ذات پاک جس کا نام) الله (ہے) ایک ہے',
          bismillah: 'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ'
        },
        {
          index: 2,
          arabicText: 'اللَّهُ الصَّمَدُ',
          urduTranslation: 'معبود برحق جو بےنیاز ہے'
        },
        {
          index: 3,
          arabicText: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
          urduTranslation: 'نہ کسی کا باپ ہے اور نہ کسی کا بیٹا'
        },
        {
          index: 4,
          arabicText: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
          urduTranslation: 'اور کوئی اس کا ہمسر نہیں'
        }
      ]
    });
    
    await testSurah.save();
    
    // Insert Surah An-Nas (114)
    const testSurah2 = new Surah({
      index: 114,
      name: 'الناس',
      englishName: 'An-Nas',
      totalAyahs: 6,
      ayahs: [
        {
          index: 1,
          arabicText: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
          urduTranslation: 'کہو کہ میں لوگوں کے پروردگار کی پناہ مانگتا ہوں',
          bismillah: 'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ'
        },
        {
          index: 2,
          arabicText: 'مَلِكِ النَّاسِ',
          urduTranslation: '(یعنی) لوگوں کے حقیقی بادشاہ کی'
        },
        {
          index: 3,
          arabicText: 'إِلَـٰهِ النَّاسِ',
          urduTranslation: 'لوگوں کے معبود برحق کی'
        },
        {
          index: 4,
          arabicText: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
          urduTranslation: '(شیطان) وسوسہ انداز کی برائی سے جو (خدا کا نام سن کر) پیچھے ہٹ جاتا ہے'
        },
        {
          index: 5,
          arabicText: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
          urduTranslation: 'جو لوگوں کے دلوں میں وسوسے ڈالتا ہے'
        },
        {
          index: 6,
          arabicText: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
          urduTranslation: 'وہ جنّات میں سے (ہو) یا انسانوں میں سے'
        }
      ]
    });
    
    await testSurah2.save();
    
    // Insert Surah Al-Falaq (113)
    const testSurah3 = new Surah({
      index: 113,
      name: 'الفلق',
      englishName: 'Al-Falaq',
      totalAyahs: 5,
      ayahs: [
        {
          index: 1,
          arabicText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
          urduTranslation: 'کہو کہ میں صبح کے پروردگار کی پناہ مانگتا ہوں',
          bismillah: 'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ'
        },
        {
          index: 2,
          arabicText: 'مِن شَرِّ مَا خَلَقَ',
          urduTranslation: 'ہر چیز کی بدی سے جو اس نے پیدا کی'
        },
        {
          index: 3,
          arabicText: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
          urduTranslation: 'اور شب تاریکی کی برائی سے جب اس کااندھیرا چھا جائے'
        },
        {
          index: 4,
          arabicText: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
          urduTranslation: 'اور گنڈوں پر (پڑھ پڑھ کر) پھونکنے والیوں کی برائی سے'
        },
        {
          index: 5,
          arabicText: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
          urduTranslation: 'اور حسد کرنے والے کی برائی سے جب حسد کرنے لگے'
        }
      ]
    });
    
    await testSurah3.save();
    
    console.log('Test data inserted successfully!');
    res.json({
      success: true,
      message: 'Test data inserted successfully',
      surahs: [
        { index: 112, name: 'الإخلاص', englishName: 'Al-Ikhlas' },
        { index: 113, name: 'الفلق', englishName: 'Al-Falaq' },
        { index: 114, name: 'الناس', englishName: 'An-Nas' }
      ]
    });
    
  } catch (error) {
    console.error('Test data insertion failed:', error);
    res.status(500).json({
      success: false,
      message: 'Test data insertion failed',
      error: error.message
    });
  }
});

// Generic XML import endpoint
app.post('/api/import-xml', async (req, res) => {
  try {
    console.log('Generic XML import requested...');
    const { arabicFile, urduFile, surahIndexes, clearExisting } = req.body;
    
    // Default paths if not provided
    const arabicPath = arabicFile || path.join(__dirname, '../../dataset to load in DB/quran-simple.xml');
    const urduPath = urduFile || path.join(__dirname, '../../dataset to load in DB/ur.jalandhry.xml');
    
    const result = await genericXmlImporter.importFromXml(
      arabicPath,
      urduPath,
      surahIndexes || [],
      clearExisting || false
    );
    
    res.json(result);
  } catch (error) {
    console.error('Generic XML import failed:', error);
    res.status(500).json({
      success: false,
      message: 'Generic XML import failed',
      error: error.message
    });
  }
});

// Import specific surah range
app.post('/api/import-range', async (req, res) => {
  try {
    console.log('Surah range import requested...');
    const { startIndex, endIndex, clearExisting } = req.body;
    
    if (!startIndex || !endIndex) {
      return res.status(400).json({
        success: false,
        message: 'startIndex and endIndex are required'
      });
    }
    
    const arabicPath = path.join(__dirname, '../../dataset to load in DB/quran-simple.xml');
    const urduPath = path.join(__dirname, '../../dataset to load in DB/ur.jalandhry.xml');
    
    const result = await genericXmlImporter.importSurahRange(
      arabicPath,
      urduPath,
      parseInt(startIndex),
      parseInt(endIndex),
      clearExisting || false
    );
    
    res.json(result);
  } catch (error) {
    console.error('Range import failed:', error);
    res.status(500).json({
      success: false,
      message: 'Range import failed',
      error: error.message
    });
  }
});

// Database status endpoint
app.get('/api/status', async (req, res) => {
  try {
    const status = await dataImportService.checkDatabaseStatus();
    res.json({
      success: true,
      database: 'Connected',
      ...status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to check database status',
      error: error.message
    });
  }
});

// Auto-import data function
async function checkAndImportData() {
  try {
    const status = await dataImportService.checkDatabaseStatus();
    if (status.totalSurahs === 0) {
      console.log('No data found in database. Starting auto-import...');
      await dataImportService.importLastThreeSurahs();
    } else {
      console.log(`Database already contains ${status.totalSurahs} surahs`);
    }
  } catch (error) {
    console.error('Auto-import failed:', error);
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend can connect to: http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/`);
});
