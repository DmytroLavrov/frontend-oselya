export const categories = [
  { id: 'all-rooms', label: 'All Rooms' },
  { id: 'living-room', label: 'Living Room' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bathroom', label: 'Bathroom' },
  { id: 'outdoor', label: 'Outdoor' },
];

export const priceRanges = [
  { id: 'all-price', label: 'All Price', value: '' },
  { id: '0-9999', label: '$0.00 - 99.99', value: '0-9999' },
  { id: '10000-19999', label: '$100.00 - 199.99', value: '10000-19999' },
  { id: '20000-29999', label: '$200.00 - 299.99', value: '20000-29999' },
  { id: '30000-39999', label: '$300.00 - 399.99', value: '30000-39999' },
  { id: '40000-plus', label: '$400.00+', value: '40000+' },
];

export const menuMap = {
  '/product': 'product',
  '/shop': 'shop',
  '/contact-us': 'contact-us',
  '/': 'home',
};
