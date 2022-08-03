# Carbon Calculator Frontend

Thsi is the Frontend layout for the Carbon Calculator.
Project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Structure

### Commons

A set of reusable components for the entire application, includes a premade basic page layout with support for Header and Sidemenu

### Core

Non UI code with helpers, API queries, storages and typings

### Pages

The core pages for the application, each page has his own folder with specialized subcomponents inside, also with custom styling.
Currently the application has three pages: Home, Calculator and Report.

## Technical Details

The storage strategy consists on React Context for shared state, since in this scale a proper local storage framework would be overkill, added with an feature for sessionStorage persistence. Also, React Query already has a strategy for optimizing request with in memory storage.

## Tech Stack

    - Typescript
    - React
    - React Router
    - React Query
    - Material UI
    - FortAwesome
