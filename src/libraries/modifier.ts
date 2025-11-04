function slugify(title: string): string {
  return title
    .normalize('NFD')                 // Separate accent
    .replace(/[\u0300-\u036f]/g, '')  // Remove accent sign
    .toLowerCase()                    // To lower case
    .trim()                           // Remove space
    .replace(/[^a-z0-9\s-]/g, '')     // Remove unusual character
    .replace(/\s+/g, '-')             // Space to strip
    .replace(/-+/g, '-');             // Prevent doble strip
}