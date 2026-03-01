'use client';

import { Lang, ui } from '../data/i18n';

interface DevFooterProps {
  lang: Lang;
}

export default function DevFooter({ lang }: DevFooterProps) {
  const text = ui[lang].dev.text;

  return (
    <p
      style={{
        position: 'absolute',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.6rem)',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: '0.58rem',
        color: 'var(--text-light)',
        opacity: 0.4,
      }}
    >
      {text}{' '}
      <a
        href="https://github.com/douglasjtds"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'inherit', textDecoration: 'underline' }}
      >
        github.com/douglasjtds
      </a>
    </p>
  );
}
