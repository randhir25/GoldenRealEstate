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
 * A Unit.
 */
@Entity
@Table(name = "unit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Unit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "unit_title")
    private String unitTitle;

    @Column(name = "unit_type")
    private String unitType;

    @Column(name = "floor_no")
    private Long floorNo;

    @OneToMany(mappedBy = "unit")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Todos> todos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("units")
    private Building building;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUnitTitle() {
        return unitTitle;
    }

    public Unit unitTitle(String unitTitle) {
        this.unitTitle = unitTitle;
        return this;
    }

    public void setUnitTitle(String unitTitle) {
        this.unitTitle = unitTitle;
    }

    public String getUnitType() {
        return unitType;
    }

    public Unit unitType(String unitType) {
        this.unitType = unitType;
        return this;
    }

    public void setUnitType(String unitType) {
        this.unitType = unitType;
    }

    public Long getFloorNo() {
        return floorNo;
    }

    public Unit floorNo(Long floorNo) {
        this.floorNo = floorNo;
        return this;
    }

    public void setFloorNo(Long floorNo) {
        this.floorNo = floorNo;
    }

    public Set<Todos> getTodos() {
        return todos;
    }

    public Unit todos(Set<Todos> todos) {
        this.todos = todos;
        return this;
    }

    public Unit addTodos(Todos todos) {
        this.todos.add(todos);
        todos.setUnit(this);
        return this;
    }

    public Unit removeTodos(Todos todos) {
        this.todos.remove(todos);
        todos.setUnit(null);
        return this;
    }

    public void setTodos(Set<Todos> todos) {
        this.todos = todos;
    }

    public Building getBuilding() {
        return building;
    }

    public Unit building(Building building) {
        this.building = building;
        return this;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Unit)) {
            return false;
        }
        return id != null && id.equals(((Unit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Unit{" +
            "id=" + getId() +
            ", unitTitle='" + getUnitTitle() + "'" +
            ", unitType='" + getUnitType() + "'" +
            ", floorNo=" + getFloorNo() +
            "}";
    }
}
