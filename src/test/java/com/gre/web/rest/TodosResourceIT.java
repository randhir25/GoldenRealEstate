package com.gre.web.rest;

import com.gre.GoldenRealEstateApp;
import com.gre.domain.Todos;
import com.gre.repository.TodosRepository;
import com.gre.service.TodosService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TodosResource} REST controller.
 */
@SpringBootTest(classes = GoldenRealEstateApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TodosResourceIT {

    private static final String DEFAULT_ASSINED_TO = "AAAAAAAAAA";
    private static final String UPDATED_ASSINED_TO = "BBBBBBBBBB";

    private static final Long DEFAULT_COMPLETED = 1L;
    private static final Long UPDATED_COMPLETED = 2L;

    private static final Boolean DEFAULT_STATUST = false;
    private static final Boolean UPDATED_STATUST = true;

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TodosRepository todosRepository;

    @Autowired
    private TodosService todosService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTodosMockMvc;

    private Todos todos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Todos createEntity(EntityManager em) {
        Todos todos = new Todos()
            .assinedTo(DEFAULT_ASSINED_TO)
            .completed(DEFAULT_COMPLETED)
            .statust(DEFAULT_STATUST)
            .remarks(DEFAULT_REMARKS)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return todos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Todos createUpdatedEntity(EntityManager em) {
        Todos todos = new Todos()
            .assinedTo(UPDATED_ASSINED_TO)
            .completed(UPDATED_COMPLETED)
            .statust(UPDATED_STATUST)
            .remarks(UPDATED_REMARKS)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return todos;
    }

    @BeforeEach
    public void initTest() {
        todos = createEntity(em);
    }

    @Test
    @Transactional
    public void createTodos() throws Exception {
        int databaseSizeBeforeCreate = todosRepository.findAll().size();

        // Create the Todos
        restTodosMockMvc.perform(post("/api/todos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(todos)))
            .andExpect(status().isCreated());

        // Validate the Todos in the database
        List<Todos> todosList = todosRepository.findAll();
        assertThat(todosList).hasSize(databaseSizeBeforeCreate + 1);
        Todos testTodos = todosList.get(todosList.size() - 1);
        assertThat(testTodos.getAssinedTo()).isEqualTo(DEFAULT_ASSINED_TO);
        assertThat(testTodos.getCompleted()).isEqualTo(DEFAULT_COMPLETED);
        assertThat(testTodos.isStatust()).isEqualTo(DEFAULT_STATUST);
        assertThat(testTodos.getRemarks()).isEqualTo(DEFAULT_REMARKS);
        assertThat(testTodos.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testTodos.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createTodosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = todosRepository.findAll().size();

        // Create the Todos with an existing ID
        todos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTodosMockMvc.perform(post("/api/todos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(todos)))
            .andExpect(status().isBadRequest());

        // Validate the Todos in the database
        List<Todos> todosList = todosRepository.findAll();
        assertThat(todosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTodos() throws Exception {
        // Initialize the database
        todosRepository.saveAndFlush(todos);

        // Get all the todosList
        restTodosMockMvc.perform(get("/api/todos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(todos.getId().intValue())))
            .andExpect(jsonPath("$.[*].assinedTo").value(hasItem(DEFAULT_ASSINED_TO)))
            .andExpect(jsonPath("$.[*].completed").value(hasItem(DEFAULT_COMPLETED.intValue())))
            .andExpect(jsonPath("$.[*].statust").value(hasItem(DEFAULT_STATUST.booleanValue())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getTodos() throws Exception {
        // Initialize the database
        todosRepository.saveAndFlush(todos);

        // Get the todos
        restTodosMockMvc.perform(get("/api/todos/{id}", todos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(todos.getId().intValue()))
            .andExpect(jsonPath("$.assinedTo").value(DEFAULT_ASSINED_TO))
            .andExpect(jsonPath("$.completed").value(DEFAULT_COMPLETED.intValue()))
            .andExpect(jsonPath("$.statust").value(DEFAULT_STATUST.booleanValue()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTodos() throws Exception {
        // Get the todos
        restTodosMockMvc.perform(get("/api/todos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTodos() throws Exception {
        // Initialize the database
        todosService.save(todos);

        int databaseSizeBeforeUpdate = todosRepository.findAll().size();

        // Update the todos
        Todos updatedTodos = todosRepository.findById(todos.getId()).get();
        // Disconnect from session so that the updates on updatedTodos are not directly saved in db
        em.detach(updatedTodos);
        updatedTodos
            .assinedTo(UPDATED_ASSINED_TO)
            .completed(UPDATED_COMPLETED)
            .statust(UPDATED_STATUST)
            .remarks(UPDATED_REMARKS)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restTodosMockMvc.perform(put("/api/todos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTodos)))
            .andExpect(status().isOk());

        // Validate the Todos in the database
        List<Todos> todosList = todosRepository.findAll();
        assertThat(todosList).hasSize(databaseSizeBeforeUpdate);
        Todos testTodos = todosList.get(todosList.size() - 1);
        assertThat(testTodos.getAssinedTo()).isEqualTo(UPDATED_ASSINED_TO);
        assertThat(testTodos.getCompleted()).isEqualTo(UPDATED_COMPLETED);
        assertThat(testTodos.isStatust()).isEqualTo(UPDATED_STATUST);
        assertThat(testTodos.getRemarks()).isEqualTo(UPDATED_REMARKS);
        assertThat(testTodos.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testTodos.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTodos() throws Exception {
        int databaseSizeBeforeUpdate = todosRepository.findAll().size();

        // Create the Todos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTodosMockMvc.perform(put("/api/todos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(todos)))
            .andExpect(status().isBadRequest());

        // Validate the Todos in the database
        List<Todos> todosList = todosRepository.findAll();
        assertThat(todosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTodos() throws Exception {
        // Initialize the database
        todosService.save(todos);

        int databaseSizeBeforeDelete = todosRepository.findAll().size();

        // Delete the todos
        restTodosMockMvc.perform(delete("/api/todos/{id}", todos.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Todos> todosList = todosRepository.findAll();
        assertThat(todosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
