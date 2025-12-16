const BASE_URL = "http://localhost:8080";
const headers = { "Content-Type": "application/json" };

async function createRoad(road) {
  const res = await fetch(`${BASE_URL}/road`, {
    method: "POST",
    headers,
    body: JSON.stringify(road)
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
    numOfLanes: 3,
    coordinates: [
      { first: -100, second: 0 },
      { first: 0, second: 0 }
    ]
  });

  await createFlow({
    roadId: "A1",
    direction: 1,
    numOfLanes: 3,
    coordinates: [
      { first: 0, second: 0 },
      { first: -100, second: 0 }
    ]
  });

  // ROAD B
  await createFlow({
    roadId: "B1",
    direction: 0,
    numOfLanes: 2,
    coordinates: [
      { first: 0, second: -100 },
      { first: 0, second: 0 }
    ]
  });

  await createFlow({
    roadId: "B1",
    direction: 1,
    numOfLanes: 2,
    coordinates: [
      { first: 0, second: 0 },
      { first: 0, second: -100 }
    ]
  });

  console.log("Creating speed limit signs...");

  await createSpeedLimitSign({
    type: "SPEED_LIMIT",
    category: "REGULATION",
    idRoad: 1,
    direction: 0,
    latitude: 0,
    longitude: -50,
    lanes: "ALL",
    speedLimit: 50,
    unit: "km/h"
  });

  await createSpeedLimitSign({
    type: "SPEED_LIMIT",
    category: "REGULATION",
    idRoad: 2,
    direction: 0,
    latitude: -50,
    longitude: 0,
    lanes: "ALL",
    speedLimit: 30,
    unit: "km/h"
  });

  console.log("✅ Scenario created successfully");
}

runScenario().catch(err => {
  console.error("❌ Error creating scenario:", err);
});