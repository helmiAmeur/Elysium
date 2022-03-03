package com.elysium.org.service;

import com.elysium.org.domain.Thread;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Thread}.
 */
public interface ThreadService {

    /**
     * Save a thread.
     *
     * @param thread the entity to save.
     * @return the persisted entity.
     */
    Thread save(Thread thread);

    /**
     * Get all the threads.
     *
     * @return the list of entities.
     */
    List<Thread> findAll();


    /**
     * Get the "id" thread.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Thread> findOne(Long id);

    /**
     * Delete the "id" thread.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
