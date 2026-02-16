# RESTRUKTUALIZACE WEBOVÝCH STRÁNEK
Použité technologie:
        - React
        - TailWindCSS
        - NodeJS

> [!IMPORTANT]
> Nejdříve udělat databázi

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

Pokud bude problém s portem, tak se podívat do server.js na origin: 'http://localhost:5173' a změnit port

Spuštění backendu: cd backend, node server.js

DB návrh: https://community.dbdiagram.io/t/upgrade-for-database-relationships-zero-to-one-many-relationships-colors-and-more/4184?utm_source=dbdiagram&utm_medium=ads


Jak budou fungovat pásky:
- bude tabulka na pásky, kde budou hodnoty jako je ID, img, korean_name, czech_name (cup), price...
- devidery a závodníci budou podle toho id

Nechá se tam někde udělat dynamické routování, tak se na to podívat

Rozdělení závodníků do kategorií -> junior, senior, veterán... podle věku

Uživatelské účty bude moci vytvářet trenér + administrátor
U těch závodníků potřebuju, aby se to zobrazovalo podle id - různě

# Vazby v DB
- jeden fighter může mít jeden pásek, jeden pásek může mít více fighterů => **1:N**
- jeden fighter může být přihlášen na více akcí, akce mohou mít více fighterů => **M:N**
- uživatel může mít jednu roli, role může mít více uživatelů => **1:N**


Kategorie - jeden fighter má jednu kategorii a kategorie připadá více fighterům
Články, akce, závody - založeny jedním uživatelem, více článků může patřit jednomu uživateli => **1:N**
Login, email, telefonní číslo => **1:1**
Fotky k akcím - více fotek patří k jedné akci, k jedné akci patří více fotek...

Vymyslet jak udělám úspěchy 

# FRONTEND
- doladit responzivitu
- dodělat všechny sekce
- vybrat a aplikovat font
- dodělat všechno na karty

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
- udělat jednotné styly - c tailwindCss.cfg zkusit udělat nějakou jednotnou class
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