package com.simone.vehicledealer.dto.vehicle;

import com.simone.vehicledealer.domain.FuelType;
import java.math.BigDecimal;

public record VehicleResponse(
        Long id,
        String brand,
        String model,
        FuelType fuelType,
        String color,
        Integer year,
        String chassis,
        BigDecimal price,
        String externalColor,
        DealerSummaryResponse dealer
) {
}
