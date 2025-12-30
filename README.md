# GERENCIADOR DE VISTORIAS

**Sistema Completo para Gestão e Controle de Vistorias**

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)

</div>

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

</div>

<div align="center">

![API](https://img.shields.io/badge/API-REST-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Lançada-green?style=for-the-badge)

</div>

**🚀 [Acesse a Aplicação](https://gerenciador-de-vistorias.vercel.app)**

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Deploy](#-deploy)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## 🎯 Visão Geral

O **Gerenciador de Vistorias** é uma aplicação full-stack moderna desenvolvida para facilitar o processo de gestão, registro e acompanhamento de vistorias. O sistema oferece uma interface intuitiva e responsiva para usuários finais, integrada a uma API robusta e escalável para gerenciamento de dados.

### Por que usar o Gerenciador de Vistorias?

Este projeto foi desenvolvido com foco em:

- **Interface Moderna**: Frontend desenvolvido com React/Next.js oferecendo uma experiência de usuário fluida e responsiva
- **API Robusta**: Backend em C# com .NET proporcionando alta performance e segurança
- **Arquitetura Escalável**: Separação clara entre frontend e backend permitindo manutenção e evolução independentes
- **Deploy Automatizado**: Integração com Vercel para entregas contínuas e confiáveis
- **Tipagem Forte**: Uso de TypeScript no frontend garantindo código mais seguro e manutenível

## ✨ Funcionalidades

- 📝 **Registro de Vistorias**: Cadastro completo de vistorias com todas as informações necessárias
- 🔍 **Consulta e Filtros**: Sistema avançado de busca e filtros para localizar vistorias específicas
- 📊 **Dashboard**: Visualização de dados e estatísticas em tempo real
- 👥 **Gerenciamento de Usuários**: Controle de acesso e permissões
- 📱 **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- 🔒 **Segurança**: Autenticação e autorização robustas
- 📄 **Relatórios**: Geração de relatórios detalhados das vistorias

## 🛠 Tecnologias

### Frontend (teia_web)
- **TypeScript**: Linguagem principal para desenvolvimento frontend
- **React**: Biblioteca para construção de interfaces
- **Next.js**: Framework React para aplicações web modernas
- **CSS Modules/Styled Components**: Estilização de componentes

### Backend (TeiaAPI)
- **C#**: Linguagem de programação principal
- **.NET Core/ASP.NET**: Framework para desenvolvimento da API
- **Entity Framework**: ORM para acesso a dados
- **SQL Server/PostgreSQL**: Banco de dados relacional

### DevOps & Deploy
- **Vercel**: Plataforma de deploy para o frontend
- **Git**: Controle de versão
- **GitHub**: Repositório e colaboração

## 📁 Estrutura do Projeto

```
GerenciadorDeVistorias/
│
├── TeiaAPI/                 # Backend - API em C#
│   ├── Controllers/         # Controladores da API
│   ├── Models/              # Modelos de dados
│   ├── Services/            # Lógica de negócio
│   ├── Data/                # Contexto do banco de dados
│   └── Program.cs           # Ponto de entrada da API
│
├── teia_web/                # Frontend - Aplicação React/Next.js
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços e chamadas à API
│   │   ├── styles/          # Arquivos de estilo
│   │   └── utils/           # Funções utilitárias
│   ├── public/              # Arquivos estáticos
│   └── package.json         # Dependências do projeto
│
├── .gitignore               # Arquivos ignorados pelo Git
└── README.md                # Documentação do projeto
```

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Para o Frontend
- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

### Para o Backend
- **.NET SDK** (versão 6.0 ou superior)
- **SQL Server** ou **PostgreSQL**
- **Visual Studio** ou **Visual Studio Code** (recomendado)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/UerikSilvaCavalcante/GerenciadorDeVistorias.git
cd GerenciadorDeVistorias
```

### 2. Configuração do Backend (TeiaAPI)

```bash
cd TeiaAPI

# Restaurar dependências
dotnet restore

# Configurar string de conexão no appsettings.json
# Edite o arquivo appsettings.json com suas credenciais de banco de dados

# Aplicar migrations (se houver)
dotnet ef database update

# Executar a API
dotnet run
```

A API estará disponível em: `https://localhost:5001` ou `http://localhost:5000`

### 3. Configuração do Frontend (teia_web)

```bash
cd teia_web

# Instalar dependências
npm install
# ou
yarn install

# Configurar variáveis de ambiente
# Crie um arquivo .env.local com a URL da API
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# Executar em modo de desenvolvimento
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em: `http://localhost:3000`

## 💻 Uso

### Executando o Projeto Completo

1. **Inicie o Backend**:
```bash
cd TeiaAPI
dotnet run
```

2. **Inicie o Frontend** (em outro terminal):
```bash
cd teia_web
npm run dev
```

3. **Acesse a aplicação**: Abra seu navegador em `http://localhost:3000`

### Construindo para Produção

**Frontend:**
```bash
cd teia_web
npm run build
npm run start
```

**Backend:**
```bash
cd TeiaAPI
dotnet publish -c Release -o out
```

## 🌐 Deploy

O frontend está automaticamente implantado na Vercel:

**🔗 [gerenciador-de-vistorias.vercel.app](https://gerenciador-de-vistorias.vercel.app)**

### Deploy do Frontend (Vercel)

O deploy do frontend é automático via GitHub:
1. Faça push para a branch `main`
2. A Vercel detecta e faz o deploy automaticamente

### Deploy do Backend

Para o backend, você pode usar:
- **Azure App Service**
- **AWS Elastic Beanstalk**
- **Heroku**
- **Docker/Kubernetes**

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está em desenvolvimento ativo.

## 👨‍💻 Autor

**Uerik Silva Cavalcante**

- GitHub: [@UerikSilvaCavalcante](https://github.com/UerikSilvaCavalcante)

## 📞 Contato

Para mais informações, dúvidas ou sugestões:

- 📧 Email: uerisalcaval003@gmail.com
- 🌐 Website: [gerenciador-de-vistorias.vercel.app](https://gerenciador-de-vistorias.vercel.app)
- 💬 Issues: [GitHub Issues](https://github.com/UerikSilvaCavalcante/GerenciadorDeVistorias/issues)

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

Desenvolvido com 💙 por [Uerik Silva Cavalcante](https://github.com/UerikSilvaCavalcante)

</div>
