package com.techbank.accounts.services.accountservice.business.model;

public class Account {
    private int id;
    private String iban;
    private String holder;
    private String name;
    private double balance;

    public Account(final int id, final String iban, final String holder, final String name, final double balance) {
        this.id = id;
        this.iban = iban;
        this.holder = holder;
        this.name = name;
        this.balance = balance;
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

    public static class Builder {
        private int id;
        private String iban;
        private String holder;
        private String name;
        private double balance;

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

        public Account build() {
            return new Account(this.id, this.iban, this.holder, this.name, this.balance);
        }
    }
}
