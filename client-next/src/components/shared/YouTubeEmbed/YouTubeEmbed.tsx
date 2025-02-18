interface YouTubeEmbedProps {
  videoId: string;
}
const YouTubeEmbed = ({ videoId }: YouTubeEmbedProps) => {
  return (
    <div>
      <iframe
        width="100%"
        height="290"
        className="rounded-2xl"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
