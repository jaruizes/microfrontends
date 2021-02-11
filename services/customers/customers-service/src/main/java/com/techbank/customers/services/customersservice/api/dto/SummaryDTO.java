package com.techbank.customers.services.customersservice.api.dto;

import java.io.Serializable;
import java.util.List;

public class SummaryDTO implements Serializable {

    private List<Integer> incomes;
    private List<Integer> expenses;
    private List<String> dates;

    public SummaryDTO(final List<Integer> incomes, final List<Integer> expenses, final List<String> dates) {
        this.incomes = incomes;
        this.expenses = expenses;
        this.dates = dates;
    }

    public List<Integer> getIncomes() {
        return incomes;
    }

    public List<Integer> getExpenses() {
        return expenses;
    }

    public List<String> getDates() {
        return dates;
    }
}
