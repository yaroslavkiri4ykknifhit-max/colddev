export type Point3 = { x: number; y: number; z: number };
export type Rotation = { yaw: number; pitch: number };
export type OrbitLayout = { cx: number; cy: number; radius: number; disc: number; marker: Point3 };
const radians = Math.PI / 180;

export function spherePoint(latitude: number, longitude: number): Point3 {
  const lat = latitude * radians;
  const lon = longitude * radians;
  return { x: Math.cos(lat) * Math.sin(lon), y: Math.sin(lat), z: Math.cos(lat) * Math.cos(lon) };
}

export function rotatePoint(point: Point3, rotation: Rotation): Point3 {
  const yaw = rotation.yaw * radians;
  const pitch = rotation.pitch * radians;
  const depth = point.x * Math.sin(yaw) + point.z * Math.cos(yaw);
  return {
    x: point.x * Math.cos(yaw) - point.z * Math.sin(yaw),
    y: point.y * Math.cos(pitch) - depth * Math.sin(pitch),
    z: point.y * Math.sin(pitch) + depth * Math.cos(pitch),
  };
}

export function gridLines(spacing = 10, step = 3): Point3[][] {
  const lines: Point3[][] = [];
  for (let longitude = 0; longitude < 360; longitude += spacing) {
    const line: Point3[] = [];
    for (let latitude = -90; latitude <= 90; latitude += step) line.push(spherePoint(latitude, longitude));
    lines.push(line);
  }
  for (let latitude = -80; latitude <= 80; latitude += spacing) {
    const line: Point3[] = [];
    for (let longitude = 0; longitude <= 360; longitude += step) line.push(spherePoint(latitude, longitude));
    lines.push(line);
  }
  return lines;
}

function horizon(a: Point3, b: Point3): Point3 {
  const amount = a.z / (a.z - b.z);
  const x = a.x + (b.x - a.x) * amount;
  const y = a.y + (b.y - a.y) * amount;
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length, z: 0 };
}

// Clip each graticule to the visible hemisphere, including its horizon crossings.
export function traceFrontLine(
  points: Point3[], rotation: Rotation,
  move: (point: Point3) => void, line: (point: Point3) => void,
) {
  let previous: Point3 | undefined;
  let drawing = false;
  for (const original of points) {
    const point = rotatePoint(original, rotation);
    if (point.z >= 0) {
      if (!drawing) {
        move(previous && previous.z < 0 ? horizon(previous, point) : point);
        drawing = true;
      }
      line(point);
    } else if (drawing && previous) {
      line(horizon(previous, point));
      drawing = false;
    }
    previous = point;
  }
}

export function orbitLayout(width: number, height: number): OrbitLayout {
  if (width / height < 0.9) {
    return { cx: width / 2, cy: height * 0.2, radius: height * 0.72, disc: Math.min(width * 0.14, 60), marker: spherePoint(32, -5) };
  }
  const radius = height * 1.45;
  return { cx: width / 2, cy: height * 0.9 - radius, radius, disc: Math.min(width * 0.05, 76), marker: spherePoint(-4.5, -12.3) };
}

export function fallbackGrid(width: number, height: number) {
  const layout = orbitLayout(width, height);
  return gridLines(20, 6).map((points) => {
    let path = "";
    const append = (command: string, point: Point3) => {
      path += `${command}${(layout.cx + point.x * layout.radius).toFixed(1)},${(layout.cy - point.y * layout.radius).toFixed(1)}`;
    };
    traceFrontLine(points, { yaw: 0, pitch: 30 }, (point) => append("M", point), (point) => append("L", point));
    return path;
  });
}
