package com.gre.service.impl;

import com.gre.service.TodosService;
import com.gre.domain.Todos;
import com.gre.repository.TodosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Todos}.
 */
@Service
@Transactional
public class TodosServiceImpl implements TodosService {

    private final Logger log = LoggerFactory.getLogger(TodosServiceImpl.class);

    private final TodosRepository todosRepository;

    public TodosServiceImpl(TodosRepository todosRepository) {
        this.todosRepository = todosRepository;
    }

    /**
     * Save a todos.
     *
     * @param todos the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Todos save(Todos todos) {
        log.debug("Request to save Todos : {}", todos);
        return todosRepository.save(todos);
    }

    /**
     * Get all the todos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Todos> findAll(Pageable pageable) {
        log.debug("Request to get all Todos");
        return todosRepository.findAll(pageable);
    }

    /**
     * Get one todos by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Todos> findOne(Long id) {
        log.debug("Request to get Todos : {}", id);
        return todosRepository.findById(id);
    }

    /**
     * Delete the todos by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Todos : {}", id);
        todosRepository.deleteById(id);
    }
}
