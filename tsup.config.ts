import { defineConfig } from 'tsup'

export default defineConfig({
  // dois pontos de entrada: o JS (componentes) e o CSS (tokens + estilos),
  // consumidos separadamente — import { Button } from 'baseline-ui' e
  // import 'baseline-ui/styles.css' uma vez no layout raiz.
  entry: ['src/index.ts', 'src/styles.css'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  // o próprio Base UI e React ficam de fora do bundle — quem consome já os tem
  external: ['react', 'react-dom', '@base-ui/react'],
})
