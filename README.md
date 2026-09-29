# Calculadora de IMC & Análise de Peso Ideal

Aplicação web desenvolvida em **React + Vite** para o cálculo do Índice de Massa Corporal (IMC), diagnóstico de faixa de peso saudável e acompanhamento de histórico de medições.
O projeto chegou com inconsistências e falhas de execução e também apliquei algumas funcionalidades novas

## Funcionalidades

- **Cálculo de IMC e Classificação:** Processamento imediato do índice com base na altura e peso, classificando o resultado de acordo com os parâmetros da OMS (Magreza, Normal, Sobrepeso, Obesidade e Obesidade Grave).
- **Análise de Faixa de Peso Ideal (Novo):** Cálculo inverso automático que determina o intervalo de peso saudável (baseado no IMC entre 18,5 e 24,9) para a estatura informada, indicando a meta exata em quilos a ganhar ou perder.
- **Histórico Persistente (`localStorage`) (Novo):** Registo automático das últimas 10 medições no navegador com data, hora, medidas e classificação, incluindo opção para limpeza rápida dos dados.
- **Validação e Saneamento de Dados (Novo):** Bloqueio de caracteres inválidos, prevenção contra múltiplas vírgulas e validação de limites antropométricos reais com feedback visual de erro.
- **Destaque Dinâmico na Tabela (Novo):** Identificação visual automática da linha correspondente ao resultado atual do utilizador na tabela de referência.
- **Ajuste dos CSS:** Ajustei a paleta de cores com alto contraste em tons de Azul Marinho e Marrom Claro.

## Estrutura do Projeto

- `src/App.jsx`: Gestão de estado principal, cálculo do IMC, cálculo da meta de peso ideal e sincronização com o `localStorage`.
- `src/components/ImcCalc.jsx`: Formulário de entrada com validação estrita de dados e listagem do histórico recente.
- `src/components/ImcTable.jsx`: Painel de resultados, análise de peso ideal e tabela de referência com destaque dinâmico.
- `src/components/Button.jsx`: Componente reutilizável para ações de submissão, limpeza e navegação.
- `src/data/data.js`: Base de dados estática com os intervalos e classificações do IMC.

## Como executar o projeto

1. Instale as dependências:
   ```bash
   npm install
2. Inicie o projeto:npm run dev
3. Abra no navegador a URL exibida no terminal, normalmente:
   Local:   http://localhost:5173/
