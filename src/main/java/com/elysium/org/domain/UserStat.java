package com.elysium.org.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A userStat VIEW.
 */
@Entity
@Table(name = "user_stat")
public class UserStat implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="uuid")
	private UUID id;

	@Column(name = "number")
	private long number;

	@Column(name = "login")
	private String login;

	public UserStat() {
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

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		UserStat userStat = (UserStat) o;
		return number == userStat.number && login == userStat.login && Objects.equals(id, userStat.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, number, login);
	}
}
