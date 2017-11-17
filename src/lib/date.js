export const currMonth = ()=> {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = (month < 10 ? '0' + month : month);
  return `${year}-${month}`
}
