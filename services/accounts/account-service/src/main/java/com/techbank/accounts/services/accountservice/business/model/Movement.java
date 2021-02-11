package com.techbank.accounts.services.accountservice.business.model;

import java.util.Date;

public class Movement {
    private int id;
    private int accountId;
    private Date date;
    private String subject;
    private double amount;

    public Movement(final int id, final int accountId, final Date date, final String subject, final double amount) {
        this.id = id;
        this.accountId = accountId;
        this.date = date;
        this.subject = subject;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

    public int getAccountId() {
        return accountId;
    }

    public Date getDate() {
        return date;
    }

    public String getSubject() {
        return subject;
    }

    public double getAmount() {
        return amount;
    }
}
