package com.gre.web.rest;

import com.gre.domain.Building;
import com.gre.service.BuildingService;
import com.gre.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.gre.domain.Building}.
 */
@RestController
@RequestMapping("/api")
public class BuildingResource {

    private final Logger log = LoggerFactory.getLogger(BuildingResource.class);

    private static final String ENTITY_NAME = "building";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BuildingService buildingService;

    public BuildingResource(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    /**
     * {@code POST  /buildings} : Create a new building.
     *
     * @param building the building to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new building, or with status {@code 400 (Bad Request)} if the building has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/buildings")
    public ResponseEntity<Building> createBuilding(@RequestBody Building building) throws URISyntaxException {
        log.debug("REST request to save Building : {}", building);
        if (building.getId() != null) {
            throw new BadRequestAlertException("A new building cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Building result = buildingService.save(building);
        return ResponseEntity.created(new URI("/api/buildings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /buildings} : Updates an existing building.
     *
     * @param building the building to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated building,
     * or with status {@code 400 (Bad Request)} if the building is not valid,
     * or with status {@code 500 (Internal Server Error)} if the building couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/buildings")
    public ResponseEntity<Building> updateBuilding(@RequestBody Building building) throws URISyntaxException {
        log.debug("REST request to update Building : {}", building);
        if (building.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Building result = buildingService.save(building);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, building.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /buildings} : get all the buildings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of buildings in body.
     */
    @GetMapping("/buildings")
    public List<Building> getAllBuildings() {
        log.debug("REST request to get all Buildings");
        return buildingService.findAll();
    }

    /**
     * {@code GET  /buildings/:id} : get the "id" building.
     *
     * @param id the id of the building to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the building, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/buildings/{id}")
    public ResponseEntity<Building> getBuilding(@PathVariable Long id) {
        log.debug("REST request to get Building : {}", id);
        Optional<Building> building = buildingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(building);
    }

    /**
     * {@code DELETE  /buildings/:id} : delete the "id" building.
     *
     * @param id the id of the building to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/buildings/{id}")
    public ResponseEntity<Void> deleteBuilding(@PathVariable Long id) {
        log.debug("REST request to delete Building : {}", id);
        buildingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
