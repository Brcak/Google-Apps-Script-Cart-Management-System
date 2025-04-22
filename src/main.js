/**
 * Main trigger functions for the Cart Management System
 * Handles the onEdit trigger and routes to appropriate handlers
 */

// Import configuration
const CONFIG = require('./config');

/**
 * onEdit trigger function - main entry point
 * @param {Object} e - The event object from Google Sheets
 */
function onEdit(e) {
  if (!validateEvent(e)) return;
  
  const { sheet, range, column, row, value } = getEventDetails(e);
  const sheetName = sheet.getName();

  handleNewCartsSheet(sheetName, sheet);
  handleTargetSheets(sheetName, range, column, row, value);
  handleTaskMovement(sheetName);
}

/**
 * Validate the event object
 * @param {Object} e - Event object
 * @returns {boolean} True if valid
 */
function validateEvent(e) {
  if (!e || !e.source) {
    Logger.log(CONFIG.messages.noEventObject);
    return false;
  }
  return true;
}

/**
 * Extract details from event object
 * @param {Object} e - Event object
 * @returns {Object} Extracted details
 */
function getEventDetails(e) {
  return {
    sheet: e.source.getActiveSheet(),
    range: e.range,
    column: e.range.getColumn(),
    row: e.range.getRow(),
    value: e.range.getValue()
  };
}

/**
 * Handle New Carts sheet specific logic
 * @param {string} sheetName - Current sheet name
 * @param {Sheet} sheet - Sheet object
 */
function handleNewCartsSheet(sheetName, sheet) {
  if (sheetName === CONFIG.sheets.newCarts) {
    copyDataToCurrent(sheet);
    if (CONFIG.features.moveTasksAutomatically) moveTasks();
  }
}

/**
 * Handle logic for target sheets (Current, Completed Tab, New Carts)
 * @param {string} sheetName - Current sheet name
 * @param {Range} range - Edited range
 * @param {number} column - Edited column
 * @param {number} row - Edited row
 * @param {*} value - New value
 */
function handleTargetSheets(sheetName, range, column, row, value) {
  const targetSheets = [CONFIG.sheets.current, CONFIG.sheets.completed, CONFIG.sheets.newCarts];
  
  if (targetSheets.includes(sheetName)) {
    handleCartNumberColumn(range, column, row, value);
    handleDateColumn(range, column, row, value);
  }
}

/**
 * Handle task movement between sheets
 * @param {string} sheetName - Current sheet name
 */
function handleTaskMovement(sheetName) {
  if (CONFIG.features.moveTasksAutomatically && 
      [CONFIG.sheets.current, CONFIG.sheets.completed].includes(sheetName)) {
    moveTasks();
  }
}
