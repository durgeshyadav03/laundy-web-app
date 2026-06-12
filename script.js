const buttons = document.querySelectorAll(".item-btn");
const tableBody = document.getElementById("table-body");
const totalPriceDisplay = document.getElementById("total-price");

let totalPrice = 0;

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const parentContainer = this.closest(".service-items");
    const serviceName = parentContainer
      .querySelector(".item-name")
      .textContent.trim();
    const servicePrice = parentContainer
      .querySelector(".item-price")
      .textContent.trim();

    const numericPrice = parseInt(servicePrice.replace(/[^0-9]/g, ""), 10);

    const isAddState = this.textContent.trim() === "Add item";

    if (isAddState) {
      this.textContent = "Remove Item";

      addNewRowToTable(serviceName, servicePrice);
      totalPrice += numericPrice;
    } else {
      this.textContent = "Add item";

      removeRowFromTable(serviceName);
      totalPrice -= numericPrice;
    }

    totalPriceDisplay.textContent = `Total    ₹ ${totalPrice}`;
  });
});

function addNewRowToTable(name, price) {
  const serviceId = name.toLowerCase().replace(/\s+/g, "-");
  const newRow = document.createElement("tr");
  newRow.setAttribute("data-id", serviceId);

  newRow.innerHTML = `
        <td class="serial-col"></td>
        <td >${name}</td>
        <td >${price}</td>
      `;

  tableBody.appendChild(newRow);
  updateSerialNumbers();
}

function removeRowFromTable(name) {
  const serviceId = name.toLowerCase().replace(/\s+/g, "-");
  const rowToDelete = tableBody.querySelector(`[data-id="${serviceId}"]`);

  if (rowToDelete) {
    rowToDelete.remove();
  }

  updateSerialNumbers();
}

function updateSerialNumbers() {
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    const serialCell = row.querySelector(".serial-col");
    if (serialCell) {
      serialCell.textContent = index + 1;
    }
  });
}

document
  .getElementById("book-button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    const fullName = nameInput.value.trim();
    const emailId = emailInput.value.trim();
    const phoneNumber = phoneInput.value.trim();

    if (!fullName || !emailId || !phoneNumber) {
      alert("Please fill out all fields before booking.");
      return;
    }

    const templateParams = {
      user_name: fullName,
      user_email: emailId,
      user_phone: phoneNumber,
    };

    emailjs.send("service_stau09j", "template_k0t9qkb", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);

        const messageElement = document.createElement("p");
        alert("Thank You For The Booking");

        const buttonContainer = document.querySelector(".book-button");
        buttonContainer.appendChild(messageElement);

        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
      },
      function (error) {
        console.error("FAILED...", error);
        alert("Something went wrong. Please try booking again.");
      },
    );
  });
