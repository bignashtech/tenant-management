// Get all the input fields
const nameInput = document.getElementById("tenant-name");
const phoneInput = document.getElementById("phone-number");
const apartmentInput = document.getElementById("apartment");
const amountInput = document.getElementById("amount-paid");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("tenant-table");
const paymentStatus = document.getElementById("payment-status");
const updateBtn = document.getElementById("update-status");

let selectedRow = null;

/// Get modal elements
const modal = document.getElementById("error-modal");
const closeModalBtn = document.getElementById("close-modal");
const selectRowModal = document.getElementById("select-row-modal");
const closeSelectModalBtn = document.getElementById("close-select-modal");

// Function to show modal
function showModal() {
  modal.style.display = "block";
}

// Function to hide modal
function hideModal() {
  modal.style.display = "none";
}

// Function to show select row modal
function showSelectRowModal() {
  selectRowModal.style.display = "block";
}

// Function to hide select row modal
function hideSelectRowModal() {
  selectRowModal.style.display = "none";
}

// Close modal when button is clicked
closeModalBtn.addEventListener("click", hideModal);
closeSelectModalBtn.addEventListener("click", hideSelectRowModal);

// Close modal when clicking outside the modal content
window.addEventListener("click", function (e) {
  if (e.target === modal) {
    hideModal();
  }

  if (e.target === selectRowModal) {
    hideSelectRowModal();
  }
});

// Add new tenant when button is clicked
addBtn.addEventListener("click", () => {
  // Get values from inputs
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const apartment = apartmentInput.value.trim();
  const amount = amountInput.value.trim();

  // Check if all fields are filled
  if (name === "" || phone === "" || apartment === "" || amount === "") {
    showModal();
    return;
  }

  // Create a new row
  const newRow = document.createElement("tr");
  newRow.className = "select-row";
  newRow.innerHTML = `
          <td>${name}</td>
          <td>${phone}</td>
          <td>${apartment}</td>
          <td><span1>GH₵</span1> ${amount}</td>
          <td><span class="pm incomplete">Incomplete</span></td>
        `;

  // Add the new row to the table
  tableBody.appendChild(newRow);

  // Clear all input fields
  nameInput.value = "";
  phoneInput.value = "";
  apartmentInput.value = "";
  amountInput.value = "";

  // Add click event to the new row
  addRowClickEvent(newRow);
});

// Function to add click event to rows
function addRowClickEvent(row) {
  row.addEventListener("click", function () {
    // Remove selected class from previous row
    if (selectedRow) {
      selectedRow.classList.remove("selected");
    }
    // Add selected class to clicked row
    this.classList.add("selected");
    selectedRow = this;
  });
}

document.addEventListener("click", (event) => {
  // If this row is already selected → deselect it
  if (!selectedRow && event.target.closest("selected-row")) {
    event.classList.remove("selected-row");
    selectedRow = null;
    return;
  }
});

// Deselect when clicking anywhere outside a row
document.addEventListener("click", (event) => {
  // Check if the click target is NOT inside the wrapper
  if (selectedRow && !event.target.closest(".wrapper")) {
    selectedRow.classList.remove("selected");
    selectedRow = null;
  }
});

// Add click events to existing rows
document.querySelectorAll(".select-row").forEach((row) => {
  addRowClickEvent(row);
});

// Update payment status
updateBtn.addEventListener("click", function () {
  if (!selectedRow) {
    showSelectRowModal();
    return;
  }

  const statusSpan = selectedRow.querySelector(".pm");
  const newStatus = paymentStatus.value;

  statusSpan.textContent = newStatus;

  // Update the styling
  if (newStatus === "Complete") {
    statusSpan.className = "pm complete";
  } else {
    statusSpan.className = "pm incomplete";
  }
});
