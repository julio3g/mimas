## Cadastro de usuário

**RF** <!-- => Requisitos funcionais -->

- Deve ser possível cadastrar um novo usuário.

**RN** <!-- => Regra de negócio -->

- Não deve ser possível cadastrar um usuário com um email ou telefone já existente.
- O usuário deve ser cadastrado, por padrão, como não administrador.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

## Listagem de usuários

**RF**

- Deve ser possível listar todos os usuários cadastrados

**RN**

- O usuário precisa estar logado no sistema.
- O usuário responsável pela listagem deve ser um usuário administrador.

## Cadastro de marca na ferramenta

**RF**

- Deve ser possível cadastrar uma marca para uma ferramenta

**RN**

- Não deve ser possível cadastrar uma marca para uma ferramenta não cadastrada.
- Não deve ser possível cadastrar uma marca já - existente para o mesma ferramenta.
- O usuário responsável pelo cadastro deve ser um usuário - administrador.

## Cadastro de imagens da ferramenta

**RF**

- Deve ser possível cadastrar a imagem da ferramenta

**RNF**

- Utilizar o multer para upload dos arquivos

**RN**

- O usuário deve poder cadastrar mais de uma imagem para o - mesma ferramenta
- O usuário responsável pelo cadastro deve ser um usuário - administrador.

## Usando ferramenta

**RF**

- Deve ser possível cadastrar que o usuário está usando uma ferramenta.

**RN**

- Não deve ser possível cadastrar um novo usando caso já - exista um aberto para a mesma ferramenta
- O usuário deve estar logado na aplicação.
- Ao usar a ferramenta, o status da ferramenta deverá ser - alterado para indisponível.

## Devolução de ferramenta

**RF**

- Deve ser possível realizar a devolução de uma ferramenta.

**RN**

- Ao realizar a devolução, a ferramenta deverá ser liberada para - outro usuário possa usar.
- O usuário deve estar logado na aplicação.

## Listagem de ferramentas para usuário

**RF**

- Deve ser possível realizar a busca de todos os ferramentas que o usuário está usando.

**RN**

- O usuário deve estar logado na aplicação.

## Recuperar Senha

**RF**

- Deve ser possível o usuário recuperar a senha informando o e-mail.
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha.
- O usuário deve conseguir inserir uma nova senha.

**RN**

- O usuário precisa informar uma nova senha.
- O link enviado para a recuperação deve expirar em 48 horas.

## Add Features

- [ ] Add login google
- [ ] Add two-factor authentication
- [ ] Add update image tool
- [ ] Add user avatar
- [ ] Add unitary tests
- [ ] Add supertest
