# RESTRUKTUALIZACE WEBOVÝCH STRÁNEK
Použité technologie:
        - React
        - TailWindCSS
        - NodeJS

> [!IMPORTANT]
> Nejdříve udělat databázi

> upravit READ.ME

> [!TIP]
>Ikonky: https://icons8.com/icons/set/facebook


> [!TIP]
>Dokumentace k formátování: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

Barvy:

        GREEN:  `#01923E`
        BLACK:  `#181918`
        WHITE:  `#F8F0E5`


> [!IMPORTANT]
> Samotné stránky jsou v _/components_ a komponenty pro samotné stránky jsou v _/pages/nazev-stranky_

> [!CAUTION]
> Víc se podívat na teorii ohledně Reactu - hooky, routing...


Komentář:
{/*  */}

DB návrh: https://community.dbdiagram.io/t/upgrade-for-database-relationships-zero-to-one-many-relationships-colors-and-more/4184?utm_source=dbdiagram&utm_medium=ads


Nechá se tam někde udělat dynamické routování, tak se na to podívat

Rozdělení závodníků do kategorií -> junior, senior, veterán... podle věku

Uživatelské účty bude moci vytvářet trenér + administrátor
U těch závodníků potřebuju, aby se to zobrazovalo podle id - různě


# FRONTEND
- doladit responzivitu
- dodělat všechny sekce
- vybrat a aplikovat font
- dodělat všechno na karty
- icons : https://lucide.dev/icons/

# BACKEND
- udělat pevnou databázi
- udělat login
- přidání závodníků

# TODO
- upravit šířku mainContact componenty
- upravit buttony a udělat nějaký univerzální 
- upravit readME - naformátovat
- na kartě zavodnici upravit devider na pásky
- pořád upravit TURNAJE
- upravit footer 
- nadefinovat si nějaké classy v TailWindCSS configu
- pořešit modal přes mapu v kontaktech
- upravit responzivitu
- vzít si inspiraci a udělat shadow jako mám u newsletter shadow-xl border-2
- u pásků udělat menu na pásky na levé straně, jakože sloupec
- upravit Detail.jsx
- udělat jednotné styly - v tailwindCss.cfg zkusit udělat nějakou jednotnou class
- nápad je že poté co se všichni závnodnící přihlásí na turnaj, tak si to trenér bude moci vyexportovat a poté zde nahrát ten soubor a ten mu uloží statisitky
- musím udělat základ backendu, minimálně login
- udělat více responzivní kartu na turnaje - při určité šířce se nebude zobrazovat fotografie
- upravit komponentu pásky - ať se zobrazují vedle sebe a všechny
- udělat ten login
- když bude novinka z turnaje, tak tam budou závodníci, kteří se zúčastnili
- udělat vazby v DB a navrhnou finální řešení db
- při vytváření uživatele zadat datum narození
- u pásků 4. a 5. DAN odstranit bílé pozadí
- zavodnnici - bude se vypisovat devider s hodnotama a potom samotní závodníci
- upravit strukturu server.js
- malé písmo v headru
- header bude defaultně bílý a po scrollování se udělá zelené pozadí a text bude jako na cdn77
- udělat všude stejně velké mezery
- děje se to, že pokud nějaká komponenta nemá data, tak že se neloadí celá stránka


> [!IMPORTANT] Zadání BP
Cílem bakalářské práce je kompletní rekonstrukce webových stránek oddílu Taekwondo Lacek. Aktuální webové stránky jsou již velmi zastaralé, jak designově, tak i z hlediska funkčnosti. Změny se budou týkat především modernizace designu, zlepšení responzivity a přidání klíčových funkcí pro zajištění všech potřebných funkcionalit jako je přihlašování závodníků na akce či zkoušky, zobrazení kalendáře, ve kterém budou uvedeny termíny jednotlivých akcí. Dále bude přidán registrační formulář pro nové zájemce o členství v oddílu, implementována galerie obrázků, přidány odkazy na sociální sítě a zpřehledněna navigace.

MUST HAVE
- [ ] zlepšit design
- [ ] responzivita
- [ ] kalendář
- [ ] carousel
- [ ] login
- [ ] api mapa
- [ ] víc se podívat na JWT - občas můžu na admin stránky i bez přihlášení



Classy
- jsou v index.css


rounded-2xl

Na Linuxu
- http://localhost:8000/phpmyadmin/index.php


-- 1. Vytvoř tabulku event_photos pokud neexistuje
CREATE TABLE IF NOT EXISTS `event_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `event_photos_ibfk_1` 
    FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2. Zkontroluj zda tabulka existuje
SHOW TABLES LIKE 'event_photos';

Udělat to aby se aktualita nechala vytvořit z proběhlé akce, přenesou se závodníci, vyřešit fotografie, první - úvodní fotografie

Backend
- Routy
- API -> RestAPI pricipy (GET, POST, PUT, DELETE)
- JWT, hashing (ByCript)



# SPUŠTĚNÍ 
Frontend - cd .\Frontend\ - npm run dev
Backend - cd  .\Backend\ - node server.js


# TASKS
- udělat úspěchy pro závodníky
- udělat detaily akcí, turnajů...
- zprovoznit newsletter
- v adminu to rozdělit na to co uživatel vidí a co ne
- přihlášení na zkoušky a turnaje
- upravit aktuality - search bar, řazení podle data
- upravit zkoušky - rozložení, klíčové pojmy
- karty pro turnaje
- závodníci - předělat

# CO MUSÍM UDĚLAT
- detail akcí, závodníků...
- intra doladit -> ty cesty 
- pořešit zkoušky
- vyřešit vytváření účtu
- projít ty soubory a smazat komentáře
- udělat formulář na registraci - když uživatel vyplní registrační formulář, tak to padne v administraci do položky žádosti o členství


# DEBUGGING
- upravit to, že jeden závodník může mít jenom jeden účet
- opravit searchbar v administraci v závodníkách