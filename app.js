document.getElementById('expense-form').addEventListener('submit', addExpense);
document.getElementById('download-data-excel').addEventListener('click', downloadDataExcel);
document.getElementById('download-data-pdf').addEventListener('click', downloadDataPDF);

function addExpense(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;

  const expense = { title, amount, category, date };

  const row = document.createElement('tr');
  row.innerHTML = `
    <td class="border p-2">${expense.title}</td>
    <td class="border p-2">${expense.amount}</td>
    <td class="border p-2">${expense.category}</td>
    <td class="border p-2">${expense.date}</td>
    <td class="border p-2">
      <button class="edit bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded">Edit</button>
      <button class="delete bg-red-500 hover:bg-red-600 px-2 py-1 rounded">Delete</button>
    </td>
  `;

  row.querySelector('.edit').addEventListener('click', () => editExpense(row, expense));
  row.querySelector('.delete').addEventListener('click', () => deleteExpense(row));

  document.querySelector('#expense-table tbody').appendChild(row);
}

function editExpense(row, expense) {
  document.getElementById('title').value = expense.title;
  document.getElementById('amount').value = expense.amount;
  document.getElementById('category').value = expense.category;
  document.getElementById('date').value = expense.date;

  document.getElementById('expense-form').removeEventListener('submit', addExpense);
  document.getElementById('expense-form').addEventListener('submit', updateExpense);

  function updateExpense(e) {
    e.preventDefault();

    expense.title = document.getElementById('title').value;
    expense.amount = document.getElementById('amount').value;
    expense.category = document.getElementById('category').value;
    expense.date = document.getElementById('date').value;

    row.innerHTML = `
      <td class="border p-2">${expense.title}</td>
      <td class="border p-2">${expense.amount}</td>
      <td class="border p-2">${expense.category}</td>
      <td class="border p-2">${expense.date}</td>
      <td class="border p-2">
        <button class="edit bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded">Edit</button>
        <button class="delete bg-red-500 hover:bg-red-600 px-2 py-1 rounded">Delete</button>
      </td>
    `;

    row.querySelector('.edit').addEventListener('click', () => editExpense(row, expense));
    row.querySelector('.delete').addEventListener('click', () => deleteExpense(row));

    document.getElementById('expense-form').removeEventListener('submit', updateExpense);
    document.getElementById('expense-form').addEventListener('submit', addExpense);
  }
}

function deleteExpense(row) {
  if (confirm('Are you sure you want to delete this expense?')) {
    row.remove();
  }
}

function downloadDataExcel() {
  const headers = ['Title', 'Amount', 'Category', 'Date'];
  const rows = Array.from(document.querySelectorAll('#expense-table tbody tr')).map(row => {
    return Array.from(row.querySelectorAll('td:not(:last-child)')).map(cell => cell.textContent);
  });

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  saveAsExcelFile(excelBuffer, 'expenses.xlsx');
}

function saveAsExcelFile(buffer, fileName) {
  const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(data, fileName);
  } else {
    const link = document.createElement('a');
    const url = URL.createObjectURL(data);

    link.href = url;
    link.download = fileName;
    link.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  }
}

function downloadDataPDF() {
  const doc = new jsPDF();
  const headers = ['Title', 'Amount', 'Category', 'Date'];
  const rows = Array.from(document.querySelectorAll('#expense-table tbody tr')).map(row => {
    return Array.from(row.querySelectorAll('td:not(:last-child)')).map(cell => cell.textContent);
  });

  doc.autoTable({
    head: [headers],
    body: rows,
    theme: 'grid',
    styles: { font: 'Helvetica', fontSize: 10, textColor: [255, 255, 255] },
    headStyles: { fillColor: [0, 0, 0] },
    bodyStyles: { fillColor: [60, 60, 60] },
    alternateRowStyles: { fillColor: [80, 80, 80] },
  });

  doc.save('budget-data.pdf');
}

document.getElementById('download-data').addEventListener('click', downloadDataPDF);
