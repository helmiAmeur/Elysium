package com.elysium.org.web.rest;

import com.elysium.org.domain.Thread;
import com.elysium.org.repository.UserRepository;
import com.elysium.org.security.SecurityUtils;
import com.elysium.org.service.ThreadService;
import com.elysium.org.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * REST controller for managing {@link com.elysium.org.domain.Thread}.
 */
@RestController
@RequestMapping("/api")
public class ThreadResource {

    private final Logger log = LoggerFactory.getLogger(ThreadResource.class);

    private static final String ENTITY_NAME = "thread";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ThreadService threadService;
    private final UserRepository userRepository;

    public ThreadResource(ThreadService threadService, UserRepository userRepository) {
        this.threadService = threadService;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /threads} : Create a new thread.
     *
     * @param thread the thread to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new thread, or with status {@code 400 (Bad Request)} if the thread has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/threads")
    public ResponseEntity<Thread> createThread(@Valid @RequestBody Thread thread) throws URISyntaxException {
        log.debug("REST request to save Thread : {}", thread);
        if (thread.getId() != null) {
            throw new BadRequestAlertException("A new thread cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Thread result = threadService.save(thread);
        return ResponseEntity.created(new URI("/api/threads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /threads} : Updates an existing thread.
     *
     * @param thread the thread to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated thread,
     * or with status {@code 400 (Bad Request)} if the thread is not valid,
     * or with status {@code 500 (Internal Server Error)} if the thread couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/threads")
    public ResponseEntity<Thread> updateThread(@Valid @RequestBody Thread thread) throws URISyntaxException {
        log.debug("REST request to update Thread : {}", thread);
        AtomicBoolean save = new AtomicBoolean(false);
        SecurityUtils.getCurrentUserLogin()
                .flatMap(userRepository::findOneByLogin)
                .ifPresent(user -> {
                    if (thread.getUser().equals(user)){
                         save.set(true);
                    }
                });
        if (thread.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!save.get() ) {
            throw new BadRequestAlertException("you are not the owner of this ", ENTITY_NAME, "");
        }
        Thread result = threadService.save(thread);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, thread.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /threads} : get all the threads.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of threads in body.
     */
    @GetMapping("/threads")
    public List<Thread> getAllThreads() {
        log.debug("REST request to get all Threads");
        return threadService.findAll();
    }

    /**
     * {@code GET  /threads/:id} : get the "id" thread.
     *
     * @param id the id of the thread to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the thread, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/threads/{id}")
    public ResponseEntity<Thread> getThread(@PathVariable Long id) {
        log.debug("REST request to get Thread : {}", id);
        Optional<Thread> thread = threadService.findOne(id);
        return ResponseUtil.wrapOrNotFound(thread);
    }

    /**
     * {@code DELETE  /threads/:id} : delete the "id" thread.
     *
     * @param id the id of the thread to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/threads/{id}")
    public ResponseEntity<Void> deleteThread(@PathVariable Long id) {
        log.debug("REST request to delete Thread : {}", id);
        Optional<Thread> thread = threadService.findOne(id);
        AtomicBoolean save = new AtomicBoolean(false);
        SecurityUtils.getCurrentUserLogin()
                .flatMap(userRepository::findOneByLogin)
                .ifPresent(user -> {
                    if (thread.get().getUser().equals(user)){
                        save.set(true);
                    }
                });
        if (!save.get() ) {
            throw new BadRequestAlertException("you are not the owner of this ", ENTITY_NAME, "");
        }
        threadService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
