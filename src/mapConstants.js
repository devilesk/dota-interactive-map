var mapConstants = {
    map_w: 16384,
    map_h: 16384,
    map_x_boundaries: [-8475.58617377, 9327.49124559],
    map_y_boundaries: [9028.52473332, -8836.61406266],
    resolutions: [
        16384 / 1024,
        16384 / 1024 / 2,
        16384 / 1024 / 4,
        16384 / 1024 / 8,
        16384 / 1024 / 16
    ],
    visionRadius: {
        observer: 1600,
        sentry: 850,
        darkness: 675
    },
    defaultMovementSpeed: 300
}
mapConstants.imgCenter = [mapConstants.map_w / 2, mapConstants.map_h / 2]
mapConstants.scale = Math.abs(mapConstants.map_x_boundaries[1] - mapConstants.map_x_boundaries[0]) / mapConstants.map_w;

module.exports = mapConstants;