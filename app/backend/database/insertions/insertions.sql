
/*Première requête pour les catégories*/
INSERT INTO categorie (NomCategorie) VALUES
('Unies'),
('Motifs'),
('Memes');

/* 1. Chaussettes Unies */
('Chaussette courte rose',        'Courte',  5.00, 1, 0.00, 'De belles chaussettes roses, parfaites pour l''été.',       '39-42', 'Unisexe', 50, 'cho7-uni-3d-1.png',  'cho7-uni-portee-1.png',  'Rose',     NULL),
('Chaussette haute jaune',        'Haute',   7.00, 1, 0.00, 'Apportez du soleil avec ces chaussettes hautes jaunes.',   '39-42', 'Unisexe', 50, 'cho7-uni-3d-2.png',  'cho7-uni-portee-2.png', NULL,    NULL),
('Chaussette longue verte',       'Longue',  7.00, 1, 0.00, 'Un vert profond pour un style affirmé.',                   '39-42', 'Unisexe', 50, 'cho7-uni-3d-3.png',  'cho7-uni-portee-3.png',  NULL,     NULL),
('Chaussette moyenne vert menthe','Moyenne', 6.00, 1, 0.00, 'Fraîcheur garantie avec ce vert menthe.',                  '39-42', 'Unisexe', 50, 'cho7-uni-3d-4.png',  'cho7-uni-portee-4.png',  NULL, NULL),
('Chaussette haute bleue',        'Haute',   7.00, 1, 0.00, 'Un bleu classique et élégant.',                            '39-42', 'Unisexe', 50, 'cho7-uni-3d-5.png',  'cho7-uni-portee-5.png',  NULL,     NULL),
('Chaussette haute noire',        'Haute',   7.00, 1, 0.00, 'L''indispensable de toute garde-robe.',                    '39-42', 'Unisexe', 50, 'cho7-uni-3d-6.png',  'cho7-uni-portee-6.png',  NULL,    NULL),
('Chaussette haute grise',        'Haute',   7.00, 1, 0.00, 'Sobres et confortables pour tous les jours.',              '39-42', 'Unisexe', 50, 'cho7-uni-3d-7.png',  'cho7-uni-portee-7.png',  NULL,     NULL),
('Chaussette courte rouge',       'Courte',  5.00, 1, 0.00, 'Une touche de passion discrète à vos chevilles.',          '39-42', 'Unisexe', 50, 'cho7-uni-3d-8.png',  'cho7-uni-portee-8.png',  NULL,   NULL),
('Chaussette haute bordeaux',     'Haute',   7.00, 1, 0.00, 'Chaleureuses et sophistiquées.',                           '39-42', 'Unisexe', 50, 'cho7-uni-3d-9.png',  'cho7-uni-portee-9.png', NULL, NULL),
('Chaussette haute lavande',      'Haute',   7.00, 1, 0.00, 'Une couleur douce et apaisante.',                          '39-42', 'Unisexe', 50, 'cho7-uni-3d-10.png', 'cho7-uni-portee-10.png', NULL,  NULL),

/* 2. Chaussettes à Motifs */
('Chaussette moyenne à pois',         'Moyenne', 7.00, 2, 0.00, 'Un classique indémodable avec ces jolis pois.',        '39-42', 'Unisexe', 50, 'cho7-motif-3d-1.png',  'cho7-motif-portee-1.png',  'Blanc / Bleu',  NULL),
('Chaussette longue pied-de-poule',   'Longue',  8.00, 2, 0.00, 'Le motif chic par excellence.',                       '39-42', 'Unisexe', 50, 'cho7-motif-3d-2.png',  'cho7-motif-portee-2.png',  NULL, NULL),
('Chaussette moyenne écossaise',      'Moyenne', 7.00, 2, 0.00, 'Un look traditionnel et chaleureux.',                  '39-42', 'Unisexe', 50, 'cho7-motif-3d-3.png',  'cho7-motif-portee-3.png',  NULL,  NULL),
('Chaussette longue losanges',        'Longue',  8.00, 2, 0.00, 'Style géométrique pour se démarquer.',                 '39-42', 'Unisexe', 50, 'cho7-motif-3d-4.png',  'cho7-motif-portee-4.png',  NULL, NULL),
('Chaussette longue Damier',          'Longue',  8.00, 2, 0.00, 'Pour un look streetwear assumé.',                      '39-42', 'Unisexe', 50, 'cho7-motif-3d-5.png',  'cho7-motif-portee-5.png',  NULL, NULL),
('Chaussette longue éclairs',         'Longue',  8.00, 2, 0.00, 'Mettez de l''énergie dans vos pas.',                  '39-42', 'Unisexe', 50, 'cho7-motif-3d-6.png',  'cho7-motif-portee-6.png',  NULL, NULL),
('Chaussette courte cassette',        'Courte',  6.00, 2, 0.00, 'Nostalgie des années 80 et 90.',                       '39-42', 'Unisexe', 50, 'cho7-motif-3d-7.png',  'cho7-motif-portee-7.png',  NULL,  NULL),
('Chaussette longue tableau',         'Longue',  8.00, 2, 0.00, 'Une œuvre d''art à vos pieds.',                        '39-42', 'Unisexe', 50, 'cho7-motif-3d-8.png',  'cho7-motif-portee-8.png',  NULL,  NULL),
('Chaussette longue Sushis',          'Longue',  8.00, 2, 0.00, 'Pour les gourmands et fans du Japon.',                 '39-42', 'Unisexe', 50, 'cho7-motif-3d-9.png',  'cho7-motif-portee-9.png',  NULL,  NULL),
('Chaussette longue rayée',           'Longue',  8.00, 2, 0.00, 'Les rayures, ça marche à tous les coups.',             '39-42', 'Unisexe', 50, 'cho7-motif-3d-10.png', 'cho7-motif-portee-10.png', NULL,  NULL),

