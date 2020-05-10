class taskToTagsMapperService {
  constructor(tasks, tags) {
    this.tasks = tasks
    this.tags = tags
  }

  make_boards() {
    let tagsCombinations = {}
    let tasks = this.tasks
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i]
      let tagString = this.make_string_from_tags(task.tags) || "*";

        if (!(tagString in tagsCombinations)) {
          tagsCombinations[tagString] = {
              'tasks': [],
              'index': i, 
              'visible': true,
              'slug': tagString,
              'name': tagString,
          }
        }
        tagsCombinations[tagString].tasks.push(task)
    }

    return tagsCombinations;
  }

  make_string_from_tags(tags) {
    if(tags.length == 0){
      return false;
    }

    let tagsNames = []
    for (let i = 0; i < tags.length; i++) {
      tagsNames.push(this.get_tag_name_by_uid(tags[i]));
    }
    return tagsNames.sort().join(' | ');
  }

  get_tag_name_by_uid(uid) {
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i].id == uid) {
        return this.tags[i].name
      }
    }
  }
}

export { taskToTagsMapperService }
