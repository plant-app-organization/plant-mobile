export const formatPrice = (price: string) => {
  // Remove non-digit characters except for the decimal point
  const sanitizedPrice = price.replace(/[^\d.]/g, '')

  // Format the price
  return Number(sanitizedPrice).toFixed(2).replace('.', ',') + '€'
}

export const formatPriceToNumber = (priceStr: string) => {
  const formattedPrice = priceStr.replace('€', '').replace(',', '.')

  // Convert the string to a number
  return parseFloat(formattedPrice)
}
