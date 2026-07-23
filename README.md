# My CF Portfolio

Abrar Ahmed's standalone AI engineering portfolio and lead-generation landing page.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact form

Copy `.env.example` to `.env.local` and provide SMTP credentials.
The contact endpoint sends submissions to `EMAIL_TO`, which defaults to `info@aifantry.com`.

## Validation

```bash
npm run lint
npm run build
```

## Cloudflare deployment

The project is configured for Cloudflare Workers through the OpenNext adapter.

```bash
npm run cf:build
npm run preview
npm run deploy
```

Set the SMTP values from `.env.example` as encrypted runtime secrets in the Cloudflare dashboard before using the contact form in production.
