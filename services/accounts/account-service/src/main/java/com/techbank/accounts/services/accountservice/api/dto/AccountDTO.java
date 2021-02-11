package com.techbank.accounts.services.accountservice.api.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Random;

public class AccountDTO implements Serializable {

    private Integer id;
    private String name;
    private String holder;
    private String iban;
    private Double amount;
    private Integer newmovements;
    private List<MovementDTO> movements;

    private AccountDTO(final Integer id, final String name, final String holder, final String iban, final Double amount, final List<MovementDTO> movements) {
        this.id = id;
        this.name = name;
        this.holder = holder;
        this.iban = iban;
        this.amount = amount;
        this.movements = movements;

        Random rand = new Random();
        this.newmovements = rand.nextInt(10);
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getHolder() {
        return holder;
    }

    public String getIban() {
        return iban;
    }

    public Double getAmount() {
        return amount;
    }

    // TODO: Fix apps in order to unify API
    public Double getBalance() {
        return amount;
    }

    public String getNumber() {
        return iban;
    }

    public List<MovementDTO> getMovements() {
        return movements;
    }

    public Integer getNewmovements() {
        return newmovements;
    }

    public static class Builder {
        private int id;
        private String iban;
        private String holder;
        private String name;
        private double balance;
        private List<MovementDTO> movements;

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

        public Builder withMovements(List<MovementDTO> movements) {
            this.movements = movements;
            return this;
        }

        public AccountDTO build() {
            return new AccountDTO(this.id, this.name, this.holder, this.iban, this.balance, this.movements);
        }
    }
}
