export default function PostHTML({ html }: { html: string }) {
  return <div className="post" dangerouslySetInnerHTML={{ __html: html }} />;
}
