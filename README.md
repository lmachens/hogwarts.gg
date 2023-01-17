# Hogwarts.gg

[Hogwarts.gg](https://www.hogwarts.gg) is a Hogwarts Legacy fansite with an interactive map, blog and tools.

![](/assets/social.jpg)

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

## Migrations

This project is using [supabase](https://supabase.com/), which comes with a CLI tool to generate database migrations.
See the [guide](https://supabase.com/docs/reference/cli/introduction) for more details.

A database migration is prepared with:

```sh
supabase migration new <migration name>
```

A `.sql` file is generated in supabase/migrations.

## Licensing

MIT

Game content and assets are trademarks of Warner Bros. Entertainment Inc.
