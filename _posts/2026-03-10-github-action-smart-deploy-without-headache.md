---
layout: post
title: "A Simple GitHub Action to Deploy .NET App to Linux"
date: 2026-03-10
image: /assets/images/2026-03-10-github-action-smart-deploy-without-headache/cover.svg
---

Deploying to a server can feel hard at first.
This GitHub Action makes it simple.
It does the same safe steps every time.
You push code.
The workflow handles the deploy.

## Where This Workflow Lives

The file is here:
`.github/workflows/deploy.yml`

## What It Does

When the workflow runs, it does these jobs:

- builds the .NET app
- publishes release files
- connects to Linux server using SSH
- creates a backup of old files
- uploads new files with `rsync`
- restarts the app service

This saves time.
It also reduces manual mistakes.

## When It Runs

This workflow can run in two ways:

- on `push` (except changes to `deploy.yml`)
- on manual run using `workflow_dispatch`

So you can use auto deploy.
You can also click Run when you want control.

It also uses `concurrency`.
Only one deploy runs at a time.
If a new deploy starts, the old one is cancelled.

## Key YAML Snippets

These are the most important parts.
You can understand the flow without reading the full file first.

### Trigger + Concurrency

```yaml
on:
  push:
    paths-ignore:
      - '.github/workflows/deploy.yml'
  workflow_dispatch:

concurrency:
  group: deploy-githubscrapper
  cancel-in-progress: true
```

### Build and Publish

```yaml
- name: Setup .NET
  uses: actions/setup-dotnet@v4
  with:
    dotnet-version: 8.0.x

- name: Restore
  run: dotnet restore GithubScrapper/GithubScrapper/GithubScrapper.csproj

- name: Publish
  run: dotnet publish GithubScrapper/GithubScrapper/GithubScrapper.csproj -c Release -o ./publish
```

### Backup on Server

```yaml
- name: Backup existing files on server
  run: |
    TARGET_DIR="/var/www/GithubScrapper"
    BACKUP_DIR="$TARGET_DIR/bak_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"

    if [ -d "$TARGET_DIR/AppFiles" ]; then
      cp -r "$TARGET_DIR/AppFiles" "$BACKUP_DIR/"
    fi

    if [ -f "$TARGET_DIR/appsettings.json" ]; then
      cp "$TARGET_DIR/appsettings.json" "$BACKUP_DIR/"
    fi
```

### Upload and Restart

```yaml
- name: Sync files to server
  run: |
    rsync -az --exclude "appsettings.json" ./publish/ user@host:/var/www/GithubScrapper/

- name: Restart service
  run: |
    sudo systemctl restart GithubScrapper
    sudo systemctl status GithubScrapper
```

## Build Step

Before deploy, it prepares clean files.

It does this:

- runs `actions/checkout`
- installs .NET 8 with `actions/setup-dotnet`
- restores NuGet packages
- publishes release output to `./publish`

Now files are ready for server upload.

## SSH Setup

It uses:

- `webfactory/ssh-agent`
- `SSH_PRIVATE_KEY` from GitHub Secrets
- `ssh-keyscan` to trust server host key

This keeps login secure.
No password typing in CI/CD.

## Safety Before Replace

Before upload, it does safety checks on server:

- makes sure `/var/www/GithubScrapper` exists
- creates backup folder with timestamp like `bak_20260310_120001`
- copies important old files:
  - `AppFiles`
  - `appsettings.json`
- keeps only last 5 backups

If a deploy fails, backup is there.

## Upload Step

It syncs files with `rsync`.

- source: `./publish/`
- target: server app folder
- excludes: `appsettings.json`

Why exclude `appsettings.json`?
Server config usually has real secrets and env values.
It should not be overwritten.

## Final Step

After upload, it does three final tasks:

- sets permissions on `AppFiles`
- restarts service with `systemctl restart GithubScrapper`
- checks service status

So new code goes live fast.

## Why This Is Useful

This workflow gives:

- faster deploy
- fewer manual commands
- safer updates with backup
- protected server config

