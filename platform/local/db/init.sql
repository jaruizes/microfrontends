--- CUSTOMERS
CREATE SCHEMA customers;
CREATE TABLE customers.customers
(
    id varchar(5) NOT NULL,
    name varchar(100) NOT NULL,
    CONSTRAINT customers_pkey PRIMARY KEY(id)
);

CREATE TABLE customers.movements
(
    id integer NOT NULL,
    date DATE NOT NULL,
    subject varchar(100) NOT NULL,
    customer_id varchar(5) NOT NULL,
    amount double precision NOT NULL,
    CONSTRAINT movements_pkey PRIMARY KEY (id)
);


INSERT INTO customers.customers(id, name) VALUES('0001', 'FERNANDO ALONSO RODRIGUEZ');
INSERT INTO customers.customers(id, name) VALUES('0002', 'PEPE ALONSO RODRIGUEZ');

INSERT INTO customers.MOVEMENTS(id, date, subject, customer_id, amount)
VALUES(1, '2020-12-01', 'Build new one', '0001', 500);
INSERT INTO customers.MOVEMENTS(id, date, subject, customer_id, amount)
VALUES(2, '2020-12-02', 'Deployment to Openshift', '0001', 50);
INSERT INTO customers.MOVEMENTS(id, date, subject, customer_id, amount)
VALUES(3, '2020-12-03', 'Build new version', '0001', 100);

INSERT INTO customers.MOVEMENTS(id, date, subject, customer_id, amount)
VALUES(4, '2020-12-01', 'Build new one', '0002', 500);
INSERT INTO customers.MOVEMENTS(id, date, subject, customer_id, amount)
VALUES(5, '2020-12-02', 'Deployment to Openshift', '0002', 50);
INSERT INTO customers.MOVEMENTS(id, date, subject, customer_id, amount)
VALUES(6, '2020-12-03', 'Build new version', '0002', 100);

--- ACCOUNTS
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

CREATE TABLE accounts.movements
(
    id integer NOT NULL,
    date DATE NOT NULL,
    subject varchar(100) NOT NULL,
    account_id integer NOT NULL,
    amount double precision NOT NULL,
    CONSTRAINT movements_pkey PRIMARY KEY (id)
);

INSERT INTO accounts.ACCOUNTS(id, iban, name, holder, balance, customer)
VALUES(1, 'ES4220951513804894195824', 'MICROSERVICIOS 1,2,3', 'FERNANDO ALONSO RODRIGUEZ', 1000, '0001');

INSERT INTO accounts.ACCOUNTS(id, iban, name, holder, balance, customer)
VALUES(2, 'ES4220951513804894195824', 'CONFLUENT', 'FERNANDO ALONSO RODRIGUEZ', 9000, '0001');

INSERT INTO accounts.MOVEMENTS(id, date, subject, account_id, amount)
VALUES(1, '2020-12-01', 'Build new one', 1, 500);
INSERT INTO accounts.MOVEMENTS(id, date, subject, account_id, amount)
VALUES(2, '2020-12-02', 'Deployment to Openshift', 1, 50);
INSERT INTO accounts.MOVEMENTS(id, date, subject, account_id, amount)
VALUES(3, '2020-12-03', 'Build new version', 1, 100);

INSERT INTO accounts.MOVEMENTS(id, date, subject, account_id, amount)
VALUES(4, '2020-12-01', 'Build new one', 2, 500);
INSERT INTO accounts.MOVEMENTS(id, date, subject, account_id, amount)
VALUES(5, '2020-12-02', 'Deployment to Openshift', 2, 50);
INSERT INTO accounts.MOVEMENTS(id, date, subject, account_id, amount)
VALUES(6, '2020-12-03', 'Build new version', 2, 100);

--- CARDS

CREATE SCHEMA cards;
CREATE TABLE cards.cards
(
    id integer NOT NULL,
    type varchar(1) NOT NULL,
    number varchar(24) NOT NULL,
    name varchar(100) NOT NULL,
    expires varchar(5) NOT NULL,
    balance double precision NOT NULL,
    customer varchar(4) NOT NULL,
    CONSTRAINT cards_pkey PRIMARY KEY (id)
);

CREATE TABLE cards.movements
(
    id integer NOT NULL,
    date DATE NOT NULL,
    subject varchar(100) NOT NULL,
    card_id integer NOT NULL,
    amount double precision NOT NULL,
    CONSTRAINT movements_pkey PRIMARY KEY (id)
);

INSERT INTO cards.CARDS(id, type, number, name, expires, balance, customer)
VALUES(1, '0', '5415696978599473', 'TARJETA 1,2,3', '10/24', 1000, '0001');

INSERT INTO cards.CARDS(id, type, number, name, expires, balance, customer)
VALUES(2, '1', '5415696978599474', 'TARJETA CREDITO', '10/24', 1000, '0001');

INSERT INTO cards.MOVEMENTS(id, date, subject, card_id, amount)
VALUES(1, '2020-12-01', 'Build new one', 1, 500);
INSERT INTO cards.MOVEMENTS(id, date, subject, card_id, amount)
VALUES(2, '2020-12-02', 'Deployment to Openshift', 1, 50);
INSERT INTO cards.MOVEMENTS(id, date, subject, card_id, amount)
VALUES(3, '2020-12-03', 'Build new version', 1, 100);

INSERT INTO cards.MOVEMENTS(id, date, subject, card_id, amount)
VALUES(4, '2020-12-01', 'Build new one', 2, 500);
INSERT INTO cards.MOVEMENTS(id, date, subject, card_id, amount)
VALUES(5, '2020-12-02', 'Deployment to Openshift', 2, 50);
INSERT INTO cards.MOVEMENTS(id, date, subject, card_id, amount)
VALUES(6, '2020-12-03', 'Build new version', 2, 100);



