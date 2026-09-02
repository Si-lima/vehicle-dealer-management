package com.simone.vehicledealer.service;

import com.simone.vehicledealer.domain.Dealer;
import com.simone.vehicledealer.domain.Vehicle;
import com.simone.vehicledealer.dto.vehicle.VehicleRequest;
import com.simone.vehicledealer.dto.vehicle.VehicleResponse;
import com.simone.vehicledealer.exception.DuplicateResourceException;
import com.simone.vehicledealer.exception.ResourceNotFoundException;
import com.simone.vehicledealer.mapper.VehicleMapper;
import com.simone.vehicledealer.repository.VehicleRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final VehicleMapper vehicleMapper;
    private final DealerService dealerService;

    @Transactional
    public VehicleResponse create(VehicleRequest request) {
        validateDuplicateChassis(request.chassis(), null);

        Dealer dealer = resolveDealer(request.dealerId());

        Vehicle vehicle = vehicleMapper.toEntity(request, dealer);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        return vehicleMapper.toResponse(savedVehicle);
    }

    @Transactional(readOnly = true)
    public List<VehicleResponse> findAll() {
        return vehicleRepository.findAll()
                .stream()
                .map(vehicleMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public VehicleResponse findById(Long id) {
        Vehicle vehicle = findEntityById(id);
        return vehicleMapper.toResponse(vehicle);
    }

    @Transactional(readOnly = true)
    public List<VehicleResponse> findByDealerId(Long dealerId) {
        dealerService.findEntityById(dealerId);

        return vehicleRepository.findByDealerId(dealerId)
                .stream()
                .map(vehicleMapper::toResponse)
                .toList();
    }

    @Transactional
    public VehicleResponse update(Long id, VehicleRequest request) {
        Vehicle vehicle = findEntityById(id);

        validateDuplicateChassis(request.chassis(), id);

        Dealer dealer = resolveDealer(request.dealerId());

        vehicleMapper.updateEntity(vehicle, request, dealer);
        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return vehicleMapper.toResponse(updatedVehicle);
    }

    @Transactional
    public void delete(Long id) {
        Vehicle vehicle = findEntityById(id);
        vehicleRepository.delete(vehicle);
    }

    @Transactional(readOnly = true)
    public Vehicle findEntityById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Veículo não encontrado com o ID " + id
                ));
    }

    private Dealer resolveDealer(Long dealerId) {
        if (dealerId == null) {
            return null;
        }

        return dealerService.findEntityById(dealerId);
    }

    private void validateDuplicateChassis(
            String chassis,
            Long currentVehicleId
    ) {
        if (chassis == null || chassis.isBlank()) {
            return;
        }

        String normalizedChassis = chassis.trim().toUpperCase();

        vehicleRepository.findByChassis(normalizedChassis)
                .filter(existingVehicle ->
                        currentVehicleId == null
                                || !existingVehicle.getId()
                                        .equals(currentVehicleId)
                )
                .ifPresent(existingVehicle -> {
                    throw new DuplicateResourceException(
                            "Já existe um veículo cadastrado com este chassi"
                    );
                });
    }
}