It is simple.
It is practical.
It removes deploy headache.

## Final Note

A good deploy workflow should be clear and safe.
This one follows both.
You push code.
The Action does the work in order.

## Full `deploy.yml` Example

If you want to try it quickly, copy the full example below.

```yaml
# Deploy to Linux Server
#
# This workflow builds and deploys the GithubScrapper app to a remote Linux server via SSH and rsync.
# Each step is explained below.

name: Deploy to Linux Server

on:
  push:
    paths-ignore:
      - '.github/workflows/deploy.yml'
  workflow_dispatch:

concurrency:
  group: deploy-githubscrapper
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: 8.0.x

      - name: Restore
        run: dotnet restore GithubScrapper/GithubScrapper/GithubScrapper.csproj

      - name: Publish
        run: dotnet publish GithubScrapper/GithubScrapper/GithubScrapper.csproj -c Release -o ./publish

      - name: Start SSH Agent
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Add host key
        env:
          SSH_PORT: ${{ secrets.SSH_PORT }}
        run: |
          PORT="${SSH_PORT:-22}"
          ssh-keyscan -p "$PORT" -H "${{ secrets.SSH_HOST }}" >> ~/.ssh/known_hosts

      - name: Ensure target directory exists
        env:
          SSH_PORT: ${{ secrets.SSH_PORT }}
        run: |
          PORT="${SSH_PORT:-22}"
          ssh -p "$PORT" "${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}" "mkdir -p /var/www/GithubScrapper"

      - name: Backup existing files on server
        env:
          SSH_PORT: ${{ secrets.SSH_PORT }}
        run: |
          PORT="${SSH_PORT:-22}"
          ssh -p "$PORT" "${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}" '
            set -e
            TARGET_DIR="/var/www/GithubScrapper"
            BACKUP_DIR="$TARGET_DIR/bak_$(date +%Y%m%d_%H%M%S)"
            mkdir -p "$BACKUP_DIR"

            if [ -d "$TARGET_DIR/AppFiles" ]; then
              cp -r "$TARGET_DIR/AppFiles" "$BACKUP_DIR/"
            fi

            if [ -f "$TARGET_DIR/appsettings.json" ]; then
              cp "$TARGET_DIR/appsettings.json" "$BACKUP_DIR/"
            fi

            BACKUPS=( $(ls -dt $TARGET_DIR/bak_* 2>/dev/null) )
            if [ ${#BACKUPS[@]} -gt 5 ]; then
              for OLD in "${BACKUPS[@]:5}"; do
                rm -rf "$OLD"
              done
            fi

            if [ ! -d "$TARGET_DIR/AppFiles" ]; then
              mkdir -p "$TARGET_DIR/AppFiles"
            fi

            if [ ! -d "$TARGET_DIR/AppFiles/downloads" ]; then
              mkdir -p "$TARGET_DIR/AppFiles/downloads"
            fi

            sudo chown -R www-data:www-data /var/www/GithubScrapper/AppFiles
          '

      - name: Sync files to server
        env:
          SSH_PORT: ${{ secrets.SSH_PORT }}
        run: |
          PORT="${SSH_PORT:-22}"
          rsync -az --exclude "appsettings.json" -e "ssh -p $PORT" ./publish/ "${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:/var/www/GithubScrapper/"

      - name: Set permissions on AppFiles directory
        env:
          SSH_PORT: ${{ secrets.SSH_PORT }}
        run: |
          PORT="${SSH_PORT:-22}"
          ssh -p "$PORT" "${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}" "chmod -R 755 /var/www/GithubScrapper/AppFiles"
          echo "Permissions set on AppFiles directory."

      - name: Restart GithubScrapper service on server
        env:
          SSH_PORT: ${{ secrets.SSH_PORT }}
        run: |
          PORT="${SSH_PORT:-22}"
          ssh -p "$PORT" "${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}" "sudo systemctl restart GithubScrapper && sudo systemctl status GithubScrapper"
```
