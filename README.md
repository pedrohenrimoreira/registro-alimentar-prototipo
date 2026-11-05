# Registro Alimentar Inteligente

Protótipo acadêmico navegável de Tópicos em Computação III — PUC Minas, 2026.

## Abrir

https://pedrohenrimoreira.github.io/registro-alimentar-prototipo/

## Experimentar

Descreva uma das três refeições de exemplo, ajuste porções entre 10 e 500 g, revise e salve. O diário permite editar e remover; o resumo soma os registros do dia. Há temas claro/escuro, calendário e preferência de lembrete demonstrativa.

## Desenvolvimento

Expo SDK 55 para web, React, expo-blur, expo-linear-gradient e Ionicons. O efeito glass usa os componentes web do Expo; não depende do Liquid Glass nativo do iOS.

```sh
npm ci
npm test
npm run start
```

Publicação estática:

```sh
EXPO_PUBLIC_BASE_URL=/registro-alimentar-prototipo npm run build
```

A pasta `docs/` contém o resultado publicado por GitHub Pages.

## Limites

Dados de exemplo somente na memória da aba. IA, voz, notificações e cobrança são simuladas ou planejadas. Não insira registros pessoais ou de saúde. O protótipo não recomenda dietas e não comprova validação com usuários.

Equipe: Pedro Henrique Moreira, Gabriel Azevedo Fernandes e Arthur Oliveira Santos. Professor João Carlos Caetano.
