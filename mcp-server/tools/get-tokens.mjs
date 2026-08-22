import { loadTokens } from '../data.mjs'

// Tokens primitivos e semânticos (os dois modos), crus — o agente decide
// o que precisa; não filtramos aqui.
export function getTokens() {
  return loadTokens()
}
