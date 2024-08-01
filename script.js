const addUserBtn = document.getElementById("adduser");
const BtnText = addUserBtn.innerText;
const usernameTextField = document.getElementById("username");
const recordDisplay = document.getElementById("records");
let edit_id = null;
let userArray = [];

// Get the string object from local storage and push it into the userArray.
let objstr = localStorage.getItem("users");
if (objstr != null) {
  userArray = JSON.parse(objstr);
}
displayInfo();

// Click event for inserting the user
addUserBtn.addEventListener("click", () => {
  const name = usernameTextField.value.trim(); // Trim whitespace
  if (name !== "") {
    if (edit_id != null) {
      // Edit
      userArray.splice(edit_id, 1, { name: name });
      edit_id = null;
    } else {
      // Insert
      userArray.push({ name: name });
    }
    // Push the array to the last position of the array
    saveInfo(userArray);
    addUserBtn.innerText = BtnText;
  } else {
    alert("Username cannot be empty.");
  }
});

// Function to save the users
function saveInfo(userArray) {
  // Convert the object to a string because the local storage takes value as a string and set the value to the localStorage
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
  usernameTextField.value = "";
  displayInfo();
}

// Display the user list in the browser
function displayInfo() {
  let statement = "";
  userArray.forEach((user, index) => {
    statement += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${user.name}</td>
        <td>
          <i class="bi bi-pencil-square" onClick='editInfo(${index})'></i>
          <i class="bi bi-x-circle" onClick='deleteInfo(${index})'></i>
        </td>
      </tr>`;
  });
  recordDisplay.innerHTML = statement;
}

// Edit the current user and modify the user list
function editInfo(id) {
  edit_id = id;
  usernameTextField.value = userArray[id].name;
  addUserBtn.innerText = "Update";
}

// Delete the user from the list
function deleteInfo(id) {
  userArray.splice(id, 1);
  saveInfo(userArray);
}
