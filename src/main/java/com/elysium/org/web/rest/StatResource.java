package com.elysium.org.web.rest;

import com.elysium.org.domain.DateStat;
import com.elysium.org.domain.UserStat;
import com.elysium.org.repository.DateStatRepository;
import com.elysium.org.repository.UserStatRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST controller for managing {@link DateStat}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StatResource {

    private final Logger log = LoggerFactory.getLogger(StatResource.class);

    private final DateStatRepository dateStatRepository;
    private final UserStatRepository userStatRepository;

    public StatResource(DateStatRepository dateStatRepository, UserStatRepository userStatRepository) {
        this.dateStatRepository = dateStatRepository;
        this.userStatRepository = userStatRepository;
    }

    /**
     * {@code GET  /date-stats} : get all the dateStats.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dateStats in body.
     */
    @GetMapping("/date-stats")
    public List<DateStat> getAllDateStats() {
        log.debug("REST request to get all DateStats");
        return dateStatRepository.findAll();
    }

    /**
     * {@code GET  /date-stats-limit} : get  the dateStats with limit for front.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dateStats in body.
     */
    @GetMapping("/date-stats-limit")
    public List<DateStat> getAllDateStatsLimit(@RequestParam Integer limit) {
        log.debug("REST request to get all DateStats with limit");

        return  dateStatRepository.findAll().stream().limit(limit).collect(Collectors.toList());
    }

    /**
     * {@code GET  /user-stats} : get all the userStats.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userStats in body.
     */
    @GetMapping("/user-stats")
    public List<UserStat> getAllUserStats() {
        log.debug("REST request to get all UserStats");
        return userStatRepository.findAll();
    }

    /**
     * {@code GET  /user-stats-limit} : get  the userStats with limit.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userStats in body.
     */
    @GetMapping("/user-stats-limit")
    public List<UserStat> getAllUserStatsLimit(@RequestParam Integer limit) {
        log.debug("REST request to get all UserStats with limit");
        return userStatRepository.findAll().stream().limit(limit).collect(Collectors.toList());
    }
}
