<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Budget Tracker</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.1/xlsx.full.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.3/jspdf.umd.min.js"></script>
</head>
<body class="bg-gray-800 text-white">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Budget Tracker</h1>
    <form id="expense-form" class="mb-8">
      <div class="grid grid-cols-4 gap-4">
        <input type="text" id="title" placeholder="Title" required class="col-span-1 p-2 bg-gray-700 rounded">
        <input type="number" id="amount" placeholder="Amount" required class="col-span-1 p-2 bg-gray-700 rounded">
        <input type="text" id="category" placeholder="Category" required class="col-span-1 p-2 bg-gray-700 rounded">
        <input type="date" id="date" required class="col-span-1 p-2 bg-gray-700 rounded">
      </div>
      <button type="submit" class="bg-green-500 hover:bg-green-600 px-4 py-2 mt-4 rounded">Add Expense</button>
    </form>
    <table id="expense-table" class="w-full mb-8">
      <thead>
        <tr>
          <th class="border-b-2 border-gray-600 p-2">Title</th>
          <th class="border-b-2 border-gray-600 p-2">Amount</th>
          <th class="border-b-2 border-gray-600 p-2">Category</th>
          <th class="border-b-2 border-gray-600 p-2">Date</th>
          <th class="border-b-2 border-gray-600 p-2">Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <button id="download-data-excel" class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Download Data (Excel)</button>
    <button id="download-data-pdf" class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Download Data (PDF)</button>
  </div>
  <script src="app.js"></script>
</body>
</html>
