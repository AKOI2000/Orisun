export default function PostBlock({ block }) {
  const content = block.content;

  if (block.type === 'paragraph') {
    if (!content.text) return null;
    return <p className="thought-block thought-block--paragraph">{content.text}</p>;
  }

  if (block.type === 'quote') {
    if (!content.text) return null;
    return (
      <blockquote className="thought-block thought-block--quote">
        <p>{content.text}</p>
        {content.attribution && <cite>— {content.attribution}</cite>}
      </blockquote>
    );
  }

  if (block.type === 'image') {
    if (!content.url) return null;
    return (
      <figure className="thought-block thought-block--image">
        <img src={content.url} alt={content.alt || ''} />
        {content.caption && <figcaption>{content.caption}</figcaption>}
      </figure>
    );
  }

  if (block.type === 'music') {
    if (!content.url) return null;
    return (
      <div className="thought-block thought-block--music">
        {(content.title || content.artist) && (
          <p className="thought-block__music-label">
            {content.title}
            {content.title && content.artist ? ' — ' : ''}
            {content.artist}
          </p>
        )}
        <audio src={content.url} controls />
      </div>
    );
  }

  return null;
}