export function getContrastingTextColor(color) {
	if(!color) return 'black';
	let rgb = hexToRgb(color);
  const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  return luminance > 182 ? 'black' : 'white';
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function getLighterColor(hex, percentage) {
  if (!/^#([A-Fa-f0-9]{6})$/.test(hex)) {
    throw new Error("Invalid hex color format. Please use #RRGGBB.");
  }
	let rgb = hexToRgb(hex);
  const blend = (color) => Math.round(color + (255 - color) * (percentage / 100));
  const newR = blend(rgb.r);
  const newG = blend(rgb.g);
  const newB = blend(rgb.b);
  const toHex = (value) => value.toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}