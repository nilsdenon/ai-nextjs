import Link from "next/link";
import Image from 'next/image';

type Params = {
    slug: string;
  }

export default async function PostPage({ params }: { params: Params }) {
  const slug = params.slug;
    
  const response = await fetch('https://photofolio.damienpierre.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query PostBySlug($slug: ID!) {
          post(id: $slug, idType: SLUG) {
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
      `,
      variables: {
        slug: slug
      }
    })
  });

  const data = await response.json();
  const post = data.data.post;

  if (!post) {
    return <div>Post not found</div>;
  }

  type Photo = {
    id: string;
    mediaItemUrl: string;
    slug: string;
    srcSet: string;
    sizes: string;
    sourceUrl: string;
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.slug }} />
      <div>
        {post.gallery.photo.map((photo: Photo) => (
          <Link key={photo.id} href={photo.mediaItemUrl}>
            <Image 
              src={photo.sourceUrl} 
              alt={photo.slug}
              width={300} // Adjust width as needed
              height={200} // Adjust height as needed
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
