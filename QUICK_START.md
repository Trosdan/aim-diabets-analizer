🚀 INSTRUÇÕES DE INÍCIO RÁPIDO

============================================
PASSO 1: OBTER CHAVE DE API DO GEMINI
============================================

1. Acesse: https://aistudio.google.com/app/apikey
2. Clique em "Create API Key"
3. Copie a chave gerada

============================================
PASSO 2: CONFIGURAR ARQUIVO .env
============================================

1. Abra o arquivo: diabetes-analyzer/.env
2. Substitua o valor da chave:
   VITE_GEMINI_API_KEY=sua_chave_aqui

   Exemplo:
   VITE_GEMINI_API_KEY=AIzaSyC1234567890abcdefgh

============================================
PASSO 3: INICIAR SERVIDOR DE DESENVOLVIMENTO
============================================

No terminal, dentro da pasta do projeto:

cd diabetes-analyzer
npm run dev

A aplicação abrirá em: http://localhost:5173

============================================
PASSO 4: TESTAR COM O ARQUIVO CSV
============================================

1. Na aplicação, clique em "Escolher arquivo CSV"
2. Selecione o arquivo: diabetes.csv (fornecido)
3. Clique em "Processar e Analisar"
4. Aguarde a análise inicial (pode levar alguns segundos)
5. Clique em "Análise Clínica Profunda"
6. Aguarde a análise profunda (pode levar alguns minutos)

============================================
POSSÍVEIS ERROS E SOLUÇÕES
============================================

❌ ERRO: "VITE_GEMINI_API_KEY não está configurada"
✅ SOLUÇÃO: 
   - Confirme que o arquivo .env existe
   - Verifique se a chave está corretamente copiada
   - Reinicie o servidor com npm run dev

❌ ERRO: "Falha na análise inicial"
✅ SOLUÇÃO:
   - Verifique a conexão com a internet
   - Confirme que a chave de API é válida
   - Teste a chave no: https://aistudio.google.com/
   - Verifique se o CSV tem o formato correto

❌ ERRO: Port 5173 já está em uso
✅ SOLUÇÃO: Use uma porta diferente
   npm run dev -- --port 3000

============================================
ESTRUTURA DO PROJETO
============================================

diabetes-analyzer/
├── src/
│   ├── components/          ← Componentes React
│   ├── services/            ← Serviço de IA
│   ├── styles/              ← Arquivos CSS
│   ├── App.jsx              ← Componente principal
│   └── main.jsx
├── .env                     ← Variáveis de ambiente
├── package.json
├── vite.config.js
└── README.md

============================================
RECURSOS DA APLICAÇÃO
============================================

✅ Upload de arquivo CSV
✅ Primeira análise (estatísticas, anomalias, padrões)
✅ Análise profunda (insights médicos, correlações)
✅ Interface moderna e responsiva
✅ Feedback visual (spinners, erros, sucesso)

============================================
PRÓXIMOS PASSOS
============================================

1. Adicionar mais modelos de IA (Claude, GPT-4, etc.)
2. Exportar análises em PDF
3. Criar dashboard com gráficos
4. Salvar histórico de análises
5. Comparação entre múltiplos arquivos

============================================
SUPORTE
============================================

📚 Documentação:
   - LangChain.js: https://js.langchain.com/
   - Gemini API: https://ai.google.dev/docs
   - React: https://react.dev/
   - Vite: https://vitejs.dev/

❓ Dúvidas? Consulte o README.md no projeto

============================================

✨ Boa sorte! Aproveite a aplicação! ✨
