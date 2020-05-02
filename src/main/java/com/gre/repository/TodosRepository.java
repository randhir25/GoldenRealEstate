package com.gre.repository;

import com.gre.domain.Todos;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Todos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TodosRepository extends JpaRepository<Todos, Long> {
}