/* 3. Chaussettes Memes */
('Chaussette longue trollface',             'Longue',  8.00, 3, 0.00, 'Problem ? Affichez votre côté troll.',                       '39-42', 'Unisexe', 50, 'cho7-meme-3d-1.png',  'cho7-meme-portee-1.png',  'Noir/Blanc',  NULL),
('Chaussette moyenne Nyancat',              'Moyenne', 7.00, 3, 0.00, 'Un arc-en-ciel d''humour vintage.',                          '39-42', 'Unisexe', 50, 'cho7-meme-3d-2.png',  'cho7-meme-portee-2.png',  NULL,      NULL),
('Chaussette moyenne doge',                 'Moyenne', 7.00, 3, 0.00, 'Such chaussette. Very wow.',                                  '39-42', 'Unisexe', 50, 'cho7-meme-3d-3.png',  'cho7-meme-portee-3.png',  NULL, NULL),
('Chaussette moyenne keyboard cat',         'Moyenne', 7.00, 3, 0.00, 'Play him off, Keyboard Cat !',                               '39-42', 'Unisexe', 50, 'cho7-meme-3d-4.png',  'cho7-meme-portee-4.png',  NULL, NULL),
('Chaussette longue poing',                 'Longue',  8.00, 3, 0.00, 'Le fameux poing d''Arthur, pour les jours frustrants.',      '39-42', 'Unisexe', 50, 'cho7-meme-3d-5.png',  'cho7-meme-portee-5.png',  NULL, NULL),
('Chaussette longue isthisapigeon',         'Longue',  8.00, 3, 0.00, 'Est-ce une chaussette ?',                                    '39-42', 'Unisexe', 50, 'cho7-meme-3d-6.png',  'cho7-meme-portee-6.png',  NULL, NULL),
('Chaussette longue pokemon',               'Longue',  8.00, 3, 0.00, 'Surprise Pikachu !',                                         '39-42', 'Unisexe', 50, 'cho7-meme-3d-7.png',  'cho7-meme-portee-7.png',  NULL, NULL),
('Chaussette longue jeu',                   'Longue',  8.00, 3, 0.00, 'Vous venez de perdre au jeu.',                               '39-42', 'Unisexe', 50, 'cho7-meme-3d-8.png',  'cho7-meme-portee-8.png',  NULL, NULL),
('Chaussettes longue Gigachad',             'Longue',  8.00, 3, 0.00, 'Pour une démarche de pur alpha.',                            '39-42', 'Unisexe', 50, 'cho7-meme-3d-9.png',  'cho7-meme-portee-9.png',  NULL,  NULL),
('Chaussettes moyenne stonks',              'Moyenne', 7.00, 3, 0.00, 'Un investissement très rentable pour vos pieds.',            '39-42', 'Unisexe', 50, 'cho7-meme-3d-10.png', 'cho7-meme-portee-10.png', NULL, NULL),


/* Variantes*/
('Chaussette courte olive', 'Courte', 5.00, 1, 0.00, 'De belles chaussettes roses, parfaites pour l''été.', '39-42', 'Unisexe', 50, 'cho7-uni-3d-1-variante.png', 'cho7-uni-portee-1.png', 'Olive', 1),
('Chaussette moyenne à pois gris et marron', 'Moyenne', 7.00, 2, 0.00, 'Un classique indémodable avec ces jolis pois.', '39-42', 'Unisexe', 50, 'cho7-motif-3d-1-variante.png', 'cho7-motif-portee-1.png', 'Gris/Marron', 11),
('Chaussette longue trollface orange et bleue', 'Longue', 8.00, 3, 0.00, 'Problem ? Affichez votre côté troll.', '39-42', 'Unisexe', 50, 'cho7-meme-3d-1-variante.png', 'cho7-meme-portee-1.png', 'Orange/Bleu', 21);