const heartbeats = [
    { deviceId: "CAM001", timestamp: 1691234567 },
    { deviceId: "CAM002", timestamp: 1691234568 },
    { deviceId: "CAM001", timestamp: 1691234580 },
    { deviceId: "CAM003", timestamp: 1691234570 },
    { deviceId: "CAM002", timestamp: 1691234590 },
    { deviceId: "CAM001", timestamp: 1691234600 }
];

const expectedDevices = ["CAM001", "CAM002", "CAM003", "CAM004"];

interface Heartbeat {
    deviceId: string;
    timestamp: number;
}

function findDisconnectedDevices(heartbeats: Heartbeat[], expectedDevices: string[], timeWindow: number) {
    let listDevices = heartbeats.map((item) => item.deviceId)

    // remove duplicates deviceId
    let uniqueDevices = [... new Set(listDevices)]

    // remove duplicate data on 2 arrays
    let noHeartbeatSignal = expectedDevices.filter((item) => !uniqueDevices.includes(item))

    // group by deviceId
    const grouped = heartbeats.reduce((acc, hearbeat) => {
        acc[hearbeat.deviceId] = acc[hearbeat.deviceId] || []
        acc[hearbeat.deviceId].push(hearbeat)
        acc[hearbeat.deviceId].sort((a, b) => b.timestamp - a.timestamp)
        return acc
    }, {})

    const result = {}
    for (const item in grouped) {
        result[item] = grouped[item].slice(0, 1)
    }

    let overTimestamp = []
    for (const deviceId in result) {
        const heartbeatArr = result[deviceId]
        if (heartbeatArr.length > 0) {
            let currentTime = 1691234620
            const timestamp = heartbeatArr[0].timestamp
            if (currentTime - timestamp > timeWindow) {
                overTimestamp.push(deviceId)
            }

        }
    }

    return [...noHeartbeatSignal, ...overTimestamp]
}

console.log(findDisconnectedDevices(heartbeats, expectedDevices, 30))