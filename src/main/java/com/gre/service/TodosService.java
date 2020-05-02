package com.gre.service;

import com.gre.domain.Todos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Todos}.
 */
public interface TodosService {

    /**
     * Save a todos.
     *
     * @param todos the entity to save.
     * @return the persisted entity.
     */
    Todos save(Todos todos);

    /**
     * Get all the todos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Todos> findAll(Pageable pageable);

    /**
     * Get the "id" todos.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Todos> findOne(Long id);

    /**
     * Delete the "id" todos.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
