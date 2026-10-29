---
title: openCart
summary: A shared family shopping list right inside Telegram — everyone sees the same items and ticks off what's bought.
---

## The problem

To avoid buying milk twice or forgetting bread, a family needs one shared list that everyone has at hand, without installing yet another app.

## Features

- One list for the whole family: create a list and send an invite to your loved ones.
- Everyone sees the same items and ticks off purchases; changes sync within seconds.
- An invite is just a link to the bot that takes the person straight to the list.
- Light and dark green themes that match Telegram.

## How it's built

A Telegram Mini App in React and TypeScript with a Node.js + SQLite backend. No passwords: sign-in relies on Telegram's `initData` signature, verified on the server with the bot token. Everything runs on a single VPS in Docker, with HTTPS by Caddy.
