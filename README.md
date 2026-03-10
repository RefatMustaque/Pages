# Notes by Refat Mustaque

Personal blog built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/).

**Live site:** [blog.refatmustaque.com](https://blog.refatmustaque.com)

## Tech Stack

- Jekyll 4.3.x
- GitHub Pages (hosting)
- Cloudflare (DNS)
- Custom CSS (no framework)

## Local Development

Requires Ruby 3.2 and Bundler 2.4.22. See [SETUP.md](SETUP.md) for full instructions.

```bash
bundle _2.4.22_ install
bundle _2.4.22_ exec jekyll serve
```

Open http://localhost:4000

## Project Structure

```
├── _config.yml       # Site configuration
├── _layouts/         # HTML templates
├── _posts/           # Blog posts (Markdown)
├── assets/           # CSS, JS, images
├── index.md          # Homepage
├── about.md          # About page
├── CNAME             # Custom domain for GitHub Pages
├── SETUP.md          # Detailed setup and troubleshooting guide
└── Gemfile           # Ruby dependencies
```

## Adding a Post

Create a file in `_posts/` named `YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: "Post Title"
date: 2026-03-10
---

Content in Markdown.
```

## License

Content © Refat Mustaque. All rights reserved.
