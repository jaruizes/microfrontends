package com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="movements")
public class MovementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int accountId;
    private Date date;
    private String subject;
    private double amount;

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(final int accountId) {
        this.accountId = accountId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(final Date date) {
        this.date = date;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(final String subject) {
        this.subject = subject;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(final double amount) {
        this.amount = amount;
    }
}
