# Roadmap RentFlow SaaS

## Fase 1: Segurança e Lapidação do MVP (Foco Atual)
- [ ] **Autenticação:** Tela de login conectada ao Supabase Auth.
- [ ] **Proteção de Rotas:** Middleware Next.js para blindar o acesso ao `/dashboard`.
- [ ] **Segurança de Dados (RLS):** Ativar políticas no Supabase para garantir que uma imobiliária não veja os dados da outra.
- [ ] **Dashboard Real:** Substituir indicadores estáticos da Home por métricas reais do banco.
- [ ] **UX/Feedback:** Implementar alertas visuais (Toasts) para sucesso ou erro nas ações.

## Fase 2: Marketplace B2B (Manutenção Imobiliária)
- [ ] **Vínculo de Chamados:** Permitir que a imobiliária atribua um ticket a um prestador específico.
- [ ] **Portal do Parceiro (`/parceiros`):** Interface para o profissional visualizar o problema e enviar o valor do orçamento.
- [ ] **Aprovação e Take Rate:** Botão de "Aprovar Orçamento" no admin, acionando o cálculo e retenção da taxa da plataforma.

## Fase 3: Landing Page Segmentada e Acesso por Papéis (RBAC)
- [ ] **Nova Vitrine Pública:** Refatorar a home (`/`) com chamadas direcionadas para inquilinos (busca de imóveis), locadores (deixe seu imóvel) e corretores (seja parceiro).
- [ ] **Portal do Locador (Proprietário):** Dashboard para acompanhar repasses financeiros e status de manutenção dos seus imóveis.
- [ ] **Portal do Corretor:** Visão restrita ao Kanban de Leads e captações próprias (sem acesso ao financeiro geral).
- [ ] **Portal do Inquilino 2.0:** Adicionar emissão de 2ª via de boletos à tela de manutenção.

## Fase 4: Marketplace B2C (Contratação Direta)
- [ ] **Catálogo Aberto:** Locatários acessam profissionais para serviços particulares (limpeza, montagem de móveis, frete).
- [ ] **Match Maker:** Algoritmo que despacha o pedido para os 3 prestadores mais próximos.
- [ ] **Checkout Transparente:** Split de pagamentos integrado (Stripe/Asaas) para garantir a retenção da comissão antes do repasse.

## Fase 5: Monetização Avançada (Backlog Estratégico)
- [ ] **Background Check (Taxa de Ficha):** Integração via API (Serasa/SPC) para análise de crédito, cobrando R$ 30-50 no avanço para "Proposta".
- [ ] **Corretor Parceiro Premium:** Assinatura para corretores autônomos acessarem a base de imóveis e atuarem em co-brokering.
- [ ] **Anúncios em Destaque:** Taxa avulsa para proprietários fixarem seus imóveis no topo da página pública.
- [ ] **Garantia Locatícia Integrada:** Parceria com seguradoras (ex: CredPago) embutida no portal do inquilino, gerando *rebate* (comissão de indicação).
- [ ] **Venda de Leads Extras:** Sistema de distribuição e venda de leads fora de perfil para imobiliárias concorrentes.