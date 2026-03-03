# 🙏 Holy Rosary — A Prayer Guide

A beautiful, distraction-free web app to guide you through the mysteries of the Holy Rosary. Whether you're praying the daily mystery or the complete rosary, this app keeps you focused on what matters.

Built with modern web technologies and designed for accessibility, simplicity, and spiritual focus.

---

## ✨ Features

- **Daily or Full Rosary**: Automatically select today's mystery set or pray all 20 mysteries
- **Dark Mode**: Switch seamlessly between light and dark themes for comfortable viewing any time of day
- **Screen Persistence**: Prayer screen stays active on mobile—no unwanted screen locks interrupting your prayer
- **Internationalization**: Full support for English (🇬🇧) and Portuguese (🇧🇷)
- **Responsive & Accessible**: Works beautifully on desktop, tablet, and mobile devices
- **Keyboard & Touch Navigation**: Multiple ways to navigate—arrows, space bar, swipe gestures, and click zones

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Fonts**: Crimson Text + Inter (via `next/font`)
- **Deployment**: Ready for [Vercel](https://vercel.com)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v22.11.0 (required for Next.js compatibility)
- npm, yarn, pnpm, or bun

### Installation & Development

```bash
# Clone the repository
git clone <repo-url>
cd holy-rosary

# Switch to the correct Node version (if using nvm)
nvm use v22.11.0

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

**Note**: If you see `@tailwindcss/oxide` errors after switching Node versions, run:
```bash
rm -rf node_modules package-lock.json && npm install
```

---

## 📂 Project Structure

```
app/
├── page.tsx              # Main app & state machine
├── layout.tsx            # Root layout & fonts
├── globals.css           # Theme colors & animations
├── components/           # Screen components
│   ├── HomeScreen.tsx
│   ├── SelectionScreen.tsx
│   ├── PrayerScreen.tsx
│   ├── TransitionScreen.tsx
│   ├── CompletionScreen.tsx
│   ├── ThemeToggleButton.tsx
│   └── DonationBanner.tsx
└── data/
    ├── mysteries.ts      # All mystery data & translations
    └── i18n.ts          # Internationalization
```

---

## 🌍 Inspiration & Purpose

This project was born from a personal need during Lent: while praying the Holy Rosary with Frei Gilson in the early mornings, I often lost track of which mystery we were on. I decided to build a simple, distraction-free website to help follow along—and to explore what's possible with modern web development and AI-assisted coding.

The result is a tool that's practical, accessible to everyone, and genuinely useful. If it helps you in your prayer practice, that brings me joy.

---

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Contribute

Found a bug or have a feature idea? Issues and pull requests are welcome! Let's make this tool even better together.

---

<br>

---

<br>

# 🙏 Santo Rosário — Um Guia de Oração

Um aplicativo web lindo e livre de distrações para te guiar através dos mistérios do Santo Rosário. Quer você esteja rezando o terço do dia ou o rosário completo, este aplicativo mantém seu foco no que realmente importa.

Construído com tecnologias web modernas e projetado para acessibilidade, simplicidade e foco apenas na contemplação dos mistérios do Nosso Senhor Jesus Cristo.

---

## ✨ Funcionalidades

- **Mistério Diário ou Rosário Completo**: Selecione automaticamente o conjunto de mistérios do dia ou reze os 20 mistérios completos
- **Tema Escuro**: Alterne facilmente entre temas claro e escuro para uma visualização confortável a qualquer hora do dia
- **Tela Perseverante**: A tela de oração permanece ativa no celular — sem bloqueios indesejados interrompendo seu terço
- **Internacionalização**: Suporte completo para Português (🇧🇷) e Inglês (🇬🇧)
- **Responsivo & Acessível**: Funciona lindamente em desktop, tablet e dispositivos mobile
- **Navegação por Teclado e Toque**: Múltiplas formas de navegar — setas, barra de espaço, gestos de toque e zonas de clique

---

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org) com App Router
- **Linguagem**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Fontes**: Crimson Text + Inter (via `next/font`)
- **Deploy**: Pronto para [Vercel](https://vercel.com)

---

## 🚀 Começando

### Pré-requisitos
- Node.js v22.11.0 (obrigatório para compatibilidade com Next.js)
- npm, yarn, pnpm, ou bun

### Instalação & Desenvolvimento

```bash
# Clone o repositório
git clone <repo-url>
cd holy-rosary

# Troque para a versão correta do Node (se usar nvm)
nvm use v22.11.0

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o app em ação.

### Scripts Disponíveis

```bash
npm run dev      # Iniciar servidor de desenvolvimento
npm run build    # Build para produção
npm run lint     # Executar ESLint
```

**Nota**: Se você ver erros de `@tailwindcss/oxide` após trocar de versão do Node, execute:
```bash
rm -rf node_modules package-lock.json && npm install
```

---

## 📂 Estrutura do Projeto

```
app/
├── page.tsx              # App principal & máquina de estado
├── layout.tsx            # Layout raiz & fontes
├── globals.css           # Cores do tema & animações
├── components/           # Componentes de tela
│   ├── HomeScreen.tsx
│   ├── SelectionScreen.tsx
│   ├── PrayerScreen.tsx
│   ├── TransitionScreen.tsx
│   ├── CompletionScreen.tsx
│   ├── ThemeToggleButton.tsx
│   └── DonationBanner.tsx
└── data/
    ├── mysteries.ts      # Todos os dados dos mistérios & traduções
    └── i18n.ts          # Internacionalização
```

---

## 🌍 Inspiração & Propósito

Este projeto nasceu de uma necessidade pessoal durante a Quaresma: enquanto rezava o Santo Rosário com o Frei Gilson às madrugadas, frequentemente me perdia em qual mistério estávamos. Decidi construir um website simples e livre de distrações para ajudar a acompanhar — e para explorar o que é possível com desenvolvimento web moderno e codificação assistida por IA.

O resultado é uma ferramenta prática, acessível a todos, e genuinamente útil. Se ela te ajudar em sua prática de oração, isso me traz alegria.

---

## 📖 Saiba Mais

- [Documentação Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Manual do TypeScript](https://www.typescriptlang.org/docs)

---

## 📝 Licença

Este projeto é código aberto e está disponível sob a [Licença MIT](LICENSE).

---

## 🙌 Contribua

Encontrou um bug ou tem uma ideia de funcionalidade? Issues e pull requests são bem-vindos! Vamos tornar essa ferramenta ainda melhor juntos.

---

💛 *Feito com fé e código*
