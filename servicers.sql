CREATE TABLE public.servicers
(
    servicer_id SERIAL NOT NULL,
    servicer_name character varying(255) NOT NULL,
    servicer_address character varying(255) NOT NULL,
    latitude character varying(15) NOT NULL,
    longitude character varying(15) NOT NULL,
    PRIMARY KEY (servicer_id)
)
WITH (
    OIDS = FALSE
);

INSERT INTO public.servicers (servicer_name, servicer_address, latitude, longitude)
VALUES ('VCA Pļavnieki', 'Andreja Saharova iela 16', '56.9384379', '24.204703'),
('VCA Aura', 'Nīcgales iela 5', '56.958104', '24.1755274');