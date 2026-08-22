// Heurística compartilhada: dado um path de token do manifest
// (ex.: "color.accent", "space.4"), diz em qual arquivo de tokens ele
// é definido. Usada por generate-docs.mjs e por mcp-server/tools/get-tokens.mjs
// — a única lógica de leitura não trivial o suficiente pra valer a pena
// não duplicar entre os dois consumidores.
const hueNames = ['zinc', 'red', 'blue', 'green', 'orange', 'purple', 'pink', 'white', 'black']

export function tokenFile(path) {
  // primitivos: color.zinc.900, space.4... — semânticos: color.bg, color.accent...
  const seg = path.split('.')
  if (seg[0] === 'color' && hueNames.includes(seg[1])) return 'tokens/primitives.json'
  if (seg[0] !== 'color') return 'tokens/primitives.json'
  return 'tokens/semantic.light.json (e semantic.dark.json)'
}
