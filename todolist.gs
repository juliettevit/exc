// Function to add a task to the sheet
function addTask(task, dueDate) {
  const sheet = getOrCreateTaskSheet();

  if (!task || !dueDate) {
    Logger.log('Error: Task and Due Date are required.');
    return;
  }

  sheet.appendRow([task, 'Pending', dueDate]);
  Logger.log(`Task '${task}' added with due date ${dueDate}.`);
}

// Function to mark a task as complete
function markComplete(row) {
  const sheet = getOrCreateTaskSheet();

  if (row <= 1 || row > sheet.getLastRow()) {
    Logger.log('Error: Invalid row number.');
    return;
  }

  sheet.getRange(row, 2).setValue('Completed');
  Logger.log(`Task in row ${row} marked as Completed.`);
}

// Function to view all tasks
function viewTasks() {
  const sheet = getOrCreateTaskSheet();
  const tasks = sheet.getDataRange().getValues();

  if (tasks.length <= 1) {
    Logger.log('No tasks found.');
    return;
  }

  for (let i = 1; i < tasks.length; i++) {
    Logger.log(`Task: ${tasks[i][0]}, Status: ${tasks[i][1]}, Due Date: ${tasks[i][2]}`);
  }
}

// Function to delete a task by row number
function deleteTask(row) {
  const sheet = getOrCreateTaskSheet();

  if (row <= 1 || row > sheet.getLastRow()) {
    Logger.log('Error: Invalid row number.');
    return;
  }

  sheet.deleteRow(row);
  Logger.log(`Task in row ${row} deleted.`);
}

// Function to clear all tasks
function clearAllTasks() {
  const sheet = getOrCreateTaskSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
    Logger.log('All tasks cleared.');
  } else {
    Logger.log('No tasks to clear.');
  }
}

// Utility function to get or create the task sheet
function getOrCreateTaskSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = 'Tasks';
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(['Task', 'Status', 'Due Date']); // Add header row
    Logger.log(`Sheet '${sheetName}' created.`);
  }

  return sheet;
}

// Example Usage
function exampleUsage() {
  addTask('Buy groceries', '2024-12-25');
  viewTasks();
  clearAllTasks();
}
