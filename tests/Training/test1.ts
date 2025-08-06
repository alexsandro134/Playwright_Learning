const heartbeats = [
    { deviceId: "CAM001", timestamp: 1691234567 },
    { deviceId: "CAM002", timestamp: 1691234568 },
    { deviceId: "CAM001", timestamp: 1691234580 },
    { deviceId: "CAM003", timestamp: 1691234570 },
    { deviceId: "CAM002", timestamp: 1691234590 },
    { deviceId: "CAM001", timestamp: 1691234600 }
];

const expectedDevices = ["CAM001", "CAM002", "CAM003", "CAM004"];

function findDisconnectedDevices(heartbeats: Object[], expectedDevices: String[], timeWindow) {
    let listDevices = heartbeats.map((item) => item['deviceId'])

    // remove duplicates deviceId
    let uniqueDevices = [... new Set(listDevices)]
    
    // remove duplicate data on 2 arrays
    let noHeartbeatSignal = expectedDevices.filter((item) => !uniqueDevices.includes(item))

    let currentTime = 1691234620
    
    // order heartbeats and remove duplicate
    heartbeats.sort((a, b) => b['timestamp'] - a['timestamp'])
    let biggestTimestamp = [... new Set(heartbeats)]
    console.log('a', biggestTimestamp)
}

console.log(findDisconnectedDevices(heartbeats, expectedDevices, 30))
