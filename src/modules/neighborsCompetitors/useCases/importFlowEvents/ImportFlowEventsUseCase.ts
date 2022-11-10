import { parse } from "csv-parse";
import fs from "fs";
import { Transform } from "stream";
import { inject, injectable } from "tsyringe";
import zlib from "zlib";

import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";
import { IPopulationRepository } from "@modules/neighborhoods/repositories/IPopulationRepository";
import { ICreateAverageFlowDTO } from "@modules/neighborsCompetitors/dtos/ICreateAverageFlowDTO";
import { ICreateAverageFlowPerDayDTO } from "@modules/neighborsCompetitors/dtos/ICreateAverageFlowPerDayDTO";
import { ICreateCompetitorInfoDTO } from "@modules/neighborsCompetitors/dtos/ICreateCompetitorInfoDTO";
import { NeighborCompetitor } from "@modules/neighborsCompetitors/infra/typeorm/entities/NeighborCompetitor";
import { IAverageFlowPerDayRepository } from "@modules/neighborsCompetitors/repositories/IAverageFlowPerDayRepository";
import { IAverageFlowRepository } from "@modules/neighborsCompetitors/repositories/IAverageFlowRepository";
import { ICompetitorsInfosRepository } from "@modules/neighborsCompetitors/repositories/ICompetitorsInfosRepository";
import { IFlowEventsRepository } from "@modules/neighborsCompetitors/repositories/IFlowEventsRepository";
import { INeighborsCompetitorsRepository } from "@modules/neighborsCompetitors/repositories/INeighborsCompetitorsRepository";

interface IImportFlowEvent {
  id: string;
  event_date: Date;
  competitor_id: string;
}

@injectable()
class ImportFlowEventsUseCase {
  private competitors: NeighborCompetitor[] = [];

  constructor(
    @inject("FlowEventsRepository")
    private flowEventsRepository: IFlowEventsRepository,
    @inject("NeighborsCompetitorsRepository")
    private competitorsRepository: INeighborsCompetitorsRepository,
    @inject("CompetitorsInfosRepository")
    private competitorsInfosRepository: ICompetitorsInfosRepository,
    @inject("AverageFlowRepository")
    private averageFlowRepository: IAverageFlowRepository,
    @inject("AverageFlowPerDayRepository")
    private averageFlowPerDayRepository: IAverageFlowPerDayRepository,
    @inject("NeighborhoodsRepository")
    private neighborhoodsRepository: INeighborhoodsRepository,
    @inject("PopulationRepository")
    private populationRepository: IPopulationRepository
  ) {}

  async loadFlowEvents(file: Express.Multer.File): Promise<IImportFlowEvent[]> {
    return new Promise((resolve, reject) => {
      const getTransformStream = () => {
        const transform = new Transform({
          transform: (chunk, encoding, next) => {
            next(null, chunk);
          },
        });
        return transform;
      };

      const transform = getTransformStream();

      const stream = fs.createReadStream(file.path);
      const flowEvents: IImportFlowEvent[] = [];

      const parseFile = parse({
        from_line: 2,
        delimiter: ",",
        trim: true,
      });

      stream.pipe(zlib.createGunzip()).pipe(transform).pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [id, event_date, competitor_id] = line;

          flowEvents.push({
            id,
            event_date,
            competitor_id,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(flowEvents);
        })
        .on("error", (err) => {
          fs.promises.unlink(file.path);
          reject(err);
        });
    });
  }

  async loadCompetitors(): Promise<void> {
    const res = await this.competitorsRepository.getAllCompetitors();

    this.competitors.push(...res);
  }

  async isValidFlowEventDataToCreateNewFlowEvent(
    flowEvent: IImportFlowEvent
  ): Promise<boolean> {
    const hasId = !!flowEvent.id;
    const hasCompetitorId = !!flowEvent.competitor_id;
    const hasEventDate = !!flowEvent.event_date;

    const isValid = hasId && hasCompetitorId && hasEventDate;

    return isValid;
  }

  async createFlowEvent(flowEvent: IImportFlowEvent): Promise<void> {
    await this.flowEventsRepository.create({
      ...flowEvent,
    });
  }

  async createAverageFlowPerDay(
    averageFlowPerDay: ICreateAverageFlowPerDayDTO
  ): Promise<void> {
    await this.averageFlowPerDayRepository.create({
      ...averageFlowPerDay,
    });
  }

  async createAverageFlow(
    averageFlowReq: ICreateAverageFlowDTO
  ): Promise<string> {
    const average_flow_id = await this.averageFlowRepository.create({
      ...averageFlowReq,
    });

    return average_flow_id;
  }

  async createCompetitorInfo(
    competitor_info: ICreateCompetitorInfoDTO
  ): Promise<string> {
    const info_id = await this.competitorsInfosRepository.create({
      ...competitor_info,
    });

    return info_id;
  }

  async handleCreateCompetitorsInfos(flowEvent: IImportFlowEvent) {
    const { competitor_id, event_date } = flowEvent;

    const competitor = await this.competitorsRepository.findById(competitor_id);
    const { competitor_name, address, price_range, neighborhood_id } =
      competitor;

    const neighbor = await this.neighborhoodsRepository.findById(
      neighborhood_id
    );
    const { neighborhood, area } = neighbor;

    const population =
      await this.populationRepository.findPopulationByNeighborhoodId(
        neighborhood_id
      );

    const calculateDemographicDensity = population / area;
    const demographic_density = calculateDemographicDensity.toFixed(2);

    const date = new Date(event_date);

    const weekday = String(date.getDay());
    const hour = date.getHours();

    let dayPeriod: "night" | "morning" | "afternoon";

    if (hour >= 0 && hour < 6) dayPeriod = "night";
    if (hour >= 18 && hour < 24) dayPeriod = "night";
    if (hour >= 6 && hour < 12) dayPeriod = "morning";
    if (hour >= 12 && hour < 18) dayPeriod = "afternoon";

    const info_id = await this.createCompetitorInfo({
      address,
      competitor_id,
      competitor_name,
      demographic_density,
      neighborhood,
      population: String(population),
      price_range,
    });

    const average_flow_id = await this.createAverageFlow({
      competitor_info_id: info_id,
    });

    await this.createAverageFlowPerDay({
      competitor_info_average_flow_id: average_flow_id,
      weekday,
      dayPeriod,
    });
  }

  async hasCompetitorIdInCompetitorRepository(id: string): Promise<boolean> {
    const res = this.competitors.some((element) => element.id === id);

    return res;
  }

  async handleCreateFlowEvents(flowEvents: IImportFlowEvent[]): Promise<void> {
    if (flowEvents.length === 0) return;

    const flowEvent = flowEvents.shift();

    const isValidFlowEventData =
      await this.isValidFlowEventDataToCreateNewFlowEvent(flowEvent);

    if (!isValidFlowEventData)
      return await this.handleCreateFlowEvents(flowEvents);

    const competitorIdExist = await this.hasCompetitorIdInCompetitorRepository(
      flowEvent.competitor_id
    );

    if (!competitorIdExist)
      return await this.handleCreateFlowEvents(flowEvents);

    if (isValidFlowEventData && competitorIdExist) {
      await this.createFlowEvent(flowEvent);
      await this.handleCreateCompetitorsInfos(flowEvent);
    }

    return await this.handleCreateFlowEvents(flowEvents);
  }

  async execute(file: Express.Multer.File): Promise<void> {
    await this.loadCompetitors();
    const flowEvents = await this.loadFlowEvents(file);

    await this.handleCreateFlowEvents(flowEvents);
  }
}

export { ImportFlowEventsUseCase };
