-- Table: public.accounts

-- DROP TABLE public.accounts;

CREATE TABLE public.accounts
(
    id integer NOT NULL,
    iban "char" NOT NULL,
    name "char" NOT NULL,
    holder "char" NOT NULL,
    balance double precision NOT NULL,
    lastmovement "char" NOT NULL,
    newmovements integer NOT NULL,
    customer "char" NOT NULL,
    CONSTRAINT accounts_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.accounts
    OWNER to techbank;


INSERT INTO ACCOUNTS(id, iban, name, holder, balance, lastmovement, newmovements, customer)
VALUES(1, 'ES4220951513804894195823', 'MICROSERVICIOS 1,2,3', 'FERNANDO ALONSO RODRIGUEZ', 1000, '3 days ago', 5, '0001');
