import mongoose from 'mongoose';

const scrapedDataSchema = new mongoose.Schema({
  urls: [String],
  extractedText: String,
  timestamp: Date
});

export const ScrapedData = mongoose.model('ScrapedData', scrapedDataSchema);