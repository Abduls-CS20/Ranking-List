// RANKING LIST START CODE

// HTML Variables
let outputEl = document.getElementById("output");
let rankingList = [];

// Button Event Listener
document.getElementById("btn").addEventListener("click", btnClicked);

if(localStorage.getItem("list") != null) {
   rankingList = localStorage.getItem("list").split(",");
  printList();
}
else console.log("No List");

function btnClicked() {
  // Get Menu Selection
  let selection = document.getElementById("menu").value;

  // Implement Menu Selection
  if (selection === "add") {
    addItem();
  } else if (selection === "remove-last") {
    removeLast();
  } else if (selection === "insert") {
    insert();
  } else if (selection === "remove-pos") {
    removePos();
  } else if (selection === "move") {
    move();
  } else if (selection === "edit") {
    edit();
  }
}

// Menu Option Functions
function addItem() {
  // Prompt the user for an item to add to the ranking list
  let newItem = prompt("Enter the item to add:");
  if (newItem !== null) {
    // Add the item to the end of the list
    rankingList.push(newItem);
    printList();
  }
}

function removeLast() {
  if (rankingList.length <= 0) {alert("There are no items in the ranking list."); return;}

  // Remove the last item from the ranking list
  if (rankingList.length > 0) {
    rankingList.pop();
    printList();
  }
}

function insert() {
  if (rankingList.length <= 0) {alert("There are no items in the ranking list."); return;}

  // Prompt the user for a position and an item to insert
  let position = +prompt("Enter the position to insert (1 - " + (rankingList.length + 1) + "):");
  if ( position >= 1 && position <= rankingList.length + 1) {
    let newItem = prompt("Enter the item to insert:");
    if (newItem !== null) {
      // Insert the provided item at the specified position
      rankingList.splice(position - 1, 0, newItem);
      printList();
    }
  } else {
    alert("Invalid position. Please enter a valid position.");
  }
}

function removePos() {
  if (rankingList.length <= 0) {alert("There are no items in the ranking list."); return;}

  // Prompt the user for a position
  let position = +prompt("Enter the position to remove (1 - " + rankingList.length + "):");
  if (position >= 1 && position <= rankingList.length) {
    // Remove the item at the given position
    rankingList.splice(position - 1, 1);
    printList();
  } else {
    alert("Invalid position. Please enter a valid position.");
  }
}

function move() {
  if (rankingList.length <= 0) {alert("There are no items in the ranking list."); return;}

  // Prompt the user for positions to move from and to
  let fromPosition = +prompt("Enter the position to move from (1 - " + rankingList.length + "):");
  let toPosition = +prompt("Enter the position to move to (1 - " + rankingList.length + "):");

  if (fromPosition >= 1 && fromPosition <= rankingList.length &&
      toPosition >= 1 && toPosition <= rankingList.length) {
    // Move the item according to the user’s instructions
    let itemToMove = rankingList.splice(fromPosition - 1, 1)[0];
    rankingList.splice(toPosition - 1, 0, itemToMove);
    printList();
  } else {
    alert("Invalid positions. Please enter valid positions.");
  }
}

function edit() {
  // Prompt the user for a position and an item to replace
  if (rankingList.length <= 0) {midalert("There are no items in the ranking list."); return;}
  let position = +prompt("Enter the position to edit (1 - " + rankingList.length + "):");
  if (position >= 1 && position <= rankingList.length) {
    let newItem = prompt("Enter the new item to replace the value:");
    if (newItem !== null) {
      // Replace the item in the list according to the user’s instructions
      rankingList[position - 1] = newItem;
      printList();
    }
  } else {
    alert("Invalid position. Please enter a valid position.");
  }
}

// Function to print the updated ranking list
function printList() {
  outputEl.innerHTML = ""; // Clear the existing list
  localStorage.setItem("list", rankingList);
  for (let i = 0; i < rankingList.length; i++) {
    let listItem = document.createElement("p");
    listItem.textContent = (i + 1) + ". " + rankingList[i];
    outputEl.appendChild(listItem);
  }
}
