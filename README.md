# RESTRUKTUALIZACE WEBOVÝCH STRÁNEK
Použité technologie:
        - React
        - TailWindCSS
        - NodeJS



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


Komentář:
{/*  */}

Pokud bude problém s portem, tak se podívat do server.js na origin: 'http://localhost:5173' a změnit port

Spuštění backendu: cd backend, node server.js

DB návrh: https://community.dbdiagram.io/t/upgrade-for-database-relationships-zero-to-one-many-relationships-colors-and-more/4184?utm_source=dbdiagram&utm_medium=ads

TODO: upravit buttony a udělat nějaký univerzální 

TODO: upravit readME - naformátovat
TODO: na kartě zavodnici upravit devider na pásky
TODO: pořád upravit TURNAJE
TODO: upravit footer 
TODO: nadefinovat si nějaké classy v TailWindCSS configu
TODO: pořešit modal přes mapu v kontaktech
TODO: upravit responzivitu
TODO: vzít si inspiraci a udělat shadow jako mám u newsletter shadow-xl border-2

TODO: u pásků udělat menu na pásky na levé straně, jakože sloupec

TODO: upravit Detail.jsx


TODO: udělat jednotné styly - c tailwindCss.cfg zkusit udělat nějakou jednotnou class

TODO: nápad je že poté co se všichni závnodnící přihlásí na turnaj, tak si to trenér bude moci vyexportovat a poté zde nahrát ten soubor a ten mu uloží statisitky

TODO: makat a dělat backend

TODO: musím udělat základ backendu, minimálně login
TODO: dále musím udělat admin layout

TODO: devider je vlastně div, který má classu devider
TODO: udělat více responzivní kartu na turnaje - při určité šířce se nebude zobrazovat fotografie

TODO: Upravit komponentu pásky - ať se zobrazují vedle sebe a všechny

TODO: udělat ten login
TODO: když bude novinka z turnaje, tak tam budou závodníci, kteří se zúčastnili

TODO: udělat vazby v DB a navrhnou finální řešení db
TODO: při vytváření uživatele zadat datum narození


Jak budou fungovat pásky:
- bude tabulka na pásky, kde budou hodnoty jako je ID, img, korean_name, czech_name (cup), price...
- devidery a závodníci budou podle toho id

