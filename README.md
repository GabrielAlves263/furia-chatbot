# 🐾 Furioso - Chatbot da FURIA Esports

**Furioso** é um chatbot desenvolvido com o objetivo de aproximar os fãs da FURIA do time de CS2, oferecendo informações em tempo real sobre lineups, campeonatos, estatísticas e curiosidades — tudo isso com uma personalidade marcante e cheia de atitude.

---

## Índice

1. [Funcionalidades](#Funcionalidades)
2. [Tecnologias Utilizadas](#Tecnologias-Utilizadas)
3. [Como Executar o Projeto](#Como-Executar-o-Projeto)
   - [Pré-requisitos](#pré-requisitos)
   - [Instalação](#instalação)
   - [Execução](#execução)
4. [Integração com a PandaScore API](#integração-com-a-pandascore-api)
5. [Exemplos de Perguntas ao Furioso](#exemplos-de-perguntas-ao-furioso)

---

## Funcionalidades

- 🔍 Respostas sobre partidas, lineups, mapas e estatísticas do time
- 📅 Agenda dos campeonatos e jogos futuros
- 📊 Histórico de conquistas e participações em Majors e LANs
- 🎙️ Perguntas divertidas e personalizadas com a personalidade do mascote Furioso
- 👾 Estilo visual inspirado no universo gamer

---

## Tecnologias Utilizadas

- **Next.js + TypeScript** – Framework principal
- **Tailwind CSS** – Estilização com foco em design responsivo e moderno
- **React Icons / Lucide React** – Ícones estilizados
- **Groq API** – Processamento de linguagem natural
- **API PandaScore**: informações atualizadas sobre resultados de partidas e campeonatos de CS2, além de estatísticas detalhadas dos times.

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js (v18+)
- Yarn ou npm

### Instalação

1. Clone o Repositório

```bash
git clone https://github.com/GabrielAlves263/furia-chatbot.git
```

2. Instale as dependêcias

```bash
npm install
```

3. Na raiz do projeto, crie um arquivo .env.local com as variáveis:
   (Você deve se cadastrar nos sites Grok e PandaScore e gerar uma chave para utilizar as API's)

```bash
GROQ_API_KEY=SUA_CHAVE
PANDASCORE_API_KEY=SUA_CHAVE
```

### Execução

```bash
npm run dev
```

## Integração com a PandaScore API

A **API da PandaScore** é responsável por fornecer dados em tempo real sobre campeonatos e partidas de CS2. Com ela, o Furioso consegue oferecer informações atualizadas como:

- **Resultados ao vivo de partidas**
- **Estatísticas detalhadas das equipes**
- **Agenda de eventos e torneios**
- **Histórico de partidas anteriores e placares**
- **Classificação de times nos torneios**

Para utilizar a PandaScore API, é necessário uma chave de API, que deve ser configurada no arquivo `.env.local`.

---

## Exemplos de Perguntas ao Furioso

- "Quais são os próximos campeonatos da FURIA?"
- "Qual a lineup atual do time?"
- "Qual foi a melhor colocação da FURIA em Majors?"
- "Quantos mapas a FURIA já jogou?"
- "Qual o placar da última partida da FURIA?"
