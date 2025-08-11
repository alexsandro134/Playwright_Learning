const syncQueue = [
    "incident_001_cam1.mp4",
    "incident_002_cam1.mp4",
    "incident_001_cam2.mp4",
    "incident_001_cam1.mp4",  // duplicate của item đầu tiên
    "incident_003_cam1.mp4",
    "incident_002_cam1.mp4"   // duplicate của item thứ 2
];

// Identify duplicate filenames trong queue
// Rename duplicates với suffix _v2, _v3, _v4, etc.
// Maintain original order của queue
// First occurrence giữ nguyên tên, chỉ duplicates mới được rename

function insertSuffix(filename, suffix) {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) {
        // No extension
        return filename + suffix;
    } else {
        // Has extension  
        const name = filename.substring(0, lastDotIndex);
        const ext = filename.substring(lastDotIndex);
        return name + suffix + ext;
    }
}

function resolveDuplicateFiles(queue: string[]) {
    const count: { [key: string]: number } = {}
    const result: string[] = []

    for (let item of queue) {
        count[item] = (count[item] || 0) + 1
        
        if (count[item] > 1) {
            // Insert suffix before file extension
            const suffix = '_v' + String(count[item])
            const lastDotIndex = item.lastIndexOf('.')
            
            if (lastDotIndex === -1) {
                item = item + suffix
            } else {
                const name = item.substring(0, lastDotIndex)
                const ext = item.substring(lastDotIndex)
                item = name + suffix + ext
            }
        }
        
        result.push(item)
    }
    
    return result
}

resolveDuplicateFiles(syncQueue)