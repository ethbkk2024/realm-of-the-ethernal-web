export const subAddressFormat = (address: string) => {
  const address_format = String(address).split('0x');
  return address_format[1];
};
