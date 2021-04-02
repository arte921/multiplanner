const radialenfactor = Math.PI / 180;

module.exports = (coordinaat1, coordinaat2) => {
    const lat1 = coordinaat1.lat * radialenfactor;
    const lon1 = coordinaat1.lng * radialenfactor;
    const lat2 = coordinaat2.lat * radialenfactor;
    const lon2 = coordinaat2.lng * radialenfactor;

    const dlat = lat1 - lat2;
    const dlon = lon1 - lon2;
    
    const a = Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) *
        Math.cos(lat2) *
        Math.pow(Math.sin(dlon / 2), 2);
    
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};