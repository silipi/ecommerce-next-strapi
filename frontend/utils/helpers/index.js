export function currencyMask(number) {  
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function capitalizeFirstLetterEachWord(string) {
  let separateString = string.toLowerCase().split(" ");

  for (let i = 0; i < separateString.length; i++) {
    separateString[i] =
      separateString[i].charAt(0).toUpperCase() +
      separateString[i].substring(1);
  }

  return separateString.join(" ");
}
