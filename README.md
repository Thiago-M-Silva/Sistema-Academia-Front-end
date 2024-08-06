# Bora Maromba

E um sistema de controle de academia voltado para clientes de academias e pessoas com interesse em organizar sua rotina de
exercicios físicos.
</br>
Nele o usuário pode controlar sua semana anotando suas atividades planejadas para a semana, assim obtendo maior controle sobre 
sua rotina de treinos.

## Sobre
Este é o repositório do front end do sistema feito em HTML/CSS e JavaScript e hospedado na vercell. Você pode conferir seu 
funcionamento no link a seguir: <https://bora-maromba.vercel.app> e caso queira ver mais sobre o backend, basta ir ao repositório 
no seguinte endereço <https://github.com/AndreFilho0/Sistema-Academia-Back-end>. 

## Execucao
Para executar este projeto, basta clonar o repositorio `http://github.com/Thiago-M-Silva/Sistema-Academia-Front-end.git` e subi-lo em um servidor local, por exemplo com a extensao Live Server do VsCode. Mas ele está disponível no endereco <https://bora-maromba.vercel.app>. Para acesso de administrador, o link e o seguinte <https://bora-maromba.vercel.app/pages/adm/login/login.html>, sendo apenas o cadastro diferente do cadastro de usuario.

## Organizacao e tecnologias
Este projeto, apenas o front end, não utilizou frameworks Js, sendo feito nas seguintes tecnologias:
* HTML
* CSS
* JavaScript
* As bibliotecas: Bootstrap, JQuery, Sweetalert, RxJs e animate
O projeto esta organizado nas seguintes pastas: assets, imports, pages e services. Sendo seu conteúdo o seguinte:
- assets: arquivos de imagens do projeto
- imports: arquivos para a importacao das bibliotecas necessarias no projeto
- pages: pastas para a construcao de paginas do projeto, sendo login, client e adm (sendo que adm possui uma pagina de login/cadastro próprio)
- services: classes Js com funcionalidades comuns ao sistema (funcoes de redirecionamento e requisicoes)