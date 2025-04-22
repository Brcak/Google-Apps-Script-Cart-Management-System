/**
 * EXAMPLE CONFIGURATION FILE
 * Copy this to config.js and adjust values as needed
 * All values shown are defaults
 */

const EXAMPLE_CONFIG = {
  // Sheet names configuration
  sheets: {
    newCarts: "New Carts",        // Sheet for new cart entries
    current: "Current",           // Active carts sheet
    completed: "Completed Tab"    // Completed carts archive
  },
  
  // Column configuration (1-based index)
  columns: {
    checkbox: 1,        // Column A - First checkbox column
    date: 2,            // Column B - Date column
    cartNumber: 3,      // Column C - Cart number identifier
    completedFlag: 7,    // Column G - Completion checkbox
    secondCheckbox: 8   // Column H - Second checkbox column
  },
  
  // Row configuration
  rows: {
    header: 1,          // Header row (usually row 1)
    startData: 2,       // First row containing data
    endData: 34         // Last row containing data
  },
  
  // Formatting configuration
  formatting: {
    duplicateColor: '#FF9999',  // Color for highlighting duplicates
    dateFormat: 'MM/DD/YY',     // Format to enforce for dates
    dateDelimiter: ' - '        // Separator between date ranges
  },
  
  // Feature toggles (true/false)
  features: {
    autoCapitalize: true,       // Auto-uppercase cart numbers
    autoFormatDates: true,      // Auto-format date cells
    checkDuplicates: true,      // Check for duplicate cart numbers
    moveTasksAutomatically: true,// Auto-move tasks between sheets
    clearSourceAfterCopy: true  // Clear New Carts after copying
  },
  
  // System messages
  messages: {
    duplicatesFound: 'The following duplicate cart numbers were found:\n',
    noEventObject: 'Error: This function must be triggered by an edit event.',
    sheetsNotFound: 'Error: Required sheets not found. Please check sheet names.'
  }
};

// This file is for example purposes only
console.log('Copy this configuration to config.js and modify as needed');
