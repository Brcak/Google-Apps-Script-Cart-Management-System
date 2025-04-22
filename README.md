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
See example-config.js for all available options.

## Usage
The system works automatically with these behaviors:

## New Carts Sheet:

Data is automatically copied to "Current" sheet

Source rows are cleared after copying

## Current/Completed Sheets:

Cart numbers are auto-capitalized

Dates are formatted consistently

Duplicates are highlighted

## Task Movement:

Rows with checked "Completed" column move to Completed Tab

Unchecked rows in Completed Tab move back to Current

## Troubleshooting
Problem: Script isn't triggering

Solution: Ensure the onEdit trigger is installed

Problem: Dates not formatting correctly

Solution: Check the dateFormat in config.js
