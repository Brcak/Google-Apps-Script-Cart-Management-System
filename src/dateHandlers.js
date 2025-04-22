/**
 * Handles all date formatting and validation
 * Standardizes date formats across sheets
 */

const CONFIG = require('./config');

/**
 * Formats date cells according to configuration
 * @param {Range} cell - The cell to format
 */
function formatDateCell(cell) {
  const sheet = cell.getSheet();
  const sheetName = sheet.getName();

  if (![CONFIG.sheets.current, CONFIG.sheets.completed, CONFIG.sheets.newCarts].includes(sheetName)) {
    return;
  }

  const value = cell.getValue();
  if (typeof value !== "string") return;

  const formattedValue = formatDateString(value);
  if (formattedValue !== value) {
    cell.setValue(formattedValue);
  }
}

/**
 * Formats a date string according to configuration
 * @param {string} dateString - The raw date string
 * @returns {string} Formatted date string
 */
function formatDateString(dateString) {
  const dates = dateString.match(/\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}/g);
  if (!dates) return dateString;

  return dates.map(date => {
    const parts = date.split(/[\/.-]/);
    return [
      parts[0].padStart(2, '0'),  // Month
      parts[1].padStart(2, '0'),  // Day
      parts[2].length === 2 ? parts[2] : parts[2].slice(-2)  // Year
    ].join('/');
  }).join(CONFIG.formatting.dateDelimiter);
}

/**
 * Handles date column edits
 * @param {Range} range - Edited range
 * @param {number} column - Edited column
 * @param {number} row - Edited row
 */
function handleDateColumn(range, column, row) {
  if (shouldFormatDate(column, row)) {
    formatDateCell(range);
  }
}

/**
 * Determines if a cell should be formatted as date
 * @param {number} column - Column index
 * @param {number} row - Row index
 * @returns {boolean} True if should be formatted
 */
function shouldFormatDate(column, row) {
  return CONFIG.features.autoFormatDates && 
         column === CONFIG.columns.date && 
         row >= CONFIG.rows.startData && 
         row <= CONFIG.rows.endData;
}
