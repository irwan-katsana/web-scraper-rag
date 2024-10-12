import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { crawlWebpage, extractTextFromUrls } from '../src/utils/webCrawler.js';
import { ScrapedData } from './models/scrapedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.post('/api/crawl', async (req, res) => {
  try {
    const { url } = req.body;
    const links = await crawlWebpage(url);
    res.json({ links });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/extract', async (req, res) => {
  try {
    const { urls } = req.body;
    const extractedText = await extractTextFromUrls(urls);
    
    const scrapedData = new ScrapedData({
      urls,
      extractedText,
      timestamp: new Date()
    });
    await scrapedData.save();

    res.json({ extractedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});