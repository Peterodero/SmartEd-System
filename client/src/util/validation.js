export function isEmail(value) {
  return value.includes('@');
} 

// export function isEmail(value) {
//   return typeof value === "string" && value.includes("@");
// }


export function isSiEmail(value) {
  return value.includes('@');
} 

export function isNotEmpty(value) {
  return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

// export function hasMinLength(value, minLength) {
//   return typeof value === "string" && value.length >= minLength;
// }


export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}