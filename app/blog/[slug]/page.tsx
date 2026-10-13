import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/site.config";
import { formatDate, getPost, getPosts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return (
    <article>
      <h1>{post.title}</h1>
      <time className="meta" dateTime={post.date.toISOString()}>
        {formatDate(post.date, SITE.lang)}
      </time>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      {post.tags.length > 0 && (
        <p className="tags">
          {post.tags.map((t) => (
            <span key={t}>#{t}</span>
          ))}
        </p>
      )}
    </article>
  );
}
