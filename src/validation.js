/**
 * Handles data validation and duplicate checking
 * Ensures data integrity across sheets
 */

const CONFIG = require('./config');

/**
 * Checks for duplicate cart numbers in active sheet
 */
function checkForDuplicates() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = getValidationRange(sheet);
  const values = range.getValues();

  const { duplicates, hasDuplicates } = findDuplicates(values);
  
  if (!hasDuplicates) {
    range.setBackground(null);
    return;
  }

  highlightDuplicates(sheet, duplicates);
  showDuplicateAlert(duplicates);
}

/**
 * Gets the validation range based on configuration
 * @param {Sheet} sheet - The sheet to validate
 * @returns {Range} The range to check for duplicates
 */
function getValidationRange(sheet) {
  return sheet.getRange(
    CONFIG.rows.startData,
    CONFIG.columns.cartNumber,
    CONFIG.rows.endData - CONFIG.rows.startData + 1,
    1
  );
}

/**
 * Finds duplicate values in a 2D array
 * @param {Array} values - Array of values to check
 * @returns {Object} Object containing duplicates info
 */
function findDuplicates(values) {
  const countObj = {};
  const duplicates = {};
  let hasDuplicates = false;

  // Reset cell colors before checking
  range.setBackground(null);

  for (let i = 0; i < values.length; i++) {
    const cellValue = values[i][0];
    if (cellValue === '') continue;

    if (countObj[cellValue]) {
      countObj[cellValue].push(i + CONFIG.rows.startData);
      duplicates[cellValue] = countObj[cellValue];
      hasDuplicates = true;
    } else {
      countObj[cellValue] = [i + CONFIG.rows.startData];
    }
  }

  return { duplicates, hasDuplicates };
}

/**
 * Highlights duplicate cells
 * @param {Sheet} sheet - The active sheet
 * @param {Object} duplicates - Object containing duplicate info
 */
function highlightDuplicates(sheet, duplicates) {
  for (const num in duplicates) {
    for (const row of duplicates[num]) {
      sheet.getRange(row, CONFIG.columns.cartNumber)
           .setBackground(CONFIG.formatting.duplicateColor);
    }
  }
}

/**
 * Shows alert about found duplicates
 * @param {Object} duplicates - Object containing duplicate info
 */
function showDuplicateAlert(duplicates) {
  let message = CONFIG.messages.duplicatesFound;
  for (const num in duplicates) {
    message += `Cart Number ${num} found in rows: ${duplicates[num].join(', ')}\n`;
  }
  SpreadsheetApp.getUi().alert(message);
}
