# Getting Started with MatrixQ

This project needs a running MongoDB database in order to work.

## Available Scripts

In the project root directory, you can run:

### `yarn run setup`

Then please go into the `./server/config` directory and open the `development.json` file to adjust the MongoDB url to your local needs. After that go to the `./server` root directory and run:

### `node seed initial`

to seed the dabase with example docs. Start the server with:

### `yarn start`

After that go into the `./server` root directory and run:

### `yarn start`

to run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Handling

All your inputs in the matrix questionnaire can be saved to the datebase by pressing the "Save" button so that the data are preloaded when you refresh the page.