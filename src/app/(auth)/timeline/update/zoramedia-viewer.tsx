import "./styles.css";

interface ZoraMediaViewerProps {
  item: {
    id: string;
    mediaUrl: string;
    title?: string;
  };
}

const ZoraMediaViewer = ({ item }: ZoraMediaViewerProps) => {
  // In a real implementation, you would use Zora's API
  return (
    <div className="zora-media-viewer">
      <div className="zora-media-container">
        <a href={item.mediaUrl} target="_blank" rel="noopener noreferrer">
          <div className="zora-media-placeholder">
            <h3>{item.title || "Zora NFT"}</h3>
            <p>View on Zora</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ZoraMediaViewer;
