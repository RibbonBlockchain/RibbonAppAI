import "./styles.css";

interface TikTokEmbedProps {
  url: string;
}

const TikTokEmbed = ({ url }: TikTokEmbedProps) => {
  // Extract video ID from URL
  const videoId = url.split("/video/")[1]?.split("?")[0] || "";

  return (
    <div className="tiktok-embed">
      <blockquote
        className="tiktok-embed"
        cite={url}
        data-video-id={videoId}
        style={{ maxWidth: "605px", minWidth: "325px" }}
      >
        <section>
          <a target="_blank" rel="noopener noreferrer" href={url}>
            View on TikTok
          </a>
        </section>
      </blockquote>
      <script async src="https://www.tiktok.com/embed.js"></script>
    </div>
  );
};

export default TikTokEmbed;
