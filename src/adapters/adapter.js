'use strict';
import axios from 'axios';

class HabbiticaAdapter {
  constructor(user_data = {}){
    this.endpoint =  'https://habitica.com/api/v3/';
    this.x_client = '2bd43415-87da-4b86-bc27-855835e80215-mySimpleHabbiticaVueApp';
    this.user_data = user_data;

    this.adapter = axios.create({
      timeout: 10000,
      headers: {
        'x-client': this.x_client,
        'x-api-user': user_data.user,
        'x-api-key': user_data.key
      }
    });
  }

  getTasks(){
    return this.getRequest('tasks/user');
  }

  getTags(){
    return this.getRequest('tags');
  }
  

  getRequest(endpoint_url){
    return this.adapter.get(this.endpoint + endpoint_url, {
      timeout: 10000
    });
  }

  scoreATask(taskUid){
    return this.adapter.post(`${this.endpoint}tasks/${taskUid}/score/up`, {
      timeout: 10000
    });
  }

  deleteTask(taskUid){
    return this.adapter.delete(`${this.endpoint}tasks/${taskUid}`, {
      timeout: 10000
    });
  }

  createNewTask(text, tags){
    return this.adapter.post(`${this.endpoint}tasks/user`, {
        text: text,
        type: "todo",
        tags: tags
    });
  }
}

export { HabbiticaAdapter }
