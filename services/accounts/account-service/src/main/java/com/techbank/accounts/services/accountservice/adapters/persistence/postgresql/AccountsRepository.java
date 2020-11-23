package com.techbank.accounts.services.accountservice.adapters.persistence.postgresql;

import com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.entities.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountsRepository extends JpaRepository<AccountEntity, Integer> {
    Optional<List<AccountEntity>> findByCustomer(String customer);
}
