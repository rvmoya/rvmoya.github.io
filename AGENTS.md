# AGENTS — AI agent instructions for this repository

Purpose: give succinct, actionable guidance for AI coding agents working on this Academic Pages Jekyll site.

Quick commands

```
# Install Ruby gems (recommended local install)
bundle config set --local path 'vendor/bundle'
bundle install

# Serve locally (hosted on port 4000)
bundle exec jekyll serve -l -H localhost

# Or use Docker (recommended for consistency)
docker compose up

# Build JavaScript assets
npm install
npm run build:js
```

Important files (links)

- [README.md](README.md) — project overview and local run instructions
- [CONTRIBUTING.md](CONTRIBUTING.md) — contribution guidance
- [Gemfile](Gemfile) — Ruby dependencies (Jekyll, GitHub Pages)
- [package.json](package.json) — npm build scripts for assets
- [docker-compose.yaml](docker-compose.yaml) — docker setup used by `docker compose up`
- [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json) — VS Code devcontainer config
- [_config.yml](_config.yml) and [_config_docker.yml](_config_docker.yml) — site configuration (restart server after changes)

Where content lives (edit these for site content)

- `_posts/` — dated blog posts
- `_pages/` — standalone content pages
- `_publications/`, `_talks/`, `_portfolio/` — domain-specific content collections
- `_includes/`, `_layouts/` — templates and partials
- `assets/` — CSS/JS/images; JS build via `npm run build:js`
- `_data/` — YAML data used in templates
- `_site/` — generated output; do NOT edit directly

Conventions & boundaries

- Site is a Jekyll/GitHub Pages site. Changes to `_config.yml` or layouts require restarting the dev server.
- Keep changes minimal and focused; prefer editing content files over modifying core theme files unless necessary.
- Avoid editing generated files under `_site/` or vendor/ directories.
- There are no automated tests; validate changes by running the local server and visually checking `http://localhost:4000`.

Agent behaviour checklist

1. Read `README.md` and `CONTRIBUTING.md` before making environment or workflow changes.
2. Reproduce the site locally (prefer Docker or DevContainer) before making large template changes.
3. Link to existing documentation rather than copying it. Use the repository links above.
4. When modifying site structure or publishing-related config, mention potential GitHub Pages implications in the PR description.

If you need further customization (agent hooks, instruction files, or skills), propose the specific scope (frontend, assets, content, CI) and I will create focused scaffolding.
