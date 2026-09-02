package com.simone.vehicledealer.mapper;

import com.simone.vehicledealer.domain.Dealer;
import com.simone.vehicledealer.dto.dealer.DealerRequest;
import com.simone.vehicledealer.dto.dealer.DealerResponse;
import org.springframework.stereotype.Component;

@Component
public class DealerMapper {

    public Dealer toEntity(DealerRequest request) {
        return Dealer.builder()
                .corporateName(request.corporateName().trim())
                .cnpj(request.cnpj().trim())
                .cep(request.cep().trim())
                .street(request.street().trim())
                .neighborhood(request.neighborhood().trim())
                .city(request.city().trim())
                .state(request.state().trim().toUpperCase())
                .build();
    }

    public void updateEntity(Dealer dealer, DealerRequest request) {
        dealer.setCorporateName(request.corporateName().trim());
        dealer.setCnpj(request.cnpj().trim());
        dealer.setCep(request.cep().trim());
        dealer.setStreet(request.street().trim());
        dealer.setNeighborhood(request.neighborhood().trim());
        dealer.setCity(request.city().trim());
        dealer.setState(request.state().trim().toUpperCase());
    }

    public DealerResponse toResponse(Dealer dealer) {
        return new DealerResponse(
                dealer.getId(),
                dealer.getCorporateName(),
                dealer.getCnpj(),
                dealer.getCep(),
                dealer.getStreet(),
                dealer.getNeighborhood(),
                dealer.getCity(),
                dealer.getState()
        );
    }
}
