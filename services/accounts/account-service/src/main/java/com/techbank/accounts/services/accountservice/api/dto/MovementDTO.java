package com.techbank.accounts.services.accountservice.api.dto;

import java.io.Serializable;

public class MovementDTO implements Serializable {

    private Integer id;
    private Integer accountId;
    private String date;
    private String subject;
    private Double amount;

    public MovementDTO(final Integer id, final Integer accountId, final String date, final String subject, final Double amount) {
        this.id = id;
        this.accountId = accountId;
        this.date = date;
        this.subject = subject;
        this.amount = amount;
    }

    public Integer getId() {
        return id;
    }

    public Integer getAccountId() {
        return accountId;
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
