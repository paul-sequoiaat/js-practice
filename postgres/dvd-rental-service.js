const { queryDb } = require("./db-utils")

const getAllActors = async() => {
    try {
        const rows = await queryDb(
            `SELECT * FROM actor`
        );
        console.log(rows);
    } catch (err) {
        console.log(`ERROR ${err}`);
    }
}

const getFilmDetailsForAnyActor = async() => {
    try {
        const rows = await queryDb(
            `SELECT f.title AS movie, f.release_year as "release year" 
            FROM film f
            INNER JOIN film_actor fa
            ON f.film_id = fa.film_id
            INNER JOIN actor a
            ON a.actor_id = fa.actor_id
            WHERE a.actor_id = (
	            SELECT actor_id FROM actor
	            ORDER BY RANDOM()
	            LIMIT 1
            )`
        );
        console.log(rows);
    } catch (err) {
        console.log(`ERROR ${err}`);
    }
}

const getActorDetailsForAnyFilm = async() => {
    try {
        const rows = await queryDb(
            `SELECT CONCAT(a.first_name, ' ', a.last_name) AS actor 
            FROM actor a
            INNER JOIN film_actor fa
            ON fa.actor_id = a.actor_id
            INNER JOIN film f
            ON f.film_id = fa.film_id
            WHERE f.film_id = (
	            SELECT film_id FROM film
	            ORDER BY RANDOM()
	            LIMIT 1
            )`
        );
        console.log(rows);
    } catch (err) {
        console.log(`ERROR ${err}`);
    }
}
