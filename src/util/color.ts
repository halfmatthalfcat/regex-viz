export const getFontContrast = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((p) => parseInt(hex.substring(p, p + 2), 16));
  return (r * 299 + g * 587 + b * 114) / 1000 >= 160;
};
