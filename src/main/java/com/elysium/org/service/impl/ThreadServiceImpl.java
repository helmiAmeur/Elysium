package com.elysium.org.service.impl;

import com.elysium.org.service.ThreadService;
import com.elysium.org.domain.Thread;
import com.elysium.org.repository.ThreadRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Thread}.
 */
@Service
@Transactional
public class ThreadServiceImpl implements ThreadService {

    private final Logger log = LoggerFactory.getLogger(ThreadServiceImpl.class);

    private final ThreadRepository threadRepository;

    public ThreadServiceImpl(ThreadRepository threadRepository) {
        this.threadRepository = threadRepository;
    }

    @Override
    public Thread save(Thread thread) {
        log.debug("Request to save Thread : {}", thread);
        return threadRepository.save(thread);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Thread> findAll() {
        log.debug("Request to get all Threads");
        return threadRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Thread> findOne(Long id) {
        log.debug("Request to get Thread : {}", id);
        return threadRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Thread : {}", id);
        threadRepository.deleteById(id);
    }
}
