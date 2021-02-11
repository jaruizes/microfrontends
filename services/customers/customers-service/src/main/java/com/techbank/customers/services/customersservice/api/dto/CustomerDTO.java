package com.techbank.customers.services.customersservice.api.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.Random;

public class CustomerDTO implements Serializable {

    private String id;
    private String name;
    private SummaryDTO summary;
    private List<MovementDTO> lastmovements;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        Random random = new Random();
        return random.nextInt(99 - 18) + 18;
    }

    public String getEntry() {
        Random random = new Random();
        int day = random.nextInt(28 - 1) + 1;
        int month = random.nextInt(12 - 1) + 1;
        int year = random.nextInt(2019 - 2000) + 2000;
        return day + "/" + month + "/" + year;
    }

    public List<MovementDTO> getLastmovements() {
        return lastmovements;
    }

    public SummaryDTO getSummary() {
        return summary;
    }

    public CustomerDTO(final String id, final String name, SummaryDTO summary) {
        this.id = id;
        this.name = name;
        this.summary = summary;
    }

    public CustomerDTO(final String id, final String name, SummaryDTO summary, List<MovementDTO> lastmovements) {
        this.id = id;
        this.name = name;
        this.summary = summary;
        this.lastmovements = lastmovements;
    }
}
