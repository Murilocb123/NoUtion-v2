# NoUtion  V2 - Front-end

![Angular](https://img.shields.io/badge/Angular-v18-red)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📋 Descrição

O **NoUtion** é uma aplicação web desenvolvida em Angular, projetada para organização pessoal e produtividade. Inspirada em conceitos de produtividade modular, a aplicação oferece uma interface limpa e intuitiva, utilizando recursos modernos como Progressive Web App (PWA) e uma arquitetura escalável.

## 🚀 Funcionalidades

- 🗂️ Criação e organização de notas, documentos e projetos
- 🔗 Sistema de links entre documentos
- 🌐 Suporte a PWA (funciona offline e pode ser instalada)
- 🎨 Interface responsiva com PrimeNG e PrimeFlex
- ✍️ Editor de texto avançado baseado no Quill
- 🔐 Gerenciamento de autenticação (se aplicável)
- ⚙️ Integração com backend via APIs REST

## 🏗️ Tecnologias Utilizadas

- [Angular 18](https://angular.io/)
- [PrimeNG](https://primeng.org/) + [PrimeFlex](https://www.primefaces.org/primeflex/)
- [Quill](https://quilljs.com/) (Editor de texto rico)
- [TypeScript](https://www.typescriptlang.org/)
- [Service Worker](https://developer.mozilla.org/pt-BR/docs/Web/API/Service_Worker_API) (PWA)

## 📦 Instalação e Execução

### 🔧 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada LTS)
- [Angular CLI](https://angular.io/cli)

### 🚀 Instalação

Clone este repositório:

```bash
git clone https://github.com/seu-usuario/NoUtion-v2.git
cd NoUtion-v2
```

## 😺Gera GitHub Pages

```bash
ng build --configuration production --base-href "./"

npx angular-cli-ghpages --dir=dist/noution/browser
```
