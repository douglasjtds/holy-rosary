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
      title: 'Instalar aplicativo',
      description: 'Adicione o Santo Rosário à tela inicial para acesso rápido, como um app!',
      installButton: 'Instalar',
      dismissButton: 'Agora não',
      iosTitle: 'Adicionar à Tela de Início',
      iosStep1: 'Toque no botão Compartilhar',
      iosStep2: 'Selecione "Adicionar à Tela de Início"',
      iosStep3: 'Toque em "Adicionar"',
      iosButton: 'Entendi',
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
      title: 'Install app',
      description: 'Add Holy Rosary to your home screen for quick access, like an app!',
      installButton: 'Install',
      dismissButton: 'Not now',
      iosTitle: 'Add to Home Screen',
      iosStep1: 'Tap the Share button',
      iosStep2: 'Select "Add to Home Screen"',
      iosStep3: 'Tap "Add"',
      iosButton: 'Got it',
    },
  },
} as const;
