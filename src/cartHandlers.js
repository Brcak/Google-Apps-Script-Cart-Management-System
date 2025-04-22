/**
 * Handles all cart number related functionality
 * Includes capitalization and duplicate checking
 */

const CONFIG = require('./config');

/**
 * Handle cart number column edits
 * @param {Range} range - Edited range
 * @param {number} column - Edited column
 * @param {number} row - Edited row
 * @param {*} value - New value
 */
function handleCartNumberColumn(range, column, row, value) {
  // Handle paste events in cart number column
  if (isCartNumberPaste(range, column)) {
    handleCartNumberPaste(range);
  }

  // Auto-capitalize single-cell edits
  if (shouldCapitalize(column, row, value)) {
    range.setValue(value.toUpperCase());
  }

  // Check for duplicates
  if (shouldCheckDuplicates(column)) {
    checkForDuplicates();
  }
}

/**
 * Check if this is a paste in the cart number column
 */
function isCartNumberPaste(range, column) {
  return column === CONFIG.columns.cartNumber || 
        (range.getNumColumns() > 1 && 
         range.getColumn() <= CONFIG.columns.cartNumber && 
         range.getLastColumn() >= CONFIG.columns.cartNumber);
}

/**
 * Check if we should capitalize this cell
 */
function shouldCapitalize(column, row, value) {
  return CONFIG.features.autoCapitalize && 
         column === CONFIG.columns.cartNumber && 
         row >= CONFIG.rows.startData && 
         row <= CONFIG.rows.endData && 
         typeof value === "string" && 
         value !== value.toUpperCase();
}

/**
 * Check if we should run duplicate check
 */
function shouldCheckDuplicates(column) {
  return CONFIG.features.checkDuplicates && column === CONFIG.columns.cartNumber;
}

/**
 * Handle paste events in cart number column
 * @param {Range} range - Pasted range
 */
function handleCartNumberPaste(range) {
  const sheet = range.getSheet();
  const sheetName = sheet.getName();
  
  if (![CONFIG.sheets.current, CONFIG.sheets.completed, CONFIG.sheets.newCarts].includes(sheetName)) return;

  const startRow = Math.max(range.getRow(), CONFIG.rows.startData);
  const endRow = Math.min(range.getLastRow(), CONFIG.rows.endData);
  const cartNumberRange = sheet.getRange(startRow, CONFIG.columns.cartNumber, endRow - startRow + 1, 1);
  const cartNumbers = cartNumberRange.getValues();
  
  const { needsUpdate, newValues } = processCartNumbers(cartNumbers);
  
  if (needsUpdate) cartNumberRange.setValues(newValues);
  if (CONFIG.features.checkDuplicates) checkForDuplicates();
}

/**
 * Process cart numbers from paste event
 */
function processCartNumbers(cartNumbers) {
  let needsUpdate = false;
  const newValues = cartNumbers.map(row => {
    if (typeof row[0] === 'string') {
      const upperValue = row[0].toUpperCase().trim();
      if (upperValue !== row[0]) {
        needsUpdate = true;
        return [upperValue];
      }
    }
    return row;
  });
  
  return { needsUpdate, newValues };
}
