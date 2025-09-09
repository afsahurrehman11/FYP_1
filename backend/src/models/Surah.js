const mongoose = require('mongoose');

// Schema for individual Ayah (verse)
const ayahSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true
  },
  arabicText: {
    type: String,
    required: true
  },
  urduTranslation: {
    type: String,
    default: ''
  },
  bismillah: {
    type: String,
    default: ''
  }
}, { _id: false });

// Schema for Surah (chapter)
const surahSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  englishName: {
    type: String,
    default: ''
  },
  totalAyahs: {
    type: Number,
    required: true
  },
  ayahs: [ayahSchema]
}, {
  timestamps: true
});

// Create indexes for better performance (removed duplicate index)
surahSchema.index({ name: 1 });
surahSchema.index({ englishName: 1 });

const Surah = mongoose.model('Surah', surahSchema);

module.exports = Surah;
