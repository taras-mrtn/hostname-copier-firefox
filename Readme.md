# Hostname Copier

A lightweight browser extension that copies the current webpage's hostname to your clipboard with a single click.

## Features

- 🚀 One-click hostname copying
- ✨ Clean and simple interface
- 🔒 Works with HTTP and HTTPS URLs
- ⚡ Lightweight and fast
- 🛡️ No data collection or tracking

## Installation

1. Download the extension from [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/hostname-copier/)
2. Click the extension icon in your browser toolbar to use

## Usage

1. Navigate to any webpage
2. Click the Hostname Copier icon in your browser toolbar
3. The hostname will be automatically copied to your clipboard
4. Look for the success message confirmation

## Examples

- On `https://www.example.com/page` → Copies `www.example.com`
- On `https://subdomain.website.org/path` → Copies `subdomain.website.org`

## Technical Details

The extension requires minimal permissions:
- `activeTab`: To access the current tab's URL
- `clipboardWrite`: To copy the hostname to clipboard
- `tabs`: To read the current tab's URL

## Development

To run this extension locally in Firefox:

1. Clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on"
5. Browse to your cloned repository and select the `manifest.json` file
6. The extension will be loaded and appear in your toolbar
7. Note: You'll need to reload the extension each time you restart Firefox
