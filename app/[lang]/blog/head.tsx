import { DefaultTags } from '#/ui/DefaultTags';

export default function Head() {
  return (
    <>
      <DefaultTags />
      <title>Blog - Hogwarts Legacy Map and Tools - Hogwarts.gg</title>
      <meta
        name="title"
        content="Blog - Hogwarts Legacy Map and Tools - Hogwarts.gg"
      />
      <meta
        name="description"
        content="Get all the Hogwarts Legacy locations, secrets, chests, entrances and more."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.hogwarts.gg/" />
      <meta
        property="og:title"
        content="Blog - Hogwarts Legacy Map and Tools - Hogwarts.gg"
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
        content="Blog - Hogwarts Legacy Map and Tools - Hogwarts.gg"
      />
      <meta
        property="twitter:description"
        content="Get all the Hogwarts Legacy locations, secrets, chests, entrances and more."
      />
      <meta property="twitter:image" content="/assets/social.jpg" />
    </>
  );
}
