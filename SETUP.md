# Jekyll Blog Setup Reference

This file documents the local development setup, project structure, known issues encountered, and how they were resolved.

---

## Prerequisites (macOS)

- **Homebrew**: https://brew.sh
- **Ruby 3.2** (via Homebrew — do NOT use system Ruby or Ruby 4.x for this project)
- **Bundler 2.4.22**

### Why Ruby 3.2 instead of Ruby 4.x

Jekyll 4.3.x and its dependencies (like `safe_yaml`) expect standard library modules (`csv`, `base64`, etc.) to be bundled with Ruby. Starting with Ruby 3.3+, these modules were extracted into separate gems, causing a chain of `cannot load such file` errors. Using Ruby 3.2 avoids this entirely.

### Why Bundler 2.4.22 instead of Bundler 4.x

Bundler 4.x ships as the default gem with Ruby 4.x. Jekyll and many Ruby gems are not yet compatible with Bundler 4. Using Bundler 2.4.22 avoids `LoadError` and version mismatch issues.

---

## Installation Steps

### 1. Install Ruby 3.2 via Homebrew

```bash
brew install ruby@3.2
```

### 2. Set PATH for Homebrew Ruby

Add the following to `~/.zshrc`:

```bash
export PATH="/opt/homebrew/opt/ruby@3.2/bin:$PATH"
```

Then reload:

```bash
source ~/.zshrc
hash -r
```

### 3. Verify Ruby version

```bash
ruby -v       # Should show 3.2.x
which ruby    # Should show /opt/homebrew/opt/ruby@3.2/bin/ruby
```

### 4. Install Bundler 2.4.22

```bash
gem install bundler -v 2.4.22
```

### 5. Install project dependencies

```bash
cd /path/to/this/project
bundle _2.4.22_ install
```

### 6. Run local preview

```bash
bundle _2.4.22_ exec jekyll serve
```

Open http://127.0.0.1:4000/ in your browser.

---

## VS Code Integration

### Run from Run & Debug (F5)

A launch configuration is already set up in `.vscode/launch.json`:

- Open **Run and Debug** panel
- Select **Jekyll Preview**
- Press **Start** (or `F5`)

This runs `bundle _2.4.22_ exec jekyll serve` automatically.

### Stop the server

- Press `Ctrl + C` in the terminal, or
- Click the red **Stop** button in the Run and Debug panel

### Port conflict

If the server fails because port 4000 is already in use, either stop the old process or run on a different port:

```bash
bundle _2.4.22_ exec jekyll serve --port 4001
```

---

## Project Structure

```
Pages/
├── _config.yml          # Site configuration (title, description, plugins)
├── Gemfile              # Ruby dependencies (Jekyll, plugins)
├── Gemfile.lock         # Locked dependency versions
├── index.md             # Homepage (post listing with search/filter)
├── about.md             # About page
├── favicon.svg          # Site favicon (SVG)
├── _layouts/
│   ├── default.html     # Base HTML layout (header, nav, footer)
│   └── post.html        # Blog post layout
├── _posts/              # Blog posts (Markdown, named YYYY-MM-DD-title.md)
├── assets/
│   ├── css/site.css     # Custom stylesheet
│   ├── js/              # JavaScript files
│   └── images/          # Post images
├── .vscode/
│   └── launch.json      # VS Code launch config for Jekyll preview
├── _site/               # Generated output (do NOT edit directly)
└── .jekyll-cache/       # Build cache (do NOT edit directly)
```

---

## Important Rules

1. **Edit source files only** — `_config.yml`, `index.md`, `about.md`, `_layouts/*`, `_posts/*`, `assets/*`
2. **Never edit `_site/`** — Jekyll regenerates this folder on every build
3. **Restart server after editing `_config.yml`** — config changes are not picked up by live reload
4. **Hard refresh browser** (`Cmd + Shift + R`) if changes don't appear
5. **Post filenames must follow the pattern** `YYYY-MM-DD-title-slug.md`

---

## Adding a New Blog Post

Create a new file in `_posts/` with this format:

```
_posts/YYYY-MM-DD-your-post-title.md
```

Example front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: 2026-03-10
image: /assets/images/your-image.png  # optional
---

Your content here in Markdown.
```

---

## Issues Encountered and Fixes

### 1. `cannot load such file -- csv` / `-- base64`

**Cause:** Ruby 4.x removed these from the standard library.
**Fix:** Use Ruby 3.2 instead of Ruby 4.x.

### 2. `Could not find 'bundler' (2.4.22)`

**Cause:** Terminal was using system Ruby (2.6) instead of Homebrew Ruby.
**Fix:** Ensure PATH has `/opt/homebrew/opt/ruby@3.2/bin` before `/usr/bin`. Run `source ~/.zshrc` and `hash -r`.

### 3. `Gem bundler-4.0.7 cannot be uninstalled because it is a default gem`

**Cause:** Bundler 4 is baked into Ruby 4.x and cannot be removed.
**Fix:** Install Bundler 2.4.22 alongside it and use `bundle _2.4.22_` prefix for all commands.

### 4. `zsh: command not found: run`

**Cause:** Copying instructions that say "run some_command" and pasting the word "run" as part of the command.
**Fix:** Only paste the actual command, not the word "run".

### 5. Sass deprecation warnings (`@import`, `lighten()`, `darken()`)

**Cause:** The minima theme uses older Sass syntax.
**Fix:** These are warnings, not errors. The site builds and runs fine. They will go away when the theme updates.

### 6. `ERROR '/favicon.ico' not found`

**Cause:** Browser requests a favicon but none existed.
**Fix:** Added `favicon.svg` to the project root and linked it in `_layouts/default.html`.

### 7. Changes to `_config.yml` not reflecting in browser

**Cause:** Jekyll does not live-reload config changes.
**Fix:** Stop (`Ctrl + C`) and restart the server, then hard refresh browser.

---

## Useful Commands Reference

| Task | Command |
|------|---------|
| Install dependencies | `bundle _2.4.22_ install` |
| Run local server | `bundle _2.4.22_ exec jekyll serve` |
| Run on different port | `bundle _2.4.22_ exec jekyll serve --port 4001` |
| Check Ruby version | `ruby -v` |
| Check which Ruby | `which ruby` |
| Reload shell config | `source ~/.zshrc && hash -r` |
