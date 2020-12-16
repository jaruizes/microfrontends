package com.techbank.customers.services.customersservice.business.model;

import java.util.List;

public class Customer {
    private String id;
    private String name;
    private Summary summary;

    public Customer(final String id, final String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public Summary getSummary() {
        return summary;
    }

    public void setSummary(final Summary summary) {
        this.summary = summary;
    }
}
