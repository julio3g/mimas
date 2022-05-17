# Cadastro de usuário

**RF** <!-- => Requisitos funcionais -->

- Deve ser possível cadastrar um novo usuário.

**RN** <!-- => Regra de negócio -->

- Não deve ser possível cadastrar um usuário com um email ou telefone já existente.
- O usuário deve ser cadastrado, por padrão, como não administrador.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de usuários

**RF**

- Deve ser possível listar todos os usuários cadastrados

**RN**

- O usuário precisa estar logado no sistema.
- O usuário responsável pela listagem deve ser um usuário administrador.

# Cadastro de marca na ferramenta

**RF**

- Deve ser possível cadastrar uma marca para uma ferramenta

**RN**

- Não deve ser possível cadastrar uma marca para uma ferramenta não cadastrada.
- Não deve ser possível cadastrar uma marca já - existente para o mesma ferramenta.
- O usuário responsável pelo cadastro deve ser um usuário - administrador.

# Cadastro de imagens da ferramenta

**RF**

- Deve ser possível cadastrar a imagem da ferramenta

**RNF**

- Utilizar o multer para upload dos arquivos

**RN**

- O usuário deve poder cadastrar mais de uma imagem para o - mesma ferramenta
- O usuário responsável pelo cadastro deve ser um usuário - administrador.

# Usando ferramenta

**RF**

- Deve ser possível cadastrar que o usuário está usando uma ferramenta.

**RN**

- Não deve ser possível cadastrar um novo usando caso já - exista um aberto para a mesma ferramenta
- O usuário deve estar logado na aplicação.
- Ao usar a ferramenta, o status da ferramenta deverá ser - alterado para indisponível.

# Devolução de ferramenta

**RF**

- Deve ser possível realizar a devolução de uma ferramenta.

**RN**

- Ao realizar a devolução, a ferramenta deverá ser liberada para - outro usuário possa usar.
- O usuário deve estar logado na aplicação.

# Listagem de ferramentas para usuário

**RF**

- Deve ser possível realizar a busca de todos os ferramentas que o usuário está usando.

**RN**

- O usuário deve estar logado na aplicação.

# Recuperar Senha

**RF**

- Deve ser possível o usuário recuperar a senha informando o e-mail.
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha.
- O usuário deve conseguir inserir uma nova senha.

**RN**

- O usuário precisa informar uma nova senha.
- O link enviado para a recuperação deve expirar em 48 horas.

<!--
<h1 align="center">
  <img alt="Rocket.Q" title="Rocket.Q" src=".github/rocketq.png" width="220px" />
</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=49AA26&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>

<p align="center">
  <img alt="Rocket.Q" src=".github/capa.png" width="100%">
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- HTML
- CSS
- JavaScript
- NodeJS
- EJS
- Express
- SQLite

## 💻 Projeto

O Rocket.Q é uma aplicação de interação através de perguntas, sendo possível criar uma sala para internautas anônimos fazerem perguntas e o criador da sala em posse de uma senha gerenciar essas perguntas e marcar como lidas.

## 🔖 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/community/file/1009821158959690135/Roquet.q). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](.github/LICENSE.md) para mais detalhes.

---

  Feito com ♥ by Rocketseat :wave: [Participe da nossa comunidade!](https://discordapp.com/invite/gCRAFhc) -->

## Add Features

- [ ] Add login google
- [ ] Add two-factor authentication
- [ ] Add update image tool
- [ ] Add user avatar
- [ ] Add unitary tests
- [ ] Add supertest
- [ ] Add single or array upload
