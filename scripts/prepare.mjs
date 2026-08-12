// Guard do lifecycle `prepare`. Este script roda em dois contextos bem
// diferentes e precisa se comportar diferente em cada um:
//
// 1. `npm install github:alehinjae/baseline-ui` num projeto consumidor —
//    npm roda `prepare` pra construir o pacote a partir da fonte (não há
//    passo de publish/pack prévio pra dependência git). O node_modules
//    do consumidor NÃO contém uma pasta .git — só builda.
// 2. `npm install` dentro deste próprio repositório (clone de
//    desenvolvimento) — builda E instala o hook de pre-commit do Husky.
//
// Sem esse guard, `husky` tentaria rodar dentro do node_modules de quem
// só está consumindo o pacote (onde não há repositório git nenhum pra
// instalar hook) — não quebraria, mas seria trabalho e ruído indevidos
// pra quem só quer usar a biblioteca.
import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'

execSync('npm run build', { stdio: 'inherit' })

if (existsSync('.git')) {
  execSync('npx husky', { stdio: 'inherit' })
}
