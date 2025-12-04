# UC1 – Visualizar Pagina Inicial

Objetivo: Permitir que o cliente veja as ofertas e acesse agendamentos.

Atores: Cliente, Visitante

Pré-condições: Acesso ao site

## Fluxo Principal

o sistema carrega a index com uma menu para navegar pelo site

o sistema exibe botões para fazer cadastro, login e agendamento para o visitante

o sistema exibe botões para vitrine, agendamento, perfil, orçamento para o cliente

o sistema exibe botões para vitrine(ver, remover, adicionar e editar), agendamento, perfil, orçamento e usuarios(ver, remover, adicionar e editar) para o administrador

Visitante seleciona um dos botões de agendamento [A1]

Cliente seleciona um dos botões de agendamento [A2]

O sistema mostra ícone do orçamento

Cliente seleciona botão de orçamento [A3]

Sistema mostra um rodapé com informações para contato

## Fluxo Alternativo

[A1]O visitante seleciona um agendamento:
    1. Sistema redireciona visitante para fazer o agendamento mostrando dias com seus horarios disponiveis 
    2. Sistema não permite visitante fazer agendamento, pedindo para que faça um cadastro/login

[A2]O usuario seleciona um agendamento:
    1. Sistema redireciona visitante para fazer o agendamento mostrando dias com seus horarios disponiveis 
    2. Sistema mostra botão "Corfirmar"
    3. Sistema mostra mensagem "Agendamento confirmado!"

[A3] usuário seleciona botão de orçamento:
    1.Sistema mostra lista de produtos adicionados ao orçamento do cliente

# UC2 – Agendar Atendimento

Objetivo: Permitir que o cliente agende banho, tosa ou banho e tosa.
Atores: Cliente

Pré-condições: Cliente ter um login 

## Fluxo Principal:

O sistema mostra uma agenda contendo dias, tipos de agendamento e horario disponivel

com um botão escrito "Confirmar"

usuario clica no botão[A1]

Sistema confirma agendamento.

## Fluxo Alternativo:

[A1]Usuario clica no botão:
    1. Sistema adiciona agendamento, mostrando no site

# UC3 – Fazer Orçamento Online

Objetivo: Permitir que o cliente realize orçamento.
Atores: Cliente
Pré-condição: estar logado

## Fluxo Principal:

Sistema mostra o orçamento com itens que foram selecionados

# UC4 – Fazer Cadastro

Objetivo: Permitir que o cliente faça um cadastro

Atores: Cliente

## Fluxo Principal:

Sistema exibe formulario para cadastro contendo informações de:
    1. Usuario
    2. E-mail
    3. Nome
    4. Senha
    5. Confirmação de Senha
    6. Telefone

    Exibe botão de cadastrar
    
Usuario clica em "cadastrar"[A1]

## Fluxo Alternativo:

[A1]Sistema verifica campo:
    1. Sistema notifica usuario que há campo vazio/invalido

# UC5 – Fazer Login

Objetivo: Permitir que o cliente se logue na conta

Atores: Cliente

## Fluxo Principal:

Sistema exibe formulario para Login contendo informações de:
    1. E-mail
    2. Senha
    
    Exibe botão "Confirmar" e botão "Voltar"

Usuario clica em "logar"[A1][A2]

Usuario clica em "voltar"[A3]

## Fluxo Alternativo:

[A1]Sistema verifica campos:
    1. Sistema notifica usuario que a senha ou e-mail estão incorretos

[A3]Sistema valida campos:
    1. Sistema loga o usuario
    2. Sistema Redireciona usuario para index

[A3]Usuario clica em voltar:
    1. sistema redireciona usuario para a index


# UC6 – Gerenciar Vitrine

Objetivo: Gerenciar produtos da vitrine
Atores: Administrador
Pré-condição: Login administrativo

## Fluxo Principal:

Sistema deve permitir Administrador cadastrar produtos na web vitrine

Sistema deve permitir Administrador excluir produto 

Sistema deve permitir Administrador alterar produto
