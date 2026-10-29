---
title: Compass
summary: An offline navigator for your phone — an arrow points to the chosen place and shows the distance, even without internet.
---

## The problem

Finding your way to a spot when there is no signal and maps won't load: in a forest, in the mountains or in an unfamiliar city.

## Features

- An on-screen arrow points to the selected place and shows the distance, using GPS and the phone's orientation sensors.
- Add places by coordinates in any format or by a link from Google Maps or Yandex Maps.
- Import and export places in KML, KMZ, GPX, GeoJSON and CSV — bring your saved places from Google My Maps or Yandex Map Constructor.
- Groups of up to 15 people: members see each other and can set a friend as the compass target. Group names, nicknames and coordinates are encrypted on the phone.
- A compass-only mode and full offline work once installed to the home screen.

## How it's built

A React + Vite PWA that installs on iPhone and Android like a regular app and works offline. Groups run on a small Node.js server; data is encrypted with AES-GCM on the device, and the key travels only inside the invite link, never reaching the server.
