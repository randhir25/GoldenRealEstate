package com.gre.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

/**
 * A Todos.
 */
@Entity
@Table(name = "todos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Todos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "assined_to")
    private String assinedTo;

    @Column(name = "completed")
    private Long completed;

    @Column(name = "statust")
    private Boolean statust;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @ManyToOne
    @JsonIgnoreProperties("todos")
    private Unit unit;

    @ManyToOne
    @JsonIgnoreProperties("todos")
    private Task task;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAssinedTo() {
        return assinedTo;
    }

    public Todos assinedTo(String assinedTo) {
        this.assinedTo = assinedTo;
        return this;
    }

    public void setAssinedTo(String assinedTo) {
        this.assinedTo = assinedTo;
    }

    public Long getCompleted() {
        return completed;
    }

    public Todos completed(Long completed) {
        this.completed = completed;
        return this;
    }

    public void setCompleted(Long completed) {
        this.completed = completed;
    }

    public Boolean isStatust() {
        return statust;
    }

    public Todos statust(Boolean statust) {
        this.statust = statust;
        return this;
    }

    public void setStatust(Boolean statust) {
        this.statust = statust;
    }

    public String getRemarks() {
        return remarks;
    }

    public Todos remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Todos startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Todos endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Unit getUnit() {
        return unit;
    }

    public Todos unit(Unit unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public Task getTask() {
        return task;
    }

    public Todos task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Todos)) {
            return false;
        }
        return id != null && id.equals(((Todos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Todos{" +
            "id=" + getId() +
            ", assinedTo='" + getAssinedTo() + "'" +
            ", completed=" + getCompleted() +
            ", statust='" + isStatust() + "'" +
            ", remarks='" + getRemarks() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
