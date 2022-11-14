import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";
import zlib from "zlib";

import { Competitor } from "@modules/competitors/infra/typeorm/entities/Competitor";
import { ICompetitorsRepository } from "@modules/competitors/repositories/ICompetitorsRepository";
import { IFlowEventsRepository } from "@modules/competitors/repositories/IFlowEventsRepository";

interface IFlowEventsType {
  flow_event_id: string;
  competitor_id: string;
  event_date: Date;
  weekday: string;
  day_period: "morning" | "afternoon" | "night";
  competitor_info: Competitor;
}

@injectable()
class ImportFlowEventsUseCase {
  private competitors: Competitor[] = [];

  constructor(
    @inject("FlowEventsRepository")
    private flowEventsRepository: IFlowEventsRepository,
    @inject("CompetitorsRepository")
    private competitorsRepository: ICompetitorsRepository
  ) {}

  async loadFlowEvents(file: Express.Multer.File): Promise<IFlowEventsType[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const flowEvents: IFlowEventsType[] = [];

      const parseFile = parse({
        from_line: 2,
        delimiter: ",",
        trim: true,
      });

      stream.pipe(zlib.createGunzip()).pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [flow_event_id, event_date, competitor_id] = line;

          const alreadyExist = flowEvents.find(
            (item) => item.flow_event_id === flow_event_id
          );
          const competitor_info = this.competitors.find(
            (item) => item.competitor_id === competitor_id
          );

          if (!alreadyExist && competitor_info) {
            const date = new Date(event_date);

            const weekday = String(date.getDay());
            const hour = date.getHours();

            let day_period: "night" | "morning" | "afternoon";

            if (hour >= 0 && hour < 6) day_period = "night";
            if (hour >= 18 && hour < 24) day_period = "night";
            if (hour >= 6 && hour < 12) day_period = "morning";
            if (hour >= 12 && hour < 18) day_period = "afternoon";

            flowEvents.push({
              flow_event_id,
              competitor_id,
              event_date,
              weekday,
              day_period,
              competitor_info,
            });
          }
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
    const competitorsRepository =
      await this.competitorsRepository.getAllCompetitors();
    this.competitors.push(...competitorsRepository);
  }

  async handleCreateFlowEvents(flowEvents: IFlowEventsType[]): Promise<void> {
    if (flowEvents.length === 0) return;

    const flowEvent = flowEvents.shift();

    const competitor = await this.competitors.find(
      (item) => item.competitor_id === flowEvent.competitor_id
    );

    if (competitor) await this.flowEventsRepository.create({ ...flowEvent });

    return await this.handleCreateFlowEvents(flowEvents);
  }

  async execute(file: Express.Multer.File): Promise<void> {
    await this.loadCompetitors();
    const flowEvents = await this.loadFlowEvents(file);
    await this.handleCreateFlowEvents(flowEvents);
  }
}

export { ImportFlowEventsUseCase };
