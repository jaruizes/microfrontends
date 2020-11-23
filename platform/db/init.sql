CREATE SCHEMA accounts;
CREATE TABLE accounts.accounts
(
    id integer NOT NULL,
    iban varchar(24) NOT NULL,
    name varchar(100) NOT NULL,
    holder varchar(100) NOT NULL,
    balance double precision NOT NULL,
    customer varchar(4) NOT NULL,
    CONSTRAINT accounts_pkey PRIMARY KEY (id)
);

INSERT INTO accounts.ACCOUNTS(id, iban, name, holder, balance, customer)
VALUES(1, 'ES4220951513804894195824', 'MICROSERVICIOS 1,2,3', 'FERNANDO ALONSO RODRIGUEZ', 1000, '0001');
