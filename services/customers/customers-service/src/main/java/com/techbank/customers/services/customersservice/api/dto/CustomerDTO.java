package com.techbank.customers.services.customersservice.api.dto;

import java.io.Serializable;

public class CustomerDTO implements Serializable {

    private String id;
    private String name;
    private SummaryDTO summary;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public SummaryDTO getSummary() {
        return summary;
    }

    public CustomerDTO(final String id, final String name, SummaryDTO summary) {
        this.id = id;
        this.name = name;
        this.summary = summary;
    }
}
