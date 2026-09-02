package com.simone.vehicledealer.dto.dealer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CNPJ;

public record DealerRequest(

        @NotBlank(message = "A razão social é obrigatória")
        @Size(max = 150, message = "A razão social deve ter no máximo 150 caracteres")
        String corporateName,

        @NotBlank(message = "O CNPJ é obrigatório")
        @CNPJ(message = "O CNPJ informado é inválido")
        String cnpj,

        @NotBlank(message = "O CEP é obrigatório")
        @Pattern(
                regexp = "\\d{8}",
                message = "O CEP deve possuir exatamente 8 números"
        )
        String cep,

        @NotBlank(message = "O logradouro é obrigatório")
        @Size(max = 150, message = "O logradouro deve ter no máximo 150 caracteres")
        String street,

        @NotBlank(message = "O bairro é obrigatório")
        @Size(max = 100, message = "O bairro deve ter no máximo 100 caracteres")
        String neighborhood,

        @NotBlank(message = "A cidade é obrigatória")
        @Size(max = 100, message = "A cidade deve ter no máximo 100 caracteres")
        String city,

        @NotBlank(message = "O estado é obrigatório")
        @Pattern(
                regexp = "[A-Za-z]{2}",
                message = "O estado deve possuir uma sigla com 2 letras"
        )
        String state
) {
}
