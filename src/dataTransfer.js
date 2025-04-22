/**
 * Handles all data transfer operations between sheets
 * Includes copying from New Carts to Current, and moving between Current/Completed
 */

const CONFIG = require('./config');

/**
 * Copies data from New Carts sheet to Current sheet
 * @param {Sheet} sourceSheet - The New Carts sheet
 */
function copyDataToCurrent(sourceSheet) {
  const targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.sheets.current);
  
  // Validate sheets exist
  if (!sourceSheet || !targetSheet) {
    Logger.log(CONFIG.messages.sheetsNotFound);
    return;
  }

  // Get source data (excluding header)
  const dataRange = sourceSheet.getRange(
    CONFIG.rows.startData, 
    1, 
    sourceSheet.getLastRow() - 1, 
    sourceSheet.getLastColumn()
  );
  const data = dataRange.getValues();

  // Process and transfer data
  transferDataToSheet(data, targetSheet);

  // Clear source if configured
  if (CONFIG.features.clearSourceAfterCopy && sourceSheet.getLastRow() > 1) {
    dataRange.clearContent();
  }
}

/**
 * Transforms and transfers data to target sheet
 * @param {Array} data - Source data array
 * @param {Sheet} targetSheet - Destination sheet
 */
function transferDataToSheet(data, targetSheet) {
  for (let i = 0; i < data.length; i++) {
    const rowData = data[i];
    
    // Set checkbox values
    rowData[CONFIG.columns.checkbox - 1] = false;
    rowData[CONFIG.columns.secondCheckbox - 1] = false;

    targetSheet.appendRow(rowData);
  }
}

/**
 * Moves tasks between Current and Completed sheets based on completion status
 */
function moveTasks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mainSheet = ss.getSheetByName(CONFIG.sheets.current);
  const completedSheet = ss.getSheetByName(CONFIG.sheets.completed);

  // Validate sheets
  if (!mainSheet || !completedSheet) {
    Logger.log(CONFIG.messages.sheetsNotFound);
    return;
  }

  // Two-way transfer
  moveCompletedTasks(mainSheet, completedSheet);
  moveUncheckedTasks(completedSheet, mainSheet);
}

/**
 * Moves completed tasks from Current to Completed
 * @param {Sheet} sourceSheet - Current sheet
 * @param {Sheet} targetSheet - Completed sheet
 */
function moveCompletedTasks(sourceSheet, targetSheet) {
  const data = sourceSheet.getDataRange().getValues();
  
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][CONFIG.columns.completedFlag - 1] === true) {
      targetSheet.appendRow(data[i]);
      sourceSheet.deleteRow(i + 1);
    }
  }
}

/**
 * Moves unchecked tasks from Completed back to Current
 * @param {Sheet} sourceSheet - Completed sheet
 * @param {Sheet} targetSheet - Current sheet
 */
function moveUncheckedTasks(sourceSheet, targetSheet) {
  const data = sourceSheet.getDataRange().getValues();
  
  // Start from last row and skip header
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][CONFIG.columns.completedFlag - 1] === false || 
        data[i][CONFIG.columns.completedFlag - 1] === "") {
      targetSheet.appendRow(data[i]);
      sourceSheet.deleteRow(i + 1);
    }
  }
}
