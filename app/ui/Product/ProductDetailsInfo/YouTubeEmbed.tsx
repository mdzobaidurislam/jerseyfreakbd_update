import React from 'react';

interface YouTubeEmbedProps {
    videoLink: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoLink }) => {
    // Extract the video ID from the full YouTube URL
    const videoId = videoLink.split('v=')[1];
    if (!videoId) {
        return <p>Invalid video link</p>;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div
            className="video-container"
            style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}
        >
            <iframe
                src={embedUrl}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
        </div>
    );
};

export default YouTubeEmbed