package com.gre.web.rest;

import com.gre.domain.Todos;
import com.gre.service.TodosService;
import com.gre.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.gre.domain.Todos}.
 */
@RestController
@RequestMapping("/api")
public class TodosResource {

    private final Logger log = LoggerFactory.getLogger(TodosResource.class);

    private static final String ENTITY_NAME = "todos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TodosService todosService;

    public TodosResource(TodosService todosService) {
        this.todosService = todosService;
    }

    /**
     * {@code POST  /todos} : Create a new todos.
     *
     * @param todos the todos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new todos, or with status {@code 400 (Bad Request)} if the todos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/todos")
    public ResponseEntity<Todos> createTodos(@RequestBody Todos todos) throws URISyntaxException {
        log.debug("REST request to save Todos : {}", todos);
        if (todos.getId() != null) {
            throw new BadRequestAlertException("A new todos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Todos result = todosService.save(todos);
        return ResponseEntity.created(new URI("/api/todos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /todos} : Updates an existing todos.
     *
     * @param todos the todos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated todos,
     * or with status {@code 400 (Bad Request)} if the todos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the todos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/todos")
    public ResponseEntity<Todos> updateTodos(@RequestBody Todos todos) throws URISyntaxException {
        log.debug("REST request to update Todos : {}", todos);
        if (todos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Todos result = todosService.save(todos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, todos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /todos} : get all the todos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of todos in body.
     */
    @GetMapping("/todos")
    public ResponseEntity<List<Todos>> getAllTodos(Pageable pageable) {
        log.debug("REST request to get a page of Todos");
        Page<Todos> page = todosService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /todos/:id} : get the "id" todos.
     *
     * @param id the id of the todos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the todos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/todos/{id}")
    public ResponseEntity<Todos> getTodos(@PathVariable Long id) {
        log.debug("REST request to get Todos : {}", id);
        Optional<Todos> todos = todosService.findOne(id);
        return ResponseUtil.wrapOrNotFound(todos);
    }

    /**
     * {@code DELETE  /todos/:id} : delete the "id" todos.
     *
     * @param id the id of the todos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodos(@PathVariable Long id) {
        log.debug("REST request to delete Todos : {}", id);
        todosService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
