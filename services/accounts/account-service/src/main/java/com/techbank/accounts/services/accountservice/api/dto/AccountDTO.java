package com.techbank.accounts.services.accountservice.api.dto;

import java.io.Serializable;
import java.util.List;

public class AccountDTO implements Serializable {

    private Integer id;
    private String name;
    private String holder;
    private String iban;
    private Double balance;
    private MovementsDTO movements;

    private AccountDTO(final Integer id, final String name, final String holder, final String iban, final Double balance, final MovementsDTO movements) {
        this.id = id;
        this.name = name;
        this.holder = holder;
        this.iban = iban;
        this.balance = balance;
        this.movements = movements;
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

    public Double getBalance() {
        return balance;
    }

    public MovementsDTO getMovements() {
        return movements;
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
            return new AccountDTO(this.id, this.name, this.holder, this.iban, this.balance, new MovementsDTO(this.movements));
        }
    }
}
