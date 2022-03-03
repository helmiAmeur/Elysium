package com.elysium.org.web.rest;

import com.elysium.org.ElysiumApp;
import com.elysium.org.domain.Thread;
import com.elysium.org.domain.User;
import com.elysium.org.domain.Board;
import com.elysium.org.repository.ThreadRepository;
import com.elysium.org.service.ThreadService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ThreadResource} REST controller.
 */
@SpringBootTest(classes = ElysiumApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ThreadResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private ThreadService threadService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restThreadMockMvc;

    private Thread thread;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Thread createEntity(EntityManager em) {
        Thread thread = new Thread()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .creationDate(DEFAULT_CREATION_DATE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        thread.setUser(user);
        // Add required entity
        Board board;
        if (TestUtil.findAll(em, Board.class).isEmpty()) {
            board = BoardResourceIT.createEntity(em);
            em.persist(board);
            em.flush();
        } else {
            board = TestUtil.findAll(em, Board.class).get(0);
        }
        thread.setBoard(board);
        return thread;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Thread createUpdatedEntity(EntityManager em) {
        Thread thread = new Thread()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .creationDate(UPDATED_CREATION_DATE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        thread.setUser(user);
        // Add required entity
        Board board;
        if (TestUtil.findAll(em, Board.class).isEmpty()) {
            board = BoardResourceIT.createUpdatedEntity(em);
            em.persist(board);
            em.flush();
        } else {
            board = TestUtil.findAll(em, Board.class).get(0);
        }
        thread.setBoard(board);
        return thread;
    }

    @BeforeEach
    public void initTest() {
        thread = createEntity(em);
    }

    @Test
    @Transactional
    public void createThread() throws Exception {
        int databaseSizeBeforeCreate = threadRepository.findAll().size();
        // Create the Thread
        restThreadMockMvc.perform(post("/api/threads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thread)))
            .andExpect(status().isCreated());

        // Validate the Thread in the database
        List<Thread> threadList = threadRepository.findAll();
        assertThat(threadList).hasSize(databaseSizeBeforeCreate + 1);
        Thread testThread = threadList.get(threadList.size() - 1);
        assertThat(testThread.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testThread.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testThread.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    }

    @Test
    @Transactional
    public void createThreadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = threadRepository.findAll().size();

        // Create the Thread with an existing ID
        thread.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restThreadMockMvc.perform(post("/api/threads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thread)))
            .andExpect(status().isBadRequest());

        // Validate the Thread in the database
        List<Thread> threadList = threadRepository.findAll();
        assertThat(threadList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = threadRepository.findAll().size();
        // set the field null
        thread.setTitle(null);

        // Create the Thread, which fails.


        restThreadMockMvc.perform(post("/api/threads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thread)))
            .andExpect(status().isBadRequest());

        List<Thread> threadList = threadRepository.findAll();
        assertThat(threadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = threadRepository.findAll().size();
        // set the field null
        thread.setDescription(null);

        // Create the Thread, which fails.


        restThreadMockMvc.perform(post("/api/threads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thread)))
            .andExpect(status().isBadRequest());

        List<Thread> threadList = threadRepository.findAll();
        assertThat(threadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = threadRepository.findAll().size();
        // set the field null
        thread.setCreationDate(null);

        // Create the Thread, which fails.


        restThreadMockMvc.perform(post("/api/threads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thread)))
            .andExpect(status().isBadRequest());

        List<Thread> threadList = threadRepository.findAll();
        assertThat(threadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllThreads() throws Exception {
        // Initialize the database
        threadRepository.saveAndFlush(thread);

        // Get all the threadList
        restThreadMockMvc.perform(get("/api/threads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thread.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getThread() throws Exception {
        // Initialize the database
        threadRepository.saveAndFlush(thread);

        // Get the thread
        restThreadMockMvc.perform(get("/api/threads/{id}", thread.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(thread.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingThread() throws Exception {
        // Get the thread
        restThreadMockMvc.perform(get("/api/threads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateThread() throws Exception {
        // Initialize the database
        threadService.save(thread);

        int databaseSizeBeforeUpdate = threadRepository.findAll().size();

        // Update the thread
        Thread updatedThread = threadRepository.findById(thread.getId()).get();
        // Disconnect from session so that the updates on updatedThread are not directly saved in db
        em.detach(updatedThread);
        updatedThread
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .creationDate(UPDATED_CREATION_DATE);

        restThreadMockMvc.perform(put("/api/threads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedThread)))
            .andExpect(status().isBadRequest());


    }

    @Test
    @Transactional
    public void updateNonExistingThread() throws Exception {
        int databaseSizeBeforeUpdate = threadRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThreadMockMvc.perform(put("/api/threads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(thread)))
            .andExpect(status().isBadRequest());

        // Validate the Thread in the database
        List<Thread> threadList = threadRepository.findAll();
        assertThat(threadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteThread() throws Exception {
        // Initialize the database
        threadService.save(thread);

        int databaseSizeBeforeDelete = threadRepository.findAll().size();

        // Delete the thread
        restThreadMockMvc.perform(delete("/api/threads/{id}", thread.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest());


    }
}
