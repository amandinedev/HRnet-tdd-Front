# HRnet App

HRnet is an HR management application built using Vite, React, Redux Toolkit, and SASS. The app allows users to input employee data such as personal information (first name, last name, date of birth, address), department, start date, etc., and save this data using the Redux store.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting Up the Frontend](#setting-up-the-frontend)
- [Running the Application](#running-the-application)

## Features

The application includes:
1. **Employee Data Input**: Users can input various details about employees, including personal information such as first name, last name, date of birth, address (street, city, state, zip code), department, and start date on the '/' home page.
2. **Data Storage with Redux**: Employee data is stored using the Redux Toolkit for efficient state management.
3. **View Data**: Saved employee data can be easily reviewed in a tabular format in the '/employee-list' page.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 16 or later)
- npm (version 7 or later) or yarn

## Installation

### Setting Up the Frontend

1. Clone this repository.
2. Navigate to the project directory:

```bash
cd hrnet-app
```

3. Install dependencies with npm or yarn:

```bash
npm install
# or
yarn install
```

## Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open your web browser and navigate to `http://localhost:5173` (or whatever port Vite is using).