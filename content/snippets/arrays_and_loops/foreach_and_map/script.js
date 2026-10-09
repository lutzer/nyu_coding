// --- .forEach ---
// Walks the array and calls your function once per item.
// Returns nothing — it's for side effects (like printing).
const names = ["Ada", "Linus", "Grace"];

names.forEach((name) => {
  print(name);
});

// --- .map ---
// Also walks the array, but COLLECTS whatever your function
// returns into a brand new array of the same length.
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);

print("original: " + numbers);  // unchanged
print("doubled:  " + doubled);  // the new array
