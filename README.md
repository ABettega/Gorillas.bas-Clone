# Gorillas.bas-Clone
Ironhack - Module 1 Final Project

## O que é [Gorillas.bas](https://en.wikipedia.org/wiki/Gorillas_(video_game))?
[O jogo](https://www.youtube.com/watch?v=ncykt-YJO1M), criado em 1991 na linguagem QBasic, é multiplayer. Consiste em dois jogadores, os dois gorilas, arremessando bananas explosivas para tentar explodir ao outro. As bananas explodem e deformam o terreno onde colidem. Para realizar o arremesso, os jogadores escrevem o ângulo e a potência desejada para o arremesso.

## Detalhes do desenvolvimento
### Features
- Geração aleatória de prédios, percorrendo a tela toda até o fim, com altura aleatória (com restrições) para todos
- Arremesso do projétil envolvendo física (força e resisência do vento horizontal e vertical)
- Animação para o giro da banana
- Colisão nos prédios
- Trilha e efeitos sonoros
### Dificuldades
- Originalmente, o arremesso seria desenvolvido utilizando a função arc() do Canvas para realizar a simulação do desenvolvimento. Após tentar por várias horas sair do chão com isso, decidi contra. Pesquisei sobre como desenvolver uma outra forma, e encontrei [um artigo](https://medium.com/@ryaboug/2d-projectile-motion-using-canvas-and-js-41f77e971a07) falando exatamente sobre esse tópico. Analisei o código sugerido, modifiquei consideravelmente e adaptei para o meu código. Após isso, tive o arremesso básico pronto.
- A geração aleatória dos prédios foi bem complexa, pois tive que mexer na lógica de remoção do projétil. Originalmente, o terreno era plano, e a banana era removida ao ficar com um Y superior ao do chão, o que não seria mais possível com essa geração aleatória dos prédios.
- Arte. Toda a parte visual bem desenhada (background, macacos, banana) foi encontrada na internet. A parte dos prédios aleatórios foi desenhada na mão via as funções do Canvas. Após diversas tentativas falhas, decidi deixar para a frente dos prédios um azul escuro com alpha, para simular reflexo.
### Roadmap
- [x] Setup básico da board, desenhar um macaco e um terreno plano
- [x] Pintura da board
- [x] Desenvolvimento da lógica de arremesso da banana
- [x] Criação de mais um player
- [x] Colisão da banana com o outro player
- [x] Tela de game over
- [x] Geração aleatória de prédios
- [x] Correção da lógica de posicionamento dos jogadores em cima dos prédios aleatórios
- [x] Correção da lógica de colisão
- [x] Adição de trilha e efeitos sonoros
- [x] Beautifying, deixando tudo mais visualmente cognizante
- [ ] Sistema de vidas / health
- [ ] Adição de mais opções de armas
- [ ] Movimentação de jogadores
- [ ] Deformação de terreno
### O que faltou
Não consegui adicionar a opção de mais armas pela falta de tempo. Levaria muito tempo para deixar perfeito, optei por remover para manter o projeto funcionando conforme estipulado.

Movimentação também era um objetivo legal, mas ia levar muito tempo.

A deformação de terreno obviamente seria extremamente difícil, por isso realmente era um strech goal que só seria buscado se todo o resto estivesse pronto. Levaria a uma completa remodelação de toda a lógica de colisão.
