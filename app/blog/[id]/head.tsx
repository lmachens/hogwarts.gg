import createClient from '#/lib/supabase-server';
import { DefaultTags } from '#/ui/DefaultTags';
import { notFound } from 'next/navigation';

export default async function Head({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const supabase = createClient();

  const result = await supabase.from('posts').select().eq('id', +params.id);
  const post = result.data?.[0];
  if (!post) {
    notFound();
  }

  return (
    <>
      <DefaultTags />
      <title>{`${post.title} - Hogwarts Legacy Map and Tools - Hogwarts.gg`}</title>
      <meta
        name="title"
        content={`${post.title} - Hogwarts Legacy Map and Tools - Hogwarts.gg`}
      />
      <meta
        name="description"
        content="Get all the Hogwarts Legacy locations, secrets, chests, entrances and more."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.hogwarts.gg/" />
      <meta
        property="og:title"
        content={`${post.title} - Hogwarts Legacy Map and Tools - Hogwarts.gg`}
      />
      <meta
        property="og:description"
        content="Get all the Hogwarts Legacy locations, secrets, chests, entrances and more."
      />
      <meta property="og:image" content="/assets/social.jpg" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.hogwarts.gg/" />
      <meta
        property="twitter:title"
        content={`${post.title} - Hogwarts Legacy Map and Tools - Hogwarts.gg`}
      />
      <meta
        property="twitter:description"
        content="Get all the Hogwarts Legacy locations, secrets, chests, entrances and more."
      />
      <meta property="twitter:image" content="/assets/social.jpg" />
    </>
  );
}
