# Effort Task

This repo contains the Effort task. It is a [jspsych](https://www.jspsych.org/) task built with React and Electron. This task uses the [Neuro Task Starter](https://www.github.com/brown-ccv/neuro-task-starter).


## Getting Started

1. Clone this repo onto your computer
```
git clone https://github.com/brown-ccv/task-effort.git
```
2. Install the dependencies
```
npm install
```
3. Run the task in dev mode - this should launch an electron window with the task with the inspector open to the console and will hot-reload when changes are made to the app
```
npm run dev

#to run the at home version of the app:
npm run dev:home
```
4. Check out the data - the data is saved throughout the task to the users's app directory.  This is logged at the beginning of the task wherever you ran `npm run dev`

## Contributing

1. Clone the repo and create a new feature branch off `develop`.

```shell
git clone https://github.com/brown-ccv/task-effort.git
git checkout -b your-feature-branch
```

2. Make your changes and commit using [commitizen](https://pypi.org/project/commitizen/)
3. Submit a [pull request](https://help.github.com/en/articles/creating-a-pull-request) to the `develop` branch. Add @mcmcgrath13 or @fernandogelin as a reviewer.

## Project Organization

This project directory is organized to be very modular and composable. In general, files and functions should be relatively small and self-contained, global scope should not be used (and definitely not mutated), and only the pieces of code needed for any given file should be imported. This keeps the code maintainable with clear lineage and purpose for each piece of code. Below are descriptions of the main files and folders.

### `package.json`

The `package.json` file contains metadata about your project and scripts to run tasks related to your task. The `name` should be updated to your task's name and `scripts` can be added as desired, but otherwise this file should not be edited manually.  To remove or add a dependency use `npm install` or `npm uninstall` with the `-D` flag if installing a dev dependency.

The `package-lock.json` contains metadata about the package installation. It should never be manually updated.

### `assets`

The icons for the installed applications are located here.

### `public/`

The `public` directory contains files that are used as assets in the built app. The `favicon.ico` is the small icon you can see in the browser tab (on Chrome) - it is set to Brown's logo in the project. The `index.html` contains the shell of your website - the name displayed on the tab can be changed here, otherwise it shouldn't need to be edited. The scripts included in the file are for `psiturk` as are the files in the `lib/` directory.

#### `electron.js`

This file contains all of the code relating to the electron app. This includes the event-marker, throwing errors via dialog windows, saving data, and reading files.

#### `config/`

The `config` directory contains the config files needed for the electron app.  This includes the event-marker details and event codes.

Note: the productId can be overwritten by the environment variable EVENT_MARKER_PRODUCT_ID

### `src/`

This folder contains the code for the app, the vast majority of changes and code should go here.

#### `App.js`

This is the starting point for the app. The `<Experiment>` component initializes a `jspsych` experiment. This is also where communication is set up with the `electron` and `psiturk` processes.

#### `electron-starter.js`

This file controls the main electron process. This is where any code that needs to interact with the system (ports, file system, etc.) should go. To communicate between electron and the task, use `ipc`.

#### `App.css`

This is where styling for the app is housed. If colors, fonts, spacing, etc. need to be set, do it here.

#### `assets/`

This folder contains any static files that are used by the app, such as images.

#### `config/`

In the `config/` directory, there are `.js` files which contain settings for the different parts of the task.  Every task should have a `main` config and a `trigger` config (assuming use of the event marker). The `main` config has all global settings for the task (such as whether it is in mturk mode or not), load the appropriate language file, and set up a default (or only) configuration object for the task. The `trigger` config has settings specific to the event marker and uses a slightly different style of javascript as it is imported both in the React app as well as the electron process.

Other config files can be used to add settings for specific blocks or sub-sections of the experiment.

#### `language/`

Any language that is displayed in the experiment should be stored in this folder. Usage of language json files allows for easy internationalization of the task (e.g. english and spanish) as well as allows for mturk specific language. This also makes it easy to re-use common phrases in many places in the task.

#### `lib/`

The `lib/` directory contains utility functions and markup that is used in the tasks.  This allows for functions and html to be re-used wherever needed. The `lib/utils.js` file contains functions that are generally useful across many tasks, whereas `lib/taskUtils.js` contains functions specific to this task.

#### `lib/markup`

`markup` files should contain primarily templates for HTML that is used throughout the task. Typically this will be a function that takes in some parameters and then returns a string with html.

#### `timelines`

`jspsych` uses `timelines` to control what `trials` are displayed in what order.  `timelines` can contain other `timelines`, which is why there may be several files in this directory.  The `main.js` file should have the timeline that is called by `App.js`.

#### `trials`

`jspsych` uses `trials` as its base unit of an experiment. These trials do things such as display some stimulus or request a response.
