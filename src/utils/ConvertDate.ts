export const ConvertDate = (d: string) => {
  const date = new Date(d);
  return date.toLocaleString("ru");
};
