export default function chooseColorOrTranslate(
  status: string,
  isColor: boolean
) {
  switch (status) {
    case "given":
      return isColor ? "#1976d2" : "Выдана";
    case "returned":
      return isColor ? "#388e3c" : "Возвращена";
    case "pending":
      return isColor ? "#ff9800" : "В ожидании";
    default:
      return "#000";
  }
}
