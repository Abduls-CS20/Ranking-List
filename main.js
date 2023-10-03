let outputEl = document.getElementById("output");
let rankingList = [];

document.getElementById("btn").addEventListener("click", btnClicked);

if(localStorage.getItem("list") != null) {
  rankingList = localStorage.getItem("list").split(",");
  printList();
}
else console.log("No List");

function btnClicked() {
  let selection = document.getElementById("menu").value;

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

function addItem() {
  let newItem = prompt("Enter the item to add:");
  if (newItem !== null) {
    rankingList.push(newItem);
    printList();
  }
}

function removeLast() {
  if (rankingList.length <= 0) {alert("There are no items in the ranking list."); return;}

  if (rankingList.length > 0) {
    rankingList.pop();
    printList();
  }
}

function insert() {
  if (rankingList.length <= 0) {alert("There are no items in the ranking list."); return;}

  let position = +prompt("Enter the position to insert (1 - " + (rankingList.length + 1) + "):");
  if ( position >= 1 && position <= rankingList.length + 1) {
    let newItem = prompt("Enter the item to insert:");
    if (newItem !== null) {
      rankingList.splice(position - 1, 0, newItem);
      printList();
    }
  } else {
    alert("Invalid position. Please enter a valid position.");
  }
}

function removePos() {
  if (rankingList.length <= 0) {alert("There are no items in the ranking list."); return;}

  let position = +prompt("Enter the position to remove (1 - " + rankingList.length + "):");
  if (position >= 1 && position <= rankingList.length) {
    rankingList.splice(position - 1, 1);
    printList();
  } else {
    alert("Invalid position. Please enter a valid position.");
  }
}

function move() {
  if (rankingList.length <= 0) {alert("There are no items in the ranking list."); return;}

  let fromPosition = +prompt("Enter the position to move from (1 - " + rankingList.length + "):");
  let toPosition = +prompt("Enter the position to move to (1 - " + rankingList.length + "):");

  if (fromPosition >= 1 && fromPosition <= rankingList.length &&
      toPosition >= 1 && toPosition <= rankingList.length) {
    let itemToMove = rankingList.splice(fromPosition - 1, 1)[0];
    rankingList.splice(toPosition - 1, 0, itemToMove);
    printList();
  } else {
    alert("Invalid positions. Please enter valid positions.");
  }
}

function edit() {
  if (rankingList.length <= 0) {
    alert("There are no items in the ranking list.");
    return;
  }
  let position = +prompt("Enter the position to edit (1 - " + rankingList.length + "):");
  if (position >= 1 && position <= rankingList.length) {
    let newItem = prompt("Enter the new item to replace the value:");
    if (newItem !== null) {
      rankingList[position - 1] = newItem;
      printList();
    }
  } else {
    alert("Invalid position. Please enter a valid position.");
  }
}

function printList() {
  outputEl.innerHTML = "";
  localStorage.setItem("list", rankingList);
  for (let i = 0; i < rankingList.length; i++) {
    let listItem = document.createElement("p");
    listItem.textContent = (i + 1) + ". " + rankingList[i];
    outputEl.appendChild(listItem);
  }
}
