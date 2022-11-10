import { ICreateAverageFlowPerDayDTO } from "../dtos/ICreateAverageFlowPerDayDTO";
import { AverageFlowPerDay } from "../infra/typeorm/entities/AverageFlowPerDay";

interface IAverageFlowPerDayRepository {
  create({
    id,
    competitor_info_average_flow_id,
    weekday,
    dayPeriod,
  }: ICreateAverageFlowPerDayDTO): Promise<AverageFlowPerDay>;
  findById(id: string): Promise<AverageFlowPerDay>;
}

export { IAverageFlowPerDayRepository };
