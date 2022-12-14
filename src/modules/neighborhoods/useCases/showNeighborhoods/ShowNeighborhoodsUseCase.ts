import { inject, injectable } from "tsyringe";

import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";
import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";

@injectable()
class ShowNeighborhoodsUseCase {
  constructor(
    @inject("NeighborhoodsRepository")
    private neiborhoodsRepository: INeighborhoodsRepository
  ) {}

  async execute({ page, take, orderDirection }): Promise<Neighborhood[]> {
    const neighborhoods =
      await this.neiborhoodsRepository.getPaginateNeighborhoods({
        page,
        take,
        orderDirection,
      });
    return neighborhoods;
  }
}

export { ShowNeighborhoodsUseCase };
