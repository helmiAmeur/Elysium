package com.elysium.org.web.rest;

import com.elysium.org.domain.Board;
import com.elysium.org.service.BoardService;
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

/**
 * REST controller for managing {@link com.elysium.org.domain.Board}.
 */
@RestController
@RequestMapping("/api")
public class BoardResource {

    private final Logger log = LoggerFactory.getLogger(BoardResource.class);

    private static final String ENTITY_NAME = "board";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BoardService boardService;

    public BoardResource(BoardService boardService) {
        this.boardService = boardService;
    }

    /**
     * {@code POST  /boards} : Create a new board.
     *
     * @param board the board to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new board, or with status {@code 400 (Bad Request)} if the board has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/boards")
    public ResponseEntity<Board> createBoard(@Valid @RequestBody Board board) throws URISyntaxException {
        log.debug("REST request to save Board : {}", board);
        if (board.getId() != null) {
            throw new BadRequestAlertException("A new board cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Board result = boardService.save(board);
        return ResponseEntity.created(new URI("/api/boards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /boards} : Updates an existing board.
     *
     * @param board the board to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated board,
     * or with status {@code 400 (Bad Request)} if the board is not valid,
     * or with status {@code 500 (Internal Server Error)} if the board couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/boards")
    public ResponseEntity<Board> updateBoard(@Valid @RequestBody Board board) throws URISyntaxException {
        log.debug("REST request to update Board : {}", board);
        if (board.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Board result = boardService.save(board);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, board.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /boards} : get all the boards.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of boards in body.
     */
    @GetMapping("/boards")
    public List<Board> getAllBoards() {
        log.debug("REST request to get all Boards");
        return boardService.findAll();
    }

    /**
     * {@code GET  /boards/:id} : get the "id" board.
     *
     * @param id the id of the board to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the board, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/boards/{id}")
    public ResponseEntity<Board> getBoard(@PathVariable Long id) {
        log.debug("REST request to get Board : {}", id);
        Optional<Board> board = boardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(board);
    }

    /**
     * {@code DELETE  /boards/:id} : delete the "id" board.
     *
     * @param id the id of the board to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/boards/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id) {
        log.debug("REST request to delete Board : {}", id);
        boardService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
