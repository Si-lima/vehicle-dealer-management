package com.simone.vehicledealer.controller;

import com.simone.vehicledealer.dto.dealer.DealerRequest;
import com.simone.vehicledealer.dto.dealer.DealerResponse;
import com.simone.vehicledealer.service.DealerService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/dealer")
@RequiredArgsConstructor
public class DealerController {

    private final DealerService dealerService;

    @PostMapping
    public ResponseEntity<DealerResponse> create(
            @Valid @RequestBody DealerRequest request
    ) {
        DealerResponse response = dealerService.create(request);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }

    @GetMapping
    public ResponseEntity<List<DealerResponse>> findAll() {
        return ResponseEntity.ok(dealerService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DealerResponse> findById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(dealerService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DealerResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody DealerRequest request
    ) {
        return ResponseEntity.ok(dealerService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id
    ) {
        dealerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
