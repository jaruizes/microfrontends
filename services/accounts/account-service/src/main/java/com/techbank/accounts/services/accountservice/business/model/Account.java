package com.techbank.accounts.services.accountservice.business.model;

import java.util.List;

public class Account {
    private int id;
    private String iban;
    private String holder;
    private String name;
    private double balance;
    private List<Movement> movements;

    public Account(final int id, final String iban, final String holder, final String name, final double balance, List<Movement> movements) {
        this.id = id;
        this.iban = iban;
        this.holder = holder;
        this.name = name;
        this.balance = balance;
        this.movements = movements;
    }

    public int getId() {
        return id;
    }

    public String getIban() {
        return iban;
    }

    public String getHolder() {
        return holder;
    }

    public String getName() {
        return name;
    }

    public double getBalance() {
        return balance;
    }

    public List<Movement> getMovements() {
        return movements;
    }

    public static class Builder {
        private int id;
        private String iban;
        private String holder;
        private String name;
        private double balance;
        private List<Movement> movements;

        public Builder(int id){
            this.id = id;
        }

        public Builder withIBAN(String iban) {
            this.iban = iban;
            return this;
        }

        public Builder withHolder(String holder) {
            this.holder = holder;
            return this;
        }

        public Builder withName(String name) {
            this.name = name;
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

        public Account build() {
            return new Account(this.id, this.iban, this.holder, this.name, this.balance, this.movements);
        }
    }
}
