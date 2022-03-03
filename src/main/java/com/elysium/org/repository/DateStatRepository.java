package com.elysium.org.repository;

import com.elysium.org.domain.DateStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface DateStatRepository extends JpaRepository<DateStat, UUID> {
}
