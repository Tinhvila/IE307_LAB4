export const formatPrice = (price: number): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  };

  return new Intl.NumberFormat('us-US', options)
    .format(price)
    .replace(' ', '')
    .replace('US', '');
};
