import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = process.env.API_URL || 'http://localhost:8080';
  try {
    const response = await axios.get(`${apiUrl}/coins/top`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching top coins:', error);
    res.status(500).json({ message: 'Error fetching top coins' });
  }
}