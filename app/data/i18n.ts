export type Lang = 'pt' | 'en';

export const ui = {
  pt: {
    home: {
      title: 'Santo Rosário',
      subtitle: 'Contemple os mistérios com tranquilidade e sem distrações.',
      daily: 'Terço do Dia',
      dailySub: (title: string, day: string) => `${title} · ${day}`,
      full: 'Rosário Completo',
      fullSub: 'Todos os 20 mistérios',
      langBtn: 'English',
    },
    selection: {
      heading: 'Escolha o início',
      back: '← Voltar',
    },
    transition: {
      label: 'Próximo terço',
      continueBtn: 'Continuar',
      endBtn: 'Encerrar',
    },
    completion: {
      title: 'Oração concluída',
      quote: 'Que os mistérios contemplados iluminem o seu dia.',
      backBtn: 'Voltar ao início',
    },
    theme: {
      toDark: 'Ativar tema escuro',
      toLight: 'Ativar tema claro',
    },
    donation: {
      label: 'Pelas vítimas das chuvas em Minas Gerais',
    },
    dev: {
      text: 'conheça o desenvolvedor:',
    },
    install: {
      banner: 'Adicione à tela inicial',
      installBtn: 'Instalar',
      iosTitle: 'Instalar no iPhone',
      iosStep1: 'Toque em ↑ na barra do Safari',
      iosStep2: "Toque em 'Adicionar à Tela de Início'",
      okBtn: 'Entendi',
      close: 'Fechar'
    },
  },
  en: {
    home: {
      title: 'Holy Rosary',
      subtitle: 'Contemplate the mysteries with peace and without distractions.',
      daily: 'Daily Rosary',
      dailySub: (title: string, day: string) => `${title} · ${day}`,
      full: 'Full Rosary',
      fullSub: 'All 20 mysteries',
      langBtn: 'Português',
    },
    selection: {
      heading: 'Choose the start',
      back: '← Back',
    },
    transition: {
      label: 'Next set',
      continueBtn: 'Continue',
      endBtn: 'End',
    },
    completion: {
      title: 'Prayer completed',
      quote: 'May the mysteries you contemplated illuminate your day.',
      backBtn: 'Back to start',
    },
    theme: {
      toDark: 'Switch to dark theme',
      toLight: 'Switch to light theme',
    },
    donation: {
      label: 'Support a good cause',
    },
    dev: {
      text: 'meet the developer:',
    },
    install: {
      banner: 'Add to home screen',
      installBtn: 'Install',
      iosTitle: 'Install on iPhone',
      iosStep1: 'Tap ↑ in the Safari toolbar',
      iosStep2: "Tap 'Add to Home Screen'",
      okBtn: 'Got it',
      close: 'Close'
    },
  },
} as const;
