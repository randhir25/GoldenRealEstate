package com.gre.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Building.
 */
@Entity
@Table(name = "building")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Building implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "building_name")
    private String buildingName;

    @OneToMany(mappedBy = "building")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Unit> units = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("buildings")
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public Building buildingName(String buildingName) {
        this.buildingName = buildingName;
        return this;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public Set<Unit> getUnits() {
        return units;
    }

    public Building units(Set<Unit> units) {
        this.units = units;
        return this;
    }

    public Building addUnit(Unit unit) {
        this.units.add(unit);
        unit.setBuilding(this);
        return this;
    }

    public Building removeUnit(Unit unit) {
        this.units.remove(unit);
        unit.setBuilding(null);
        return this;
    }

    public void setUnits(Set<Unit> units) {
        this.units = units;
    }

    public Project getProject() {
        return project;
    }

    public Building project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Building)) {
            return false;
        }
        return id != null && id.equals(((Building) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Building{" +
            "id=" + getId() +
            ", buildingName='" + getBuildingName() + "'" +
            "}";
    }
}
