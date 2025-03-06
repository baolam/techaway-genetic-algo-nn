export const checkIsNum = (tmp: string[]) => {
  for (let num in tmp) {
    if (isNaN(parseInt(num))) return false
  }
  return true
}
