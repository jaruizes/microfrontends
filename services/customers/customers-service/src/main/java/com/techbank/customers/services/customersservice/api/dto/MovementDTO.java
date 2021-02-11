package com.techbank.customers.services.customersservice.api.dto;

import java.io.Serializable;

public class MovementDTO implements Serializable {

    private Integer id;
    private String date;
    private String subject;
    private Double amount;

    public MovementDTO(final Integer id, final String date, final String subject, final Double amount) {
        this.id = id;
        this.date = date;
        this.subject = subject;
        this.amount = amount;
    }

    public Integer getId() {
        return id;
    }

    public String getDate() {
        return date;
    }

    public String getSubject() {
        return subject;
    }

    public Double getAmount() {
        return amount;
    }
}
