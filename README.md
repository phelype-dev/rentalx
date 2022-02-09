# Cadastro Carros #
** Requisitos Funcionais **
Deve ser possível cadastrar um novo carro.

** Regra de Negocio **
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com disponibilidade por padrão.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros #
** Requisitos Funcionais **
Deve ser possível listar todos os carros disponiveis.
Deve ser possível listat todos os carros pelo nome da categoria.
Deve ser possível listat todos os carros pelo nome da marca.
Deve ser possível listat todos os carros pelo nome do carro.

** Regras de Negocios **
O usuário não precisa estar logado no sistema

# Cadastro de Especificação no carro #

** Requisitos funcionais **
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros.

** Regras de Negocios **
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma mesma especificação para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagem do carro #

** Requisitos funcionais **
Deve ser possível cadastrar a imagem do carro.


** Requisitos não funcionais **
Utilizar o multer para upload dos arquivos.

** Regras de Negocios **
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro #

** Requisitos Funcionais **
Deve ser possível cadastrar um aluguel.



** Regras de negocio *
O Aluguel deve ter no minimo 24hrs.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
