"use strict";
import { Board } from "@/models/board.js";

class taskToTagsMapperService {
  constructor(tasks, tags) {
    this.tasks = tasks;
    this.tags = tags;
  }

  make_boards() {
    let boards = {};
    let tasks = this.tasks;
    let boardsIndex = 1;
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      let tagString = this.make_string_from_tags(task.tags) || "*";

      if (!(tagString in boards)) {
        boards[tagString] = new Board(task.tags, tagString, boardsIndex);
        boardsIndex++;
      }
      boards[tagString].addTask(task);
    }

    return boards;
  }

  make_string_from_tags(tags) {
    let tagsNames = [];
    for (let i = 0; i < tags.length; i++) {
      tagsNames.push(this.get_tag_name_by_uid(tags[i]));
    }
    return tagsNames.sort().join(" | ");
  }

  get_tag_name_by_uid(uid) {
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i].id == uid) {
        return this.tags[i].name;
      }
    }
  }
}

export { taskToTagsMapperService };
