import Link from "next/link";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
};

export default async function Home() {
  const response = await fetch('https://photofolio.damienpierre.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          posts {
            nodes {
              id
              title
              slug
              gallery {
                photo {
                  id
                  mediaItemUrl
                  slug
                  srcSet(size: LARGE)
                  sizes
                  sourceUrl(size: THUMBNAIL)
                }
              }
            }
          }
        }
      `
    })
  });

  const data = await response.json();

  return (
    <main>
      <h1>Latest Posts</h1>
      <ul>
        {data.data.posts.nodes.map((post: Post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
