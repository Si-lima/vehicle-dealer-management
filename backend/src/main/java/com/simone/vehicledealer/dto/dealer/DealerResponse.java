package com.simone.vehicledealer.dto.dealer;

public record DealerResponse(
        Long id,
        String corporateName,
        String cnpj,
        String cep,
        String street,
        String neighborhood,
        String city,
        String state
) {
}
