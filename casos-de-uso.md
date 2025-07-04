# UC1 – Visualizar Pagina Inicial

Objetivo: Permitir que o cliente veja as ofertas e acesse agendamentos.

Atores: Cliente, Visitante

Pré-condições: Acesso ao site

## Fluxo Principal

o sistema carrega a index com uma menu para navegar pelo site

o sistema exibe botões para fazer agendamentos(banho, tosa e consulta)

Usuario seleciona um dos botões de agendamento [A1]

o sistema mostra ícone do carrinho de compras 

Usuario seleciona botão de carrinho de compras [A2]

Sistema mostra um rodapé com informações para contato

## Fluxo Alternativo

[A1]O usuario seleciona um agendamento:
    1. Sistema redireciona usuario para agendamento

[A2]O usuario abre o carrinho de compras:
    1. Sistema redireciona usuario para carrinho de compras
    2. Sistema mostra itens no carrinho de compra

# UC2 – Ver Serviços

Objetivo: Mostrar serviços com descrição e botões de agendamento.

Atores: Cliente, Visitante

## Fluxo Principal:

O sistema mostra menu de serviços de banho, tosa, vacina e brinquedos

O usuario escolhe um serviço[A1] 

O sistema mostra botão de adicionar ao carrinho e botão de compra&&agendamento

Usuario clica no botão de compra||agendamento[A2]

## Fluxo Alternativo:

[A1]Usuario seleciona um serviço:
    1. Sistema redireciona para serviço escolhido 
    2. Sistema motra catalago do serviço selecionado junto com sua descrição

[A2]Usuario seleciona compra&&agendamento
    1. Sistema redireciona para o produto ou abre um formulario de agendamento 

# UC3 – Agendar Atendimento

Objetivo: Permitir que o cliente agende banho, tosa ou consultas.
Atores: Cliente

Pré-condições: Cliente ter um login 

## Fluxo Principal:

O sistema mostra um formulário contendo:

1.Nome
2.Telefone
3.Tipo de pet
4.Serviço(Banho, tosa e Consulta podendo fazer multi seleções)
5.Data e hora

com um botão escrito "Confirmar"

usuario clica no botão[A1]

Sistema confirma agendamento por e-mail ou WhatsApp.

## Fluxo Alternativo:

[A1]Usuario clica no botão:
    1. Sistema redireciona usuario para o Index

# UC4 – Fazer Compras Online

Objetivo: Permitir que o cliente compre produtos e realize pagamento.
Atores: Cliente
Pré-condição: estar logado

## Fluxo Principal:

Sistema mostra o carrinho de compras com itens que foram selecionados

Sistema mostra as opções de pagamento: pix, cartão de crédito, cartão de débito, boleto

Usuario seleciona o tipo de pagamento[A1][A2][A3][A4]

Sistema mostra um campo para por CEP, bairro, número de casa e referência

## Fluxo Alternativo:

[A1]Usuario seleciona pagamento por Pix:
    1.Sistema gera um QR code para pagamento com expiração de 30 minutos
    2.Sistema gera um codigo aleatorio para pagamento com expiração de 30 minutos
    3.Sistema confere se pagamento foi feito

[A2]Usuario seleciona pagamento por cartão de crédito:
    1. Sistema mostra um formulario com informações do cartão
    2. Sistema confere se as informações adicionadas estão corretas
    3. Sistema confere se pagamento foi aprovado

[A3]Usuario seleciona pagamento por cartão de débito:
    1. Sistema mostra um formulario com informações do cartão
    2. Sistema confere se as informações adicionadas estão corretas
    3. Sistema confere se pagamento foi aprovado

[A4]Usuario seleciona pagamento por boleto:
    1. Sistema mostra boleto para pagar com expiração de 3 a 30 dias
    2. Sistema confere se pagamento foi feito

# UC5 – Area do Cliente

Objetivo: Permitir que o cliente cadastre/faça login/veja perfil, veja seu histórico de compra e agendamentos e itens desejados

Atores: Cliente

## Fluxo Principal:

Sistema exibe botão para se cadastrar||logar

Usuario clica em botão de cadastro||login[A1][A2]

Sistema exibe seus últimos 3 itens desejados e botão para exibir o restante.

Sistema exibe sua última compra e um botão de redirecionamento para o restante das compras.

Sistema mostra calendário do mês atual com seus agendamentos destacados.

## Fluxo Alternativo:

[A1]Usuario clica em cadastro:
    1. Sistema abre formulario para cadastro
    2. Pós cadastro, sistema redireciona para area do cliente

[A2]Usuario clica em login:
    1. Sistema abre formulario para login
    2. Sistema verifica se login existe
    3. Pós cadastro, sistema redireciona para area do cliente

# UC6 – Acessar Blog

Objetivo: Permitir leitura de conteudos sobre cuidados.
Atores: Cliente, Visitante

# Fluxo Principal:

Sistema mostra postagens com dicas e curiosidades de fontes confiáveis.

Usuario clica em alguma postagem[A1]

## Fluxo Alternativo:

[A1]Usuario clica em postagem:
    1. Sistema redireciona para postagem selecionada

# UC7 – Gerenciar Produtos

Objetivo: Gerenciar produtos
Atores: Administrador
Pré-condição: Login administrativo

## Fluxo Principal:

Sistema deve permitir Administrador cadastrar produtos para o usuario

Sistema deve permitir Administrador excluir produto 

Sistema deve permitir Administrador alterar produto

# UC8 - Gerenciar Blog

Objetivo: Gerenciar Blog
Atores: Administrador
Pré-condição: Login Administrativo

## Fluxos Princial:

Sistema deve permitir Administrador adicionar dicas/curiosidades

Sistema deve permitir Administrador excluir dicas/curiosidades

Sistema deve permitir Administrador alterar dicas/curiosidades

# UC9 - Gerenciar Serviços

Objetivo: Gerenciar Serviços
Atores: Administrador
Pré-condição: Login Administrativo

## Fluxos Princial:

Sistema deve permitir Administrador adicionar serviços

Sistema deve permitir Administrador excluir serviços

Sistema deve permitir Administrador alterar serviços
