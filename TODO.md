# Roadmap RentFlow SaaS

## Fase 1: Segurança e Lapidação do MVP (Foco Atual)
- [OK] **Autenticação:** Tela de login conectada ao Supabase Auth.
- [OK] **Proteção de Rotas:** Middleware Next.js para blindar o acesso ao `/dashboard`.
- [OK] **Segurança de Dados (RLS):** Ativar políticas no Supabase para garantir que uma imobiliária não veja os dados da outra.
- [OK] **Dashboard Real:** Substituir indicadores estáticos da Home por métricas reais do banco.
- [OK] **UX/Feedback:** Implementar alertas visuais (Toasts) para sucesso ou erro nas ações.

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

# Roadmap Completo RentFlow SaaS

## Fase 1: Segurança e Lapidação do MVP (Concluído ✅)
- [x] Autenticação e Proteção de Rotas (Middleware e SSR).
- [x] Segurança de Dados (RLS) para isolamento Multitenant.
- [x] Dashboard Real com métricas dinâmicas via banco.
- [x] Alertas visuais de UI (Toasts).

## Fase 2: Marketplace B2B e Portal do Inquilino
- [ ] **Abertura de Chamados:** Inquilino relata problemas com fotos via celular.
- [ ] **Vínculo de Prestadores:** Imobiliária despacha o ticket para parceiros.
- [ ] **Portal do Parceiro:** Fila de serviços e envio de orçamentos pelo celular.
- [ ] **Esteira de Aprovação:** Retenção do Take Rate (10%) na aprovação do proprietário.

## Fase 3: RBAC (Múltiplos Portais) e Vitrine Segmentada
- [ ] **Portal do Locador:** Extrato financeiro, IR e aprovação de consertos 1-click.
- [ ] **Portal da Imobiliária (Admin):** Kanban de leads, controle de vistorias e cobranças.
- [ ] **Nova Vitrine Pública:** Captação de visitantes segmentada (busco imóvel, tenho imóvel, sou prestador).

## Fase 4: Marketplace B2C e Roteamento de Leads
- [ ] **Catálogo Aberto B2C:** Inquilinos contratam serviços extras (faxina, montagem) com split de pagamento.
- [ ] **Radar de Leads:** Captação de contatos fora da carteira.
- [ ] **Motor de Vendas:** Roteamento e venda (Pay-per-Lead) para imobiliárias concorrentes.

## Fase 5: Assinaturas e Monetização Avançada
- [ ] **Clube Moradia:** Inquilino paga mensalidade para ter pequenos reparos gratuitos.
- [ ] **Plano Gestão Ativa:** Proprietário assina vistorias preventivas.
- [ ] **Parceiro Premium:** Mensalidade para prestadores terem destaque no catálogo e antecipação de recebíveis.
- [ ] **APIs de Garantia:** Venda embutida de Seguro Fiança e Background Check automatizado.

## Fase 6: Inteligência Artificial (Oceano Azul)
- [ ] **IA SDR (WhatsApp):** Bot de pré-qualificação e agendamento automático.
- [ ] **Orçamento Visual:** Reconhecimento de imagem para orçar manutenções instantly.
- [ ] **Precificação Dinâmica:** Sugestão de aluguel baseada em mapas de calor e dados macro.
- [ ] **Virtual Staging:** Mobília digital e gerador de anúncios SEO.