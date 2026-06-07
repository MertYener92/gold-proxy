const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  const options = {
    hostname: 'api.canlidoviz.com',
    path: '/web/items?marketId=1&type=1',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Accept': 'application/json',
      'Referer': 'https://www.canlidoviz.com/',
      'Origin': 'https://www.canlidoviz.com',
    },
  };

  try {
    const data = await new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        let body = '';
        response.on('data', chunk => body += chunk);
        response.on('end', () => {
          try { resolve(JSON.parse(body)); }
          catch(e) { reject(new Error('Parse error: ' + body.slice(0, 100))); }
        });
      });
      req.on('error', reject);
      req.setTimeout(10000, () => reject(new Error('Timeout')));
      req.end();
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
