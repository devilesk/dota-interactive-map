const mapConstants = {
    map_w: 16384,
    map_h: 16384,
    map_x_boundaries: [-8507.4, 9515],
    map_y_boundaries: [8888.12001679, -8953.45782627],
    resolutions: [
        16384 / 1024,
        16384 / 1024 / 2,
        16384 / 1024 / 4,
        16384 / 1024 / 8,
        16384 / 1024 / 16,
    ],
    visionRadius: {
        observer: 1600,
        sentry: 1000,
        darkness: 675,
    },
    defaultMovementSpeed: 300,
    creepBaseMovementSpeed: 325,
    pullRangeTiming: [4, 2.25, 4.75],
};
mapConstants.imgCenter = [mapConstants.map_w / 2, mapConstants.map_h / 2];
mapConstants.scale = Math.abs(mapConstants.map_x_boundaries[1] - mapConstants.map_x_boundaries[0]) / mapConstants.map_w;

export default mapConstants;
