// utils/wishlist.js
export const normalizeColor = (color) => {
    if (!color) return null;
    return color.toLowerCase().trim();
  };
  
  export const generateWishlistId = (product, color) => {
    const baseId = product.code;
    const normalizedColor = normalizeColor(color);
    return normalizedColor ? `${baseId}_${normalizedColor}` : baseId;
  };
  