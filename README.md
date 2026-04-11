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

DB návrh: https://community.dbdiagram.io/t/upgrade-for-database-relationships-zero-to-one-many-relationships-colors-and-more/4184?utm_source=dbdiagram&utm_medium=ads


- icons : https://lucide.dev/icons/

# TODO
- upravit šířku mainContact componenty
- upravit buttony a udělat nějaký univerzální 
- na kartě zavodnici upravit devider na pásky
- pořád upravit TURNAJE
- nadefinovat si nějaké classy v TailWindCSS configu
- pořešit modal přes mapu v kontaktech
- upravit responzivitu
- vzít si inspiraci a udělat shadow jako mám u newsletter shadow-xl border-2
- u pásků udělat menu na pásky na levé straně, jakože sloupec
- udělat jednotné styly - v tailwindCss.cfg zkusit udělat nějakou jednotnou class
- nápad je že poté co se všichni závnodnící přihlásí na turnaj, tak si to trenér bude moci vyexportovat a poté zde nahrát ten soubor a ten mu uloží statisitky
- musím udělat základ backendu, minimálně login
- udělat více responzivní kartu na turnaje - při určité šířce se nebude zobrazovat fotografie
- když bude novinka z turnaje, tak tam budou závodníci, kteří se zúčastnili
- udělat vazby v DB a navrhnou finální řešení db
- upravit strukturu server.js


> [!IMPORTANT] Zadání BP
Cílem bakalářské práce je kompletní rekonstrukce webových stránek oddílu Taekwondo Lacek. Aktuální webové stránky jsou již velmi zastaralé, jak designově, tak i z hlediska funkčnosti. Změny se budou týkat především modernizace designu, zlepšení responzivity a přidání klíčových funkcí pro zajištění všech potřebných funkcionalit jako je přihlašování závodníků na akce či zkoušky, zobrazení kalendáře, ve kterém budou uvedeny termíny jednotlivých akcí. Dále bude přidán registrační formulář pro nové zájemce o členství v oddílu, implementována galerie obrázků, přidány odkazy na sociální sítě a zpřehledněna navigace.


Classy
- jsou v index.css

rounded-2xl

Na Linuxu
- http://localhost:8000/phpmyadmin/index.php


# SPUŠTĚNÍ 
Frontend - cd .\Frontend\ - npm run dev
Backend - cd  .\Backend\ - node server.js


# DEBUGGING
- klasickej scénář ... uživatel se přihlásí na profil a na turnaj, co se potom stane
- co se stane po proběhnutí turnaje
- AdminTurnaje - po uzávěrce - nejde se přihlásit jako závodník, dát tam přidání výsledků pro ty závodníky, kteří se zúčastnili
- upravit responzivitu v adminu


src={`${API}${banner.img_path}`}

# PRAKTICKÁ ČÁST
---------------------------------------------------------------------------
# CO MUSÍM UDĚLAT
- do admin/me přidat nějaké info pole, které bude informovat, že pokud není přidělený uživatelský účet, tak že nějaký informace nepůjdou editovat a že nebude možné se přihlásit na turnje a zkoušky
- restruktualizace kodu - classy, názvy a tak
- editace zkousky
- ikonky nejsou statické nebo tak
- možná se podívat na datum a validace formuláře
- search bar jako utilka
- když něco smažu tak indexace v db od 1.

# TEXTOVÁ ČÁST POZNÁMKY
---------------------------------------------------------------------------
# DO TEXTOVÉ ČÁSTI PŘIDAT
- porovnání s aktuální webovou stránkou - dát tam screen o špatné responzivitě
- porovnání s ostatníma webama
- kapitola o testování - debugging
- něco o registraci
- něco o kalendáři akcí 
- přidávání úspěchů závodníkům - tohle musím spíš dopsat
- upravit ty tabulky - mám jiné a tabulka subscriber_email nebude
- možná vyjebat body u Definice webových stránek a u současných trendů
- upravit obrázek u Tailwindu, aby tam bylo něco více vidět
- zkontrolovat si, že nikde nepíšu nic o newsletteru
- prostě připsat ty tabulky a zkontrolovat si diagram (obrázek)
- dát si pozor na zkoušky v kalednáři

- od každé části jednu ukázku ... obecný přehled, admin menu eventuelně kalendář

active record aka raw sql

téma je nějaký to modern light nebo tak


Oprava data narození
--------------------
ALTER TABLE fighters 
MODIFY birth DATE NULL DEFAULT NULL;

# Textová část - ukázka komponenty
Komponenta zkoušky slouží jako hlavní kontejner ve kterém jsou naimportovány jednotlivé menší komponenty, které jsou společně propojené a které dohromady tvoří funkční celek pro zobrazení zkoušek uživateli.

Stránku tvoří tabulka s přehledem pásků obsahující informace o názvu pásku, třídě danu či cupu, ceně za zkoušku na jednotlivý technický stupeň a obrázek pásku.
Pod tabulkou se nachází sekce, která se dynamicky mění na zákldě vybraného technického stupně. Sekce je složená z komponenty Video a SestavyInfo. Komponenta video se vykresluje pokud má daný technický stupeň v databázi uložený odkaz na video. Klíčové pojmy k jednotlivým sestavám vykresluje komponenta SestavyInfo.

Dynamické vykreslování je realizováno pomocí useState logiky, která pracuje s informacemi o aktuálně zvoleném technickém stupni. Výchozí hodnota je nastavena na null, což zajišťuje, že při prvotním načtení stránky nebude vybrán žádný technický stupeň a tím pádem nebudou vykreslovány komponenty Video a SestavyInfo.

Ukázat responzivitu

Zkontrolovat si ty písmenka na konci řádku, plevelová slova 