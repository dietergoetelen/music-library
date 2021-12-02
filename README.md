# Opdracht IT Topics 3

Music Library is een applicatie waar je artiesten met hun liedjes via een API kan beheren.

## Installatie

Dependencies kunnen als volgt geinstalleerd worden.

```sh
npm ci
```

Het project bevat twee scripts die uitegevoerd kunnen worden:

- Tests

```sh
npm run test
```

- Development server

```sh
npm run start
```

_API is vervolgens beschikbaar op http://localhost_

## Oefening

Het is uw taak als developer om deze API verder te vervoledigen. De API bevat verschillende E2E tests die momenteel falen en verder geimplementeerd moeten worden.

De API bestaat uit twee delen:

- `/api/artists/*`: verantwoordelijk voor het beheren van artiesten. Alle relevante code voor het beheren van artiesten wordt geplaatst in `./src/artists.js`
- `/api/artists/:artistId/songs/*`: verantwoordelijk voor het beheren van liedjes van bepaalde artiesten. Alle relevante code voor het beheren van liedjes wordt geplaatst in `./src/songs.js`

Er wordt gebruik gemaakt van een `in-memory` database. Alle operaties doe je rechtstreeks op het `db` object. Bijvoorbeeld, als je een artiest wilt toevoegen kan je deze pushen op de bestaande `artists` array in `./src/db/index.js`

```js
const db = require("./db");

db.artists.push({
  id: "1",
  name: "Bon Scott",
});
```

> Interessante operaties
>
> ```js
> // Find artist by id
> const singleArtist = db.artists.find((artist) => artist.id === id);
>
> // Filter out artist (delete by ID)
> db.artists = db.artists.filter((artist) => artist !== id);
> ```

## Artists

Je kan stap voor stap controleren of je feature werkt. Elke test kan independent getriggered worden om te valideren of uw implementatie klopt. Run na elke implementatie de nodige tests.

![running-tests](https://user-images.githubusercontent.com/1385245/144660555-4352e88d-7ead-46d1-a813-6547fa18c9ac.gif)

Je kan met `.only` aanduiden welke test je wil runnen. Zo hoef je niet telkens te wachten op alle falende tests.

**Test 1**

```
GET http://localhost:3000/api/artists
```

Expected result: Lijst van alle artiesten

**Test 2**

```
GET http://localhost:3000/api/artists/1
```

Expected result: 1 Artiest met ID 1 als deze bestaat, anders 404 not found

**Test 3**

```
POST http://localhost:3000/api/artists
{
  "name": "Bon Scott",
  "id": "1"
}
```

Expected result: Artiest aangemaakt met naam Bon Scott.

Een ID is uniek, als we deze request nog eens uitvoeren verwachten we een error

**Test 4**

```
PUT http://localhost:3000/api/artists/1
{
  "name": "Bon Scott"
}
```

Als de artiest met ID 1 bestaat zou deze aangepast moeten worden naar naam "Bon Scott".
Als de artiest niet bestaat wordt er een 404 not found error terug gestuurd.

**Test 5**

```
DELETE http://localhost:3000/api/artists/1
```

Als de artiest met ID 1 bestaat wordt deze verwijderd, anders wordt er een error gethrowed.

## Songs

In tegenstelling is er voor songs nog niets geimplementeerd buiten de tests. Er bestaan nog geen routes, deze dien je zelf aan te maken. Denk er aan dat er verschillende manieren zijn om routes te definieren.

```js
router.get("/api/my-route", (req, res) => {
  res.send("Hello World");
});

// vs

router.get("/api/my-route", helloWorld);

function helloWorld(req, res) {
  res.send("Hello World");
}
```

Het is aan jouw de keuze om te kiezen voor inline vs function. Het is belangrijk dat je beide methodes beheerst.
De nodige test cases vind je terug in `./tests/songs.test.js`.

![image](https://user-images.githubusercontent.com/1385245/144661193-f3fdf166-8333-4c94-92eb-f49779003282.png)

Belangrijk om weten is dat deze test cases strictere geimplementeerd zijn dan voor artists, zo worden niet gekende properties bijvoorbeeld genegeerd zoals beschreven in test **should map only valid properties**.

## Summary

- Je mag enkel aanpassingen doen in `./src/artists.js` en `./src/songs.js`. Het is niet de bedoeling om tests te gaan aanpassen/toevoegen. Deze zijn voor u toegevoegd om te controleren of uw implementatie werkt.
- De opdracht is geslaagd als alle tests groen zijn
