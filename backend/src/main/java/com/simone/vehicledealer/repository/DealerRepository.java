package com.simone.vehicledealer.repository;

import com.simone.vehicledealer.domain.Dealer;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealerRepository extends JpaRepository<Dealer, Long> {

    Optional<Dealer> findByCnpj(String cnpj);

    boolean existsByCnpj(String cnpj);
}
