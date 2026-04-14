# QR Studio Definitivo Modular

Projeto React + Vite, sem shadcn, organizado com separação clara de responsabilidades.

## O que este projeto faz

- Gera QR Code para:
  - link
  - texto livre
  - WhatsApp
  - Wi-Fi
  - e-mail
  - vCard
- Permite personalizar:
  - cor do QR
  - cor do fundo
  - cor do frame
  - estilo dos módulos
  - estilo dos olhos
  - tipo do frame
  - logo central
- Exporta em:
  - PNG normal
  - PNG em 4x

## Estrutura principal

```text
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── Hero.jsx
│   ├── PreviewCard.jsx
│   ├── ContentSection.jsx
│   ├── ColorSection.jsx
│   ├── StyleSection.jsx
│   ├── LogoSection.jsx
│   ├── NotesPanel.jsx
│   └── ui.js
├── qr/
│   ├── constants.js
│   ├── qrContent.js
│   ├── qrRenderer.js
│   ├── finderStyles.js
│   └── frames/
│       ├── index.js
│       ├── speechFrame.js
│       ├── badgeFrame.js
│       ├── simpleFrame.js
│       ├── doubleFrame.js
│       ├── ribbonFrame.js
│       └── ticketFrame.js
└── utils/
    ├── canvas.js
    └── download.js
```

## Rodando no Pop!_OS / Ubuntu

### Requisito
Node 18+, idealmente Node 20.

### Comandos
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

## Observação importante

QR com muito estilo, logo grande e pouco contraste pode perder legibilidade.
Sempre testa no celular antes de publicar ou imprimir.
