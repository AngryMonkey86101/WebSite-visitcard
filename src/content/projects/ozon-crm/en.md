---
title: OZON CRM
summary: A desktop app for Ozon sellers — orders, stock, real profit and 3D-printing costs in one window.
---

## The problem

The Ozon seller dashboard shows revenue but not the key number: how much you actually earned after commissions, logistics, taxes and production costs.

## Features

- Pulls orders and transactions from the Ozon Seller API every 30 minutes and keeps them in a local database.
- Calculates profit per order: Ozon payout − tax − cost of goods; shows an estimate until Ozon posts the transactions.
- Stock on Ozon (FBO) and own (FBS) warehouses: what can be sold, what is in transit and how many days it will last.
- A 3D-printing cost calculator: materials by colour, electricity, printer depreciation and modelling.
- Pricing for off-Ozon orders from a .gcode file, plus a hint on what price to set on Ozon for the target margin.
- A monthly summary of Ozon documents: balance, what the payout consists of, the sales report.

## How it's built

A portable Windows app in Python and PySide6: a single .exe, no installation, all data stored in SQLite next to the app — you can carry the folder on a USB stick.
