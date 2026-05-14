# 🏥 Diabetes Data Analyzer

Aplicação React com Vite para análise inteligente de dados de diabetes usando LangChain.js e Google Gemini API.

## 🚀 Recursos

- ✅ Upload e parsing de arquivos CSV
- ✅ Análise inicial com estatísticas básicas, anomalias e padrões
- ✅ Análise clínica profunda com insights médicos e recomendações
- ✅ Integração com Google Gemini API via LangChain.js
- ✅ Interface moderna e responsiva
- ✅ Suporte a processamento assíncrono

## 📋 Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn
- Uma chave de API do Google Gemini (obter em https://aistudio.google.com/app/apikey)

## ⚙️ Configuração

### 1. Obter Chave de API do Gemini

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Clique em "Create API Key"
3. Copie a chave gerada

### 2. Configurar Variáveis de Ambiente

1. Navegue até o diretório do projeto:
   ```bash
   cd diabetes-analyzer
   ```

2. Abra o arquivo `.env` e adicione sua chave de API:
   ```
   VITE_GEMINI_API_KEY=sua_chave_api_aqui
   ```

### 3. Instalar Dependências

```bash
npm install
```

## 🏃 Executar a Aplicação

### Modo de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos compilados estarão em `dist/`

## 📊 Como Usar

1. **Carregar CSV**: Selecione um arquivo CSV com dados de diabetes
2. **Análise Inicial**: Clique em "Processar e Analisar"
   - Exibe estatísticas básicas
   - Identifica anomalias
   - Mostra padrões principais
3. **Análise Profunda**: Clique em "Análise Clínica Profunda"
   - Fornece insights médicos detalhados
   - Correlações entre variáveis
   - Recomendações clínicas
   - Prognóstico

## 📁 Estrutura de Pastas

```
diabetes-analyzer/
├── src/
│   ├── components/
│   │   ├── CSVUploader.jsx          # Upload e parsing CSV
│   │   ├── AnalysisResults.jsx      # Primeira análise
│   │   └── DeepAnalysisResults.jsx  # Análise profunda
│   ├── services/
│   │   └── aiService.js              # Integração LangChain + Gemini
│   ├── styles/
│   │   ├── App.css
│   │   ├── CSVUploader.css
│   │   ├── AnalysisResults.css
│   │   └── DeepAnalysisResults.css
│   ├── App.jsx                       # Componente principal
│   ├── main.jsx                      # Entrada da aplicação
│   └── index.css                     # Estilos globais
├── .env                              # Variáveis de ambiente
├── vite.config.js                    # Configuração Vite
├── package.json                      # Dependências
└── README.md                         # Este arquivo
```

## 🔧 Tecnologias Utilizadas

- **React 18**: Biblioteca UI
- **Vite**: Build tool moderno
- **LangChain.js**: Framework para IA
- **Google Gemini API**: Modelo de IA
- **Papa Parse**: Parser CSV
- **React Markdown**: Renderização de markdown

## 📋 Formato do CSV Esperado

O arquivo CSV deve conter as seguintes colunas:

```
Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age, Outcome
```

Onde:
- **Pregnancies**: Número de gestações
- **Glucose**: Concentração de glicose
- **BloodPressure**: Pressão arterial
- **SkinThickness**: Espessura da pele
- **Insulin**: Nível de insulina
- **BMI**: Índice de massa corporal
- **DiabetesPedigreeFunction**: Função de genealogia de diabetes
- **Age**: Idade
- **Outcome**: 1 = diabetes, 0 = sem diabetes

## 🔒 Segurança

⚠️ **Em Produção**: 
- Nunca coloque a chave de API diretamente no código
- Use um backend proxy para fazer chamadas à API
- Implemente autenticação e autorização apropriadas
- Use HTTPS obrigatoriamente
- Adicione rate limiting

## 🐛 Troubleshooting

### Erro: "VITE_GEMINI_API_KEY não está configurada"
- Confirme que o arquivo `.env` existe
- Verifique se a chave está corretamente copiada
- Reinicie o servidor de desenvolvimento

### Erro: "Falha na análise inicial"
- Verifique se o arquivo CSV tem o formato correto
- Confirme que a chave de API é válida
- Verifique a conexão com a internet
- Teste a chave no [Google AI Studio](https://aistudio.google.com/)

### Aplicação lenta
- Arquivos CSV muito grandes podem exceder limites de token
- Reduza o tamanho dos dados ou implemente paginação
- Adicione suporte para arquivos comprimidos

## 📝 Exemplos de Uso

### Teste Rápido
1. Use o arquivo `diabetes.csv` fornecido
2. Clique em "Processar e Analisar"
3. Aguarde a análise inicial
4. Clique em "Análise Clínica Profunda"

## 🚀 Melhorias Futuras

- [ ] Exportar análises em PDF
- [ ] Histórico de análises
- [ ] Comparação entre múltiplos arquivos
- [ ] Dashboard com gráficos
- [ ] Suporte para outros modelos de IA
- [ ] Autenticação de usuários
- [ ] Armazenamento em banco de dados

## 📄 Licença

Este projeto é fornecido como está para fins educacionais.

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a documentação do [LangChain.js](https://js.langchain.com/)
2. Veja a [documentação do Gemini API](https://ai.google.dev/docs)
3. Abra uma issue no repositório

---

**Desenvolvido com ❤️ usando React + Vite + LangChain + Gemini**
