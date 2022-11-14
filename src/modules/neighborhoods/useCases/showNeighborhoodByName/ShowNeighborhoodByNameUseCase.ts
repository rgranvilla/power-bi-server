import { inject, injectable } from "tsyringe";

import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";
import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";

@injectable()
class ShowNeighborhoodByNameUseCase {
  constructor(
    @inject("NeighborhoodsRepository")
    private neiborhoodsRepository: INeighborhoodsRepository
  ) {}

  async execute({ name, city, state }): Promise<Neighborhood> {
    const neighborhoods = await this.neiborhoodsRepository.findNeighborhood({
      name,
      city,
      state,
    });

    return neighborhoods;
  }
}

export { ShowNeighborhoodByNameUseCase };
