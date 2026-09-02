package com.simone.vehicledealer.mapper;

import com.simone.vehicledealer.domain.Dealer;
import com.simone.vehicledealer.domain.Vehicle;
import com.simone.vehicledealer.dto.vehicle.DealerSummaryResponse;
import com.simone.vehicledealer.dto.vehicle.VehicleRequest;
import com.simone.vehicledealer.dto.vehicle.VehicleResponse;
import org.springframework.stereotype.Component;

@Component
public class VehicleMapper {

    public Vehicle toEntity(VehicleRequest request, Dealer dealer) {
        return Vehicle.builder()
                .brand(request.brand().trim())
                .model(request.model().trim())
                .fuelType(request.fuelType())
                .color(request.color().trim())
                .year(request.year())
                .chassis(normalizeOptionalText(request.chassis()))
                .price(request.price())
                .externalColor(normalizeOptionalText(request.externalColor()))
                .dealer(dealer)
                .build();
    }

    public void updateEntity(
            Vehicle vehicle,
            VehicleRequest request,
            Dealer dealer
    ) {
        vehicle.setBrand(request.brand().trim());
        vehicle.setModel(request.model().trim());
        vehicle.setFuelType(request.fuelType());
        vehicle.setColor(request.color().trim());
        vehicle.setYear(request.year());
        vehicle.setChassis(normalizeOptionalText(request.chassis()));
        vehicle.setPrice(request.price());
        vehicle.setExternalColor(normalizeOptionalText(request.externalColor()));
        vehicle.setDealer(dealer);
    }

    public VehicleResponse toResponse(Vehicle vehicle) {
        return new VehicleResponse(
                vehicle.getId(),
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getFuelType(),
                vehicle.getColor(),
                vehicle.getYear(),
                vehicle.getChassis(),
                vehicle.getPrice(),
                vehicle.getExternalColor(),
                toDealerSummary(vehicle.getDealer())
        );
    }

    private DealerSummaryResponse toDealerSummary(Dealer dealer) {
        if (dealer == null) {
            return null;
        }

        return new DealerSummaryResponse(
                dealer.getId(),
                dealer.getCorporateName(),
                dealer.getCnpj()
        );
    }

    private String normalizeOptionalText(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim().toUpperCase();
    }
}
