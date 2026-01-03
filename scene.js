const BASE_URL = "http://localhost:8087";
const headers = { "Content-Type": "application/json" };

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createRoad(road) {
  const res = await fetch(`${BASE_URL}/road`, {
    method: "POST",
    headers,
    body: JSON.stringify(road)
  });
  return res.json();
}

async function createJunction(junction) {
  const res = await fetch(`${BASE_URL}/junction`, {
    method: "POST",
    headers,
    body: JSON.stringify(junction)
  });
  return res.json();
}

async function createFlow(flow) {
  const res = await fetch(`${BASE_URL}/flows`, {
    method: "POST",
    headers,
    body: JSON.stringify(flow)
  });
  return res.json();
}

async function createSpeedLimitSign(sign) {
  const res = await fetch(`${BASE_URL}/create_sign`, {
    method: "POST",
    headers,
    body: JSON.stringify(sign)
  });
  return res.json();
}

async function createSemaphores() {
  // CREATING SEMAPHORES
  console.log("Creating semaphores...");
  await fetch(`${BASE_URL}/semaphores`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id:"junction1_0", // id semaphore
      road:"A1",
      direction:0,
      position: { x:550, y:550 },
    })
  });
  await sleep(1000);
  await fetch(`${BASE_URL}/semaphores`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id:"junction1_1", // id semaphore
      road:"A1",
      direction:1,
      position: { x:450, y:450 },
    })
  });
  await sleep(1000);
  await fetch(`${BASE_URL}/semaphores`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id:"junction1_2", // id semaphore
      road:"B1",
      direction:0,
      position: { x:550, y:450 },
    })
  });
  await sleep(1000);
  await fetch(`${BASE_URL}/semaphores`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id:"junction1_3", // id semaphore
      road:"B1",
      direction:1,
      position: { x:450, y:550 },
    })
  });
  /*await sleep(1000);
  await fetch(`${BASE_URL}/semaphores`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id:"junction2_0", // id semaphore
      road:"A1",
      direction:0,
      position: { x:500, y:1000 },
    })
  });
  await sleep(1000);
  await fetch(`${BASE_URL}/semaphores`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id:"junction2_1", // id semaphore
      road:"A1",
      direction:0,
      position: { x:500, y:1000 },
    })
  });
  await sleep(1000);
  await fetch(`${BASE_URL}/semaphores`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id:"junction2_2", // id semaphore
      road:"A1",
      direction:0,
      position: { x:500, y:1000 },
    })
  });
  await sleep(1000);
  await fetch(`${BASE_URL}/semaphores`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id:"junction2_3", // id semaphore
      road:"A1",
      direction:0,
      position: { x:500, y:1000 },
    })
  });*/
}

async function runScenario() {
  console.log("Creating roads...");

  await createRoad({
    roadNumber: "A1",
    roadName: "East-West Boulevard",
    category: 1
  });

  await createRoad({
    roadNumber: "B1",
    roadName: "North-South Avenue",
    category: 1
  });

  console.log("Creating flows...");

  // ROAD A
  await createFlow({
    roadId: "A1",
    direction: 0,
    numOfLanes: 1,
    coordinates: [
      { x: 0, y: 480 },
      { x: 500, y: 480 },
      { x: 1000, y: 480 }
    ]
  });

  await createFlow({
    roadId: "A1",
    direction: 1,
    numOfLanes: 1,
    coordinates: [
      { x: 1000, y: 520 },
      { x: 500, y: 520 },
      { x: 0, y: 520 }
    ]
  });

  // ROAD B
  await createFlow({
    roadId: "B1",
    direction: 0,
    numOfLanes: 1,
    coordinates: [
      { x: 520, y: 0 },
      { x: 520, y: 500 },
      { x: 520, y: 1020 }
    ]
  });

  await createFlow({
    roadId: "B1",
    direction: 1,
    numOfLanes: 1,
    coordinates: [
      { x: 480, y: 1020 },
      { x: 480, y: 250 },
      { x: 480, y: 0 }
    ]
  });

  console.log("Creating junctions...");

  await createJunction({
    outgoingRoads: [
      {
        idRoad: "A1",
        direction: 0
      },
      {
        idRoad: "B1",
        direction: 0
      },
      {
        idRoad: "A1",
        direction: 1
      },
      {
        idRoad: "B1",
        direction: 1
      }
    ],
    junctionType: 0,
    position: { x: 500.0, y: 500.0 }
  });

  console.log("Creating speed limit signs...");

  await createSpeedLimitSign({
    type: "MaxSpeedLimitSign",
    category: "REGULATORY_SIGN",
    idRoad: "A1",
    direction: 0,
    latitude: 1000,
    longitude: 520,
    lanes: "ALL",
    speedLimit: 50,
    unit: "KMH"
  });

  await createSpeedLimitSign({
    type: "MaxSpeedLimitSign",
    category: "REGULATORY_SIGN",
    idRoad: "B1",
    direction: 0,
    latitude: 520,
    longitude: 1000,
    lanes: "ALL",
    speedLimit: 50,
    unit: "KMH"
  });

  console.log("✅ Scenario created successfully");
}

async function createSemaphoresScenario() {
  await createSemaphores();
  console.log("✅ Semaphores created successfully");
}

runScenario().catch(err => {
  console.error("❌ Error creating scenario:", err);
});

createSemaphoresScenario().catch(err => {
  console.error("❌ Error creating semaphores:", err);
});
