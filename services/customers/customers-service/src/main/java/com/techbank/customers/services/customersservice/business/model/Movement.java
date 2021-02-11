package com.techbank.customers.services.customersservice.business.model;

import java.util.Date;

public class Movement {
    private int id;
    private String customerId;
    private Date date;
    private String subject;
    private double amount;

    public Movement(final int id, final String customerId, final Date date, final String subject, final double amount) {
        this.id = id;
        this.customerId = customerId;
        this.date = date;
        this.subject = subject;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

    public String getCustomerId() {
        return customerId;
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
