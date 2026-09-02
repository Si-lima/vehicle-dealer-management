package com.simone.vehicledealer.repository;

import com.simone.vehicledealer.domain.Vehicle;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByDealerId(Long dealerId);

    Optional<Vehicle> findByChassis(String chassis);

    boolean existsByChassis(String chassis);
}
