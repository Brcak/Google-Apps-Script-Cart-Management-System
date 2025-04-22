/**
 * Configuration for Cart Management System
 * All settings can be adjusted here without modifying core logic
 */

const CONFIG = {
  // Sheet names configuration
  sheets: {
    newCarts: "New Carts",
    current: "Current",
    completed: "Completed Tab"
  },
  
  // Column configuration (1-based index)
  columns: {
    checkbox: 1,        // Column A
    date: 2,            // Column B
    cartNumber: 3,      // Column C
    completedFlag: 7,   // Column G
    secondCheckbox: 8   // Column H
  },
  
  // Row configuration
  rows: {
    header: 1,          // Header row
    startData: 2,       // First row of data
    endData: 34         // Last row of data
  },
  
  // Formatting configuration
  formatting: {
    duplicateColor: '#FF9999',  // Light red for duplicates
    dateFormat: 'MM/DD/YY',     // Date format to enforce
    dateDelimiter: ' - '        // Separator for date ranges
  },
  
  // Feature toggles
  features: {
    autoCapitalize: true,
    autoFormatDates: true,
    checkDuplicates: true,
    moveTasksAutomatically: true,
    clearSourceAfterCopy: true
  },
  
  // Validation messages
  messages: {
    duplicatesFound: 'Duplicates found:\n',
    noEventObject: 'Error: This function must be triggered by an edit event.',
    sheetsNotFound: 'Error: One or more sheets not found. Check the sheet names.'
  }
};

// Expose configuration if using modules
if (typeof module !== 'undefined') {
  module.exports = CONFIG;
}
