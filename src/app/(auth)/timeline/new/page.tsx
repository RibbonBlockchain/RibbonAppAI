"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Tweet {
  id: string;
  text: string;
  created_at: string;
}

const TimelinePage = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const userId = "1384590339286179843";
  const BEARER_TOKEN =
    "AAAAAAAAAAAAAAAAAAAAAJH4xwEAAAAADCwVkVJWbRSiF8tp9mqeHoEz4Jc%3DIBR9p9I3GOea2yWhU4h0gh9uNeKx8If9rZjY5wfmAbD67k9wyX";

  useEffect(() => {
    const fetchTweets = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.twitter.com/2/users/${userId}/tweets`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );
        console.log(response.data, "response here");

        setTweets(response.data.data || []);
      } catch (err) {
        console.log(err, "eror");
        setError("Failed to fetch tweets");
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [userId]);

  return (
    <div>
      <h1>User Timeline</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {tweets.length === 0 ? (
          <p>No tweets found.</p>
        ) : (
          tweets.map((tweet) => (
            <div key={tweet.id} style={{ marginBottom: "20px" }}>
              <p>{tweet.text}</p>
              <small>{tweet.created_at}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TimelinePage;
