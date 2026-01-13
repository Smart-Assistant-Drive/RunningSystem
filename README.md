# Running System

-------

This rempository contains the docker compose setup for running the system locally and a simple Node.js scene script to create a simple scene.

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
- Ensure you have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed.
- Make sure you have the necessary permissions to run Docker commands.

## Setting Up the Environment

Execute the following command to start the Docker containers defined in the `compose.yaml` file:

```sh
docker-compose -f compose.yaml up -d --build
```

## Running the Scene

To execute `scene.js` using Node.js, run the following command in your terminal:

```sh
node scene.js
```

Make sure you are in the correct directory where `scene.js` is located.

## Warning

If you already have execute the scene once, make sure to clean up the previous created resources before running it again to avoid conflicts or unexpected behavior.

You can clean up the Docker containers and volumes by running:

```sh
  docker-compose -f compose.yaml down -v
```

Alternatively, you can modify the `scene.js` script by commenting out the resource already created to avoid duplication errors.

Be careful to always stop both the Docker containers of semaphore and traffic digital twin before running the scene again to ensure a clean state.

Once you have made them started again, you should comment everything that creates resources in the `scene.js` except:

```js
createSemaphoresScenario().catch(err => {
  console.error("❌ Error creating semaphores:", err);
});


createTrafficScenario().catch(err => {
  console.error("❌ Error creating traffic digital twins:", err);
});
```

