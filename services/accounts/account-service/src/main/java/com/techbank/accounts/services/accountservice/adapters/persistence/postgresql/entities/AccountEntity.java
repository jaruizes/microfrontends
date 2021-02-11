package com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="accounts")
public class AccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String iban;
    private String holder;
    private String name;
    private double balance;
    private String customer;

    @OneToMany
    @JoinColumn(name = "accountId")
    private List<MovementEntity> movements;

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(final String iban) {
        this.iban = iban;
    }

    public String getHolder() {
        return holder;
    }

    public void setHolder(final String holder) {
        this.holder = holder;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(final double balance) {
        this.balance = balance;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(final String customer) {
        this.customer = customer;
    }

    public List<MovementEntity> getMovements() {
        return movements;
    }

    public void setMovements(final List<MovementEntity> movements) {
        this.movements = movements;
    }
}
