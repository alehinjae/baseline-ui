import { Alert } from 'baseline-ui'

export function Variants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      <Alert variant="info">Mensagem informativa.</Alert>
      <Alert variant="success">Ação concluída com sucesso.</Alert>
      <Alert variant="warning">Atenção: revise antes de continuar.</Alert>
      <Alert variant="danger">Erro: algo deu errado.</Alert>
    </div>
  )
}
