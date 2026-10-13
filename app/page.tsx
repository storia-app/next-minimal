import Link from "next/link";
import { SITE } from "@/site.config";
import { formatDate, getPosts } from "@/lib/posts";

export default function Home() {
  const posts = getPosts();
  return (
    <>
      <p className="intro">{SITE.description}</p>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
            <time dateTime={post.date.toISOString()}>{formatDate(post.date, SITE.lang)}</time>
          </li>
        ))}
      </ul>
      {posts.length === 0 && <p className="intro">Todavía no hay artículos.</p>}
    </>
  );
}
