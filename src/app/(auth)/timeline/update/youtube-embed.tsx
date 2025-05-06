import "./styles.css";

interface YouTubeEmbedProps {
  url: string;
}

const YouTubeEmbed = ({ url }: YouTubeEmbedProps) => {
  // Extract video ID from URL
  const videoId = url.includes("shorts/")
    ? url.split("shorts/")[1].split("?")[0]
    : url.split("v=")[1]?.split("&")[0];

  return (
    <div className="youtube-embed">
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      />
    </div>
  );
};

export default YouTubeEmbed;
