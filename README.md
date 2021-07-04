# Chess game with TypeScript
A small chess game coded with TypeScript. The goal is to add an AI with TensorFlow and make it learn how to play chess and being good at it.

## Run the app
1. build the app:
```shell
$ npm run dev
```
2. run the index.html file by opening it directly in a browser or by serving it
> the command `npm run build` can be used to create a build for production

## Tech
- TypeScript
- HTML/CSS
- webpack

## To do
- [x] Interface du jeu d'échec
- [x] Création des mouvements des pièces
- [x] Validation des mouvements de toutes les pièces
- [x] Validation avancée des mouvements du roi: vérifier s'il sera menacé sur la case où il veut aller
- [x] Prise en passant
- [x] Roque avec validation
- [x] Échec et validation des mouvements pour défendre
- [ ] Promotion
- [ ] Afficher l'échec et mat
- [ ] Ajouter Tensorflow