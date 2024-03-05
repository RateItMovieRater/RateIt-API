-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.movies
(
    id bigserial NOT NULL,
    title character(100) NOT NULL,
    "releaseDate" date NOT NULL,
    description character(400) NOT NULL,
    genre character(20) NOT NULL,
    runtime character(100),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.crew_member
(
    id bigserial NOT NULL,
    name character(20) NOT NULL,
    "jobTitle" character(20) NOT NULL,
    picture character(100),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.movies_crew_member
(
    movies_id bigserial NOT NULL,
    crew_id bigserial NOT NULL
);

CREATE TABLE IF NOT EXISTS public.rating
(
    id bigserial NOT NULL,
    rate integer NOT NULL,
    title character(30),
    comment character(200),
    user_id integer NOT NULL,
    movie_id integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id bigserial NOT NULL,
    name character(30) NOT NULL,
    login character(15) NOT NULL,
    password character(20) NOT NULL,
    "isAdmin" boolean NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.movies_crew_member
    ADD FOREIGN KEY (movies_id)
    REFERENCES public.movies (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.movies_crew_member
    ADD FOREIGN KEY (crew_id)
    REFERENCES public.crew_member (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.rating
    ADD CONSTRAINT movie_id FOREIGN KEY (movie_id)
    REFERENCES public.movies (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.rating
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;
