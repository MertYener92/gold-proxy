export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const response = await fetch(
      'https://api.canlidoviz.com/web/items?marketId=1&type=1',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': 'applica
