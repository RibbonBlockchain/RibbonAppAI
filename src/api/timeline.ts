// pages/api/timeline.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Your Twitter API Bearer Token
const BEARER_TOKEN =
  "AAAAAAAAAAAAAAAAAAAAAJH4xwEAAAAADCwVkVJWbRSiF8tp9mqeHoEz4Jc%3DIBR9p9I3GOea2yWhU4h0gh9uNeKx8If9rZjY5wfmAbD67k9wyX";

// Twitter user ID (replace with the user ID you're interested in)
const userId = "1384590339286179843";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Call Twitter API from the server
    const response = await axios.get(
      `https://api.twitter.com/2/users/${userId}/tweets`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    // Respond with the tweet data
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
}
