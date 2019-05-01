import VisionSimulation from 'dota-vision-simulation';

const key2pt = VisionSimulation.prototype.key2pt;
const xy2key = VisionSimulation.prototype.xy2key;
const xy2pt = VisionSimulation.prototype.xy2pt;

const processNeighbors = (grid, lights, components, key, index) => {
    const pt = key2pt(key);
    const dirs = [[1, 0], [0, -1], [-1, 0], [0, 1]];
    for (let i = 0; i < dirs.length; i++) {
        const aX = pt.x + dirs[i][0];
        const aY = pt.y + dirs[i][1];
        if (!grid[aX] || !grid[aX][aY]) continue;
        const keyAdj = grid[aX][aY].key;
        if (components[keyAdj] || !lights[keyAdj]) continue;
        components[keyAdj] = index;
        processNeighbors(grid, lights, components, keyAdj, index);
    }
};

const getLightUnion = (grid, lights) => {
    const components = {};
    let index = 1;
    for (const key in lights) {
        if (!components[key]) {
            components[key] = index;
            processNeighbors(grid, lights, components, key, index);
            index++;
        }
    }

    const outlines = [];
    for (let i = 1; i < index; i++) {
        outlines.push(getOutline(grid, components, i));
    }
    return outlines;
};

const isSideFree = (grid, components, pt, dir) => {
    const aX = pt.x + dir[0];
    const aY = pt.y + dir[1];
    if (!grid[aX] || !grid[aX][aY]) return true;
    const keyAdj = grid[aX][aY].key;
    return !components[keyAdj];
};

const notSurrounded = (grid, components, pt) => {
    for (let i = 0; i < 8; i += 2) {
        const aX = pt.x + Math.round(Math.cos(2 * Math.PI - Math.PI / 4 * i));
        const aY = pt.y + Math.round(Math.sin(2 * Math.PI - Math.PI / 4 * i));
        if (!grid[aX] || !grid[aX][aY]) return i;
        const keyAdj = grid[aX][aY].key;
        if (!components[keyAdj]) return i;
    }
    return null;
};

const mod = (n, m) => ((n % m) + m) % m;

const getOutline = (grid, components, index) => {
    const outlinePoints = [];
    let startKey;
    let dir = null;
    for (const key in components) {
        const pt = key2pt(key);
        dir = notSurrounded(grid, components, pt);
        if (components[key] == index && dir !== null) {
            startKey = key;
            break;
        }
    }
    let next = processNext(grid, components, startKey, dir);
    while (startKey !== next.key || dir !== next.dir) {
        outlinePoints.push(next.point);
        next = processNext(grid, components, next.key, next.dir);
    }
    outlinePoints.push(next.point);
    return outlinePoints;
};

const checkAdj = (grid, components, pt, key, dir, i, adjDir) => {
    const aX = pt.x + dir[0];
    const aY = pt.y + dir[1];
    if (!grid[aX] || !grid[aX][aY]) return;
    const ptAdj = grid[pt.x + dir[0]][pt.y + dir[1]];
    if (components[ptAdj.key] == components[key] && isSideFree(grid, components, ptAdj, adjDir)) {
        return {
            key: ptAdj.key,
            dir: i,
        };
    }
};

const processNext = (grid, components, key, i) => {
    const pt = key2pt(key);

    const x = Math.round(Math.cos(2 * Math.PI - Math.PI / 4 * i));
    const y = Math.round(Math.sin(2 * Math.PI - Math.PI / 4 * i));

    const nI = mod(i + 2, 8);
    const nX = Math.round(Math.cos(2 * Math.PI - Math.PI / 4 * nI));
    const nY = Math.round(Math.sin(2 * Math.PI - Math.PI / 4 * nI));

    const bI = mod(i - 1, 8);
    const bX = Math.round(Math.cos(2 * Math.PI - Math.PI / 4 * bI));
    const bY = Math.round(Math.sin(2 * Math.PI - Math.PI / 4 * bI));

    if (isSideFree(grid, components, pt, [nX, nY])) {
        return {
            key,
            dir: mod(i + 2, 8),
            point: xy2pt(pt.x + bX / 2, pt.y + bY / 2),
        };
    }
    let next = checkAdj(grid, components, pt, key, [nX, nY], i, [x, y]);
    if (!next) {
        const aI = mod(i + 1, 8);
        const aX = Math.round(Math.cos(2 * Math.PI - Math.PI / 4 * aI));
        const aY = Math.round(Math.sin(2 * Math.PI - Math.PI / 4 * aI));
        const pI = mod(i - 2, 8);
        const pX = Math.round(Math.cos(2 * Math.PI - Math.PI / 4 * pI));
        const pY = Math.round(Math.sin(2 * Math.PI - Math.PI / 4 * pI));
        next = checkAdj(grid, components, pt, key, [aX, aY], pI, [pX, pY]);
    }
    if (next) {
        next.point = xy2pt(pt.x + bX / 2, pt.y + bY / 2);
        return next;
    }

    console.log('error');
};

export default getLightUnion;
