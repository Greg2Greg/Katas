# Introduction

On peut imaginer que les spécifications ont été rédigées à la suite d'un processus de BDD (domain storytelling, user-story mapping, example mapping).

# Les tests

Le projet est testé de 3 manières différentes:

- Les tests unitaires ont été réalisés en outside-in TDD: on commence le test à partir de l'application service (usecase). On part d'un cas d'utilisation concret de l'utilisateur (un comportent, un scénario). On ne dépend pas de comment c'est implémenté. On regarde uniquement les entrants et les sortants du cas utilisateur (black box). Le tout, à partir d'implémentations fake.

- Les tests d'intégrations testent uniquement les méthodes référencées par l'interface. Il n'y a pas d'intérêt à repartir du usecase, l'orchestration a déjà été testée par le test unitaire. De cette manière, le test sera moins long et moins difficile à maintenir.

- Les tests E2E quant à eux, testent toute la chaîne de bout en bout sur les happy paths uniquement car ce sont des tests chronophages. Leur but est de vérifier que la tuyauterie fonctionne de bout en bout : API => USECASE => BDD => PRESENTER / CLI => USECASE => BDD => PRESENTER. Le mieux ici étant d'utiliser testcontainers pour lancer des instances Docker isolées afin de simuler les conditions réelles.

Les tests incluent du mutation testing qui a pour fonction d'assurer la résilience des tests. Le framework Stryker est utilisé, il va introduire des "mutants" qui sont de légères modifications dans le code de production. L'introduction d'un mutant est censé faire échouer un test, si tous les tests passent alors qu'il y a un mutant, cela signifie qu'il est trop permissif.

Les tests utilisent des builders et fixtures, qui ont pour fonction:

- de cacher les détails de "plomberie" (connexion entre les repos / usecase / presenter)
- d'afficher uniquement les informations essentielles au test
- d'orchestrer le test clairement avec une description métier non-technique qui permet à un PO ou tout autre membre d'un projet de comprendre l'intention du test. Le but étant d'avoir un DSL : Domain Spécifique Langage (tiré des ateliers BDD qui permettent d'en décliner un ubiquitous langage)
- de pouvoir réutiliser facilement les builders / fixtures afin de refactoriser plus facilement à un unique endroit, et d'en créer plus facilement de nouveaux

# Structure projet

Le projet suit une structure orienté clean architecture - DDD. On retrouve les dossiers suivants:

- application: contient les usecases et les contrats (repo, presenter, adapters)
- domain: contient les entités et les value objets
- driven-adapter: contient les adapters qui sont appelés par les use-cases (repo, presenter, adapters)
- driving-adapter: contient les adapters qui appellent les use-cases (controller HTTP - CLI)

Note: un adapter peut être modélisé à nouveau par une structure sous forme de clean architecture "inner-hexagon"

# Nom des fichiers

Les noms de fichiers suivent la convention suivante:

- Les fichiers qui visent à implémenter un pattern sont suffixés par le nom du pattern. Que ce soit DDD ou design pattern: repository, presenter, builder, fixture, factory. Sauf pour les adapters qui sont souvent représentés par différents fichiers (ou même en inner hexagon), toutefois dans les ports on suffixe bien par adapter car la définition du contrat d'interface tient sur un fichier
- Les noms de fichiers sont séparés par des tirets et nom CamelCase, et séparé par un point avant le suffixe du pattern: qcm-answer.factory.ts
- Les entités, agrégats et value objects sont découpés en plusieurs fichiers pour plus de lisibilité: qcm-error, qcm-type, qcm.entity.ts. Uniquement un fichier est suffixé .entity c'est celui qui regroupe les comportements.

# Création d'un QCM

**Happy path :**

Une fois le QCM créé :

- Il doit être persisté avec un identifiant afin de pouvoir le récupérer
- Il est ensuite dans un état "soumis"
- Il doit être présenté sous la forme : titre de la question, réponses proposées en indiquant quelles sont les bonnes réponses

**Erreurs métiers :**

- Pas de duplication dans les réponses proposées
- Pas de duplication de questions
- Pas plus de 10 questions
- Pas possible d'ajouter des questions lorsque le QCM est soumis
- Pas possible de soumettre le QCM une seconde fois

# Réponse d'un QCM

**Happy path :**

La réponse du QCM doit être présentée dans une forme contenant :

- Le titre des questions
- Les réponses proposées aux questions
- Les réponses données

**Erreurs métiers :**

- Le QCM doit exister
- Le QCM doit être soumis
- La question doit exister
- La réponse donnée doit être associée à une réponse proposée
- Il ne doit pas y avoir 2x la même réponse

# TODO:

- Test E2E / intégration via testcontainers
- Mettre en place un DI container ?
- Mettre en place un vrai serveur ?
- Mettre en place une CI / CD ?
- Sanitizer les inputs (éviter injections SQL, ...)
- Comment doivent-être testés les schema validators ? Tests directs ou indirect via appel API / CLI ?

# Comment lancer ?

Dans VSCode => Run & Debug, ensuite choisir selon test via CLI ou API. Sinon, via pnpx en lançant exécutant les main.

# Remarques projet:

- Première utilisation du mutation testing, j'ai créé le projet en TDD et pour autant j'ai tout de même eu des mutants. L'utilisation des deux en concurrence permet d'avoir des tests non-permissif
- Au niveau du naming des fichiers, j'aime bien le fait de suffixer en pattern etc, mais ça me dérange qu'on ne puisse pas le faire tout le temps notamment pour les adapters (on ne va pas renommer en .adapter tous les fichiers adapters par exemple).
