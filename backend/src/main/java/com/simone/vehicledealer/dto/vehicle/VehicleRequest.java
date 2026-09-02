package com.simone.vehicledealer.dto.vehicle;

import com.simone.vehicledealer.domain.FuelType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record VehicleRequest(

        @NotBlank(message = "A marca é obrigatória")
        @Size(max = 80, message = "A marca deve ter no máximo 80 caracteres")
        String brand,

        @NotBlank(message = "O modelo é obrigatório")
        @Size(max = 100, message = "O modelo deve ter no máximo 100 caracteres")
        String model,

        @NotNull(message = "O tipo de combustível é obrigatório")
        FuelType fuelType,

        @NotBlank(message = "A cor é obrigatória")
        @Size(max = 50, message = "A cor deve ter no máximo 50 caracteres")
        String color,

        @Min(value = 1886, message = "O ano deve ser igual ou posterior a 1886")
        @Max(value = 2100, message = "O ano deve ser igual ou anterior a 2100")
        Integer year,

        @Pattern(
                regexp = "^[A-HJ-NPR-Z0-9]{17}$",
                message = "O chassi deve possuir 17 caracteres alfanuméricos válidos"
        )
        String chassis,

        @DecimalMin(
                value = "0.0",
                inclusive = false,
                message = "O valor deve ser maior que zero"
        )
        BigDecimal price,

        @Size(max = 50, message = "A cor externa deve ter no máximo 50 caracteres")
        String externalColor,

        Long dealerId
) {
}
