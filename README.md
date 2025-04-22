# Cart Management System for Google Sheets

![System Overview](screenshots/overview.png) *(optional screenshot)*

## Overview

This Google Apps Script provides automated management for cart tracking across multiple sheets:

- **New Carts**: Input sheet for new cart entries
- **Current**: Active carts being processed
- **Completed Tab**: Archive for completed carts

## Features

- ✅ Automatic data transfer between sheets
- 📅 Date formatting standardization
- 🔠 Cart number auto-capitalization
- 🔍 Duplicate cart number detection
- 🔄 Two-way task movement between Current and Completed

## Installation

1. Open your Google Sheet
2. Click `Extensions > Apps Script`
3. Replace the default code with the contents of `src/main.js`
4. Add additional files from the `src` folder
5. Click `Save` and name your project
6. Configure settings in `config.js`

## Configuration

All settings are in `config.js`:

```javascript
// Example configuration
const CONFIG = {
  sheets: {
    newCarts: "New Carts",
    current: "Current",
    completed: "Completed Tab"
  },
  // ... other settings
};
