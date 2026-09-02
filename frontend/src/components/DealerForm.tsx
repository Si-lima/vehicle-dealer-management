import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  dealerSchema,
  type DealerFormData,
} from "../schemas/dealerSchema";

interface DealerFormProps {
  onSubmit: (data: DealerFormData) => void;
  isSubmitting?: boolean;
}

export function DealerForm({
  onSubmit,
  isSubmitting = false,
}: DealerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DealerFormData>({
    resolver: zodResolver(dealerSchema),
    defaultValues: {
      corporateName: "",
      cnpj: "",
      cep: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="corporateName">Razão social</label>
        <input
          id="corporateName"
          {...register("corporateName")}
        />
        {errors.corporateName && (
          <span>{errors.corporateName.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="cnpj">CNPJ</label>
        <input id="cnpj" {...register("cnpj")} />
        {errors.cnpj && <span>{errors.cnpj.message}</span>}
      </div>

      <div>
        <label htmlFor="cep">CEP</label>
        <input id="cep" {...register("cep")} />
        {errors.cep && <span>{errors.cep.message}</span>}
      </div>

      <div>
        <label htmlFor="street">Logradouro</label>
        <input id="street" {...register("street")} />
        {errors.street && <span>{errors.street.message}</span>}
      </div>

      <div>
        <label htmlFor="neighborhood">Bairro</label>
        <input
          id="neighborhood"
          {...register("neighborhood")}
        />
        {errors.neighborhood && (
          <span>{errors.neighborhood.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="city">Cidade</label>
        <input id="city" {...register("city")} />
        {errors.city && <span>{errors.city.message}</span>}
      </div>

      <div>
        <label htmlFor="state">Estado</label>
        <input
          id="state"
          maxLength={2}
          placeholder="SP"
          {...register("state")}
        />
        {errors.state && <span>{errors.state.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Cadastrar concessionária"}
      </button>
    </form>
  );
}
