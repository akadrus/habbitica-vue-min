"use strict";

class CommandParserService {
  constructor(command, adapter, boards) {
    this.allowLetters = ["a", "v", "d"];
    this.command = command;
    this.adapter = adapter;
    this.boards = boards;
  }

  handleCommand() {
    let command = this.command;
    command = command.split(":");
    let commandLetter = command[0];
    let boardIndex = command[1];
    

    if (!this.allowLetters.includes(commandLetter)) {
      alert("Wrong command! a, v or d!");
      return;
    }

    if (!Number.isInteger(Number(boardIndex))) {
      alert("Board index must be integer!");
      return;
    }

    let chosenBoard = Object.values(this.boards)[boardIndex - 1];
    if (typeof chosenBoard == "undefined") {
      alert("No such board!");
      return;
    }

    if (commandLetter == "a") {
      let taskTitle = command[2];
      this.adapter.createNewTask(taskTitle, chosenBoard.tags);
      return;
    }
    
    let taskIndex = command[2] - 1;
    let taskUid = chosenBoard.tasks[taskIndex].id;
    if (typeof taskUid === "undefined") {
      alert("No such task!");
      return;
    }

    if (commandLetter == "v") {
      this.adapter.scoreATask(taskUid);
    }

    if (commandLetter == "d") {
      this.adapter.deleteTask(taskUid);
    }

    return;
  }
}

export { CommandParserService };
