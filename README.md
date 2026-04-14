# QR Studio

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
├── components
│   ├── ColorSection.jsx
│   ├── ContentSection.jsx
│   ├── Hero.jsx
│   ├── LogoSection.jsx
│   ├── NotesPanel.jsx
│   ├── PreviewCard.jsx
│   ├── StyleSection.jsx
│   ├── StyleWorkspace.jsx
│   └── ui.jsx
├── index.css
├── main.jsx
├── qr
│   ├── constants.js
│   ├── finderStyles.js
│   ├── frames
│   │   ├── badgeFrame.js
│   │   ├── doubleFrame.js
│   │   ├── index.js
│   │   ├── ribbonFrame.js
│   │   ├── simpleFrame.js
│   │   ├── speechFrame.js
│   │   └── ticketFrame.js
│   ├── qrContent.js
│   ├── qrRenderer.js
│   ├── templateRenderer.js
│   └── templates.js
└── utils
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
