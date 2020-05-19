const required = (propertyType) => {
  return (v) => (v && v.length > 0) || `You must input a ${propertyType}`
}
const minLength = (propertyType, minLength) => {
  return (v) =>
    (v && v.length >= minLength) ||
    `${propertyType} must be at least ${minLength} characters`
}
const maxLength = (propertyType, maxLength) => {
  return (v) =>
    (v && v.length <= maxLength) ||
    `${propertyType} must be less than ${maxLength} characters`
}

const emailFormat = () => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,24})+$/
  return (v) => (v && regex.test(v)) || 'Must be a valid email'
}

export default {
  required,
  minLength,
  maxLength,
  emailFormat
}
