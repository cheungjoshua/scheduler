# Interview Scheduler

App that create meetings for students to connect with mentors in real time.

- Show current interviews and available spots
  !["Home Page"](https://github.com/cheungjoshua/scheduler/blob/master/doc/Screen%20Shot%202022-06-22%20at%2019.58.19.png?raw=true)

- Create a interview by click the "+" button in the middle
  !["Create interview"](https://github.com/cheungjoshua/scheduler/blob/master/doc/Screen%20Shot%202022-06-22%20at%2019.58.35.png?raw=true)

- Fill the student name and select the mentor
  !["Input name and pick mentor"](https://github.com/cheungjoshua/scheduler/blob/master/doc/Screen%20Shot%202022-06-22%20at%2019.58.51.png?raw=true)

- Interview after created
  !["Interview created"](https://github.com/cheungjoshua/scheduler/blob/master/doc/Screen%20Shot%202022-06-22%20at%2019.59.01.png?raw=true)

- Confirm state when user delete the interview
  !["Delete interview"](https://github.com/cheungjoshua/scheduler/blob/master/doc/Screen%20Shot%202022-06-22%20at%2019.59.17.png?raw=true)

## Setup

Install dependencies with `npm install`.
(Please read Warning & tips)

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress End-to-End Test

```sh
npm run cypress
```

## Warnings & Tips

Please confirm system running Node v15.x.x and python2 before run npm install. App and dependencies will not work properly with v16 and up.

## Dependencies

- React @16.9.0
- Node @15.14.0
- Cypress @9.7.0
- Storybook
- Jest
- Axios
- Sass
