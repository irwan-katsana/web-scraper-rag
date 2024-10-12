import axios from 'axios';
import cheerio from 'cheerio';
import robotsParser from 'robots-parser';

export async function crawlWebpage(url: string): Promise<string[]> {
  try {
    // Fetch robots.txt
    const robotsTxtUrl = new URL('/robots.txt', url).toString();
    const robotsTxtResponse = await axios.get(robotsTxtUrl);
    const robots = robotsParser(robotsTxtUrl, robotsTxtResponse.data);

    // Check if crawling is allowed
    if (!robots.isAllowed(url)) {
      throw new Error('Crawling not allowed by robots.txt');
    }

    // Fetch the webpage
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract links
    const links: string[] = [];
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith('http')) {
        links.push(href);
      }
    });

    return links;
  } catch (error) {
    console.error('Error crawling webpage:', error);
    throw error;
  }
}

export async function extractTextFromUrls(urls: string[]): Promise<string> {
  try {
    const textPromises = urls.map(async (url) => {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      // Remove script and style elements
      $('script, style').remove();
      // Get the text content
      return $('body').text().trim();
    });

    const texts = await Promise.all(textPromises);
    return texts.join('\n\n');
  } catch (error) {
    console.error('Error extracting text:', error);
    throw error;
  }
}