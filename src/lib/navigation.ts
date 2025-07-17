export const navigation = [
  { name: 'Início', href: '/', id: 'hero' },
  { name: 'Missão', href: '/#missao', id: 'missao' },
  { name: 'Serviços', href: '/#servicos', id: 'servicos' },
  { name: 'Tratamentos', href: '/#tratamentos', id: 'tratamentos' },
  { name: 'Locais de atendimento', href: '/#atendimento', id: 'atendimento' },
]

// For components that need hash-only hrefs (like useActiveSection)
export const navigationWithHashes = navigation.map((item) => ({
  ...item,
  href:
    item.href === '/'
      ? '#hero'
      : item.href.startsWith('/#')
      ? item.href.slice(1)
      : item.href,
}))
