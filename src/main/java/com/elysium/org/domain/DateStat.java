package com.elysium.org.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

/**
 * A dateStat VIEW.
 */
@Entity
@Table(name = "date_stat")
public class DateStat implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="uuid")
	private UUID id;

	@Column(name = "number")
	private long number;

	@Column(name = "creation_date")
	private LocalDate creationDate;

	public DateStat(UUID id, long number, LocalDate creationDate) {
		this.id = id;
		this.number = number;
		this.creationDate = creationDate;
	}

	public DateStat() {
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public long getNumber() {
		return number;
	}

	public void setNumber(long number) {
		this.number = number;
	}

	public LocalDate getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDate creationDate) {
		this.creationDate = creationDate;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		DateStat dateStat = (DateStat) o;
		return Objects.equals(id, dateStat.id) && Objects.equals(number, dateStat.number) && Objects.equals(creationDate, dateStat.creationDate);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, number, creationDate);
	}
}
