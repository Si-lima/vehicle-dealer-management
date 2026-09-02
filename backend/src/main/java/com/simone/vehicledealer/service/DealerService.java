package com.simone.vehicledealer.service;

import com.simone.vehicledealer.domain.Dealer;
import com.simone.vehicledealer.dto.dealer.DealerRequest;
import com.simone.vehicledealer.dto.dealer.DealerResponse;
import com.simone.vehicledealer.exception.DuplicateResourceException;
import com.simone.vehicledealer.exception.ResourceNotFoundException;
import com.simone.vehicledealer.mapper.DealerMapper;
import com.simone.vehicledealer.repository.DealerRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DealerService {

    private final DealerRepository dealerRepository;
    private final DealerMapper dealerMapper;

    @Transactional
    public DealerResponse create(DealerRequest request) {
        validateDuplicateCnpj(request.cnpj(), null);

        Dealer dealer = dealerMapper.toEntity(request);
        Dealer savedDealer = dealerRepository.save(dealer);

        return dealerMapper.toResponse(savedDealer);
    }

    @Transactional(readOnly = true)
    public List<DealerResponse> findAll() {
        return dealerRepository.findAll()
                .stream()
                .map(dealerMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public DealerResponse findById(Long id) {
        Dealer dealer = findEntityById(id);
        return dealerMapper.toResponse(dealer);
    }

    @Transactional
    public DealerResponse update(Long id, DealerRequest request) {
        Dealer dealer = findEntityById(id);

        validateDuplicateCnpj(request.cnpj(), id);

        dealerMapper.updateEntity(dealer, request);
        Dealer updatedDealer = dealerRepository.save(dealer);

        return dealerMapper.toResponse(updatedDealer);
    }

    @Transactional
    public void delete(Long id) {
        Dealer dealer = findEntityById(id);
        dealerRepository.delete(dealer);
    }

    @Transactional(readOnly = true)
    public Dealer findEntityById(Long id) {
        return dealerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Concessionária não encontrada com o ID " + id
                ));
    }

    private void validateDuplicateCnpj(String cnpj, Long currentDealerId) {
        dealerRepository.findByCnpj(cnpj.trim())
                .filter(existingDealer ->
                        currentDealerId == null
                                || !existingDealer.getId().equals(currentDealerId)
                )
                .ifPresent(existingDealer -> {
                    throw new DuplicateResourceException(
                            "Já existe uma concessionária cadastrada com este CNPJ"
                    );
                });
    }
}
