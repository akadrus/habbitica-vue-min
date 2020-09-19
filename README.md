# habbitica-vue-min

## About
Simple hacky way to  Habbitica display TODOs grouped by TAGS
// screnshot 1
Made so I don't have to interact with Habbitica filter window on daily basic.

Command belows allow you to quickly add / mark as done / delete yours TODOs.

```CTRL + SHIFT + B``` moves focus to bar

```a:board_number:task_title``` - Adds TASK, so 
```a:5:Call Mark``` - will add task to board number 5
```v:board_number:task_number``` - completes task, so 
```v:5:1``` will complete task number 1 on board number 5
```d:board_number:task_number``` - deletes task 
```d:5:1``` deletes task number 1 on board number 5


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
