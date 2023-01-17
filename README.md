# Hogwarts.gg

[Hogwarts.gg](https://www.hogwarts.gg) is a Hogwarts Legacy fansite with an interactive map, blog and tools.

## Contribution

This app is Open Source. Contributors are highly welcome!
Join the [Discord](https://discord.com/invite/NTZu8Px).

Please add issues and feature requests on the Discord channel #suggestions.

# Environment variables

You can start by copying the template environment variables file.

```
cp template.env .env
```

The following list shows the variables you need to set:

| KEY                            | VALUE                                |
| ------------------------------ | ------------------------------------ |
| NEXT_PUBLIC_SUPABASE_URL       | Your project's Supabase URL \        |
| NEXT_PUBLIC_SUPABASE_ANON_KEY  | Your project's Supabase URL anon key |
| NEXT_PUBLIC_PLAUSIBLE_API_HOST | Plausible API host (optional)        |
| NEXT_PUBLIC_PLAUSIBLE_DOMAIN   | Plausible domain (optional)          |

## Running Locally

1. Install dependencies:

```sh
pnpm install
```

2. Start the dev server:

```sh
pnpm dev
```

## Licensing

MIT
