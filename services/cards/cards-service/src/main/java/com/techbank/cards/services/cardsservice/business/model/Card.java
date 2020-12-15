package com.techbank.cards.services.cardsservice.business.model;

import java.util.List;

public class Card {
    private int id;
    private String type;
    private String number;
    private String name;
    private String expires;
    private double balance;
    private String customer;
    private List<Movement> movements;

    public Card(final int id, final String type, final String number, final String name, final String expires, final double balance, final String customer, final List<Movement> movements) {
        this.id = id;
        this.type = type;
        this.number = number;
        this.name = name;
        this.expires = expires;
        this.balance = balance;
        this.customer = customer;
        this.movements = movements;
    }

    public int getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getNumber() {
        return number;
    }

    public String getName() {
        return name;
    }

    public String getExpires() {
        return expires;
    }

    public double getBalance() {
        return balance;
    }

    public String getCustomer() {
        return customer;
    }

    public List<Movement> getMovements() {
        return movements;
    }

    public static class Builder {
        private int id;
        private String type;
        private String number;
        private String name;
        private String expires;
        private double balance;
        private String customer;
        private List<Movement> movements;

        public Builder(int id){
            this.id = id;
        }

        public Builder withNumber(String number) {
            this.number = number;
            return this;
        }

        public Builder withType(String type) {
            this.type = type;
            return this;
        }

        public Builder withName(String name) {
            this.name = name;
            return this;
        }

        public Builder withCustomer(String customer) {
            this.customer = customer;
            return this;
        }

        public Builder withExpires(String expires) {
            this.expires = expires;
            return this;
        }

        public Builder withBalance(double balance) {
            this.balance = balance;
            return this;
        }

        public Builder withMovements(List<Movement> movements) {
            this.movements = movements;
            return this;
        }

        public Card build() {
            return new Card(this.id, this.type, this.number, this.name, this.expires, this.balance, this.customer, this.movements);
        }
    }
}
