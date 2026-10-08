const fmt = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' })
export const money = (n) => fmt.format(n)
