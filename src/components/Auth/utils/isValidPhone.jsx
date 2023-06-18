export default function isValidPhone(value){
   const valid = value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
   return valid ? true : false
}