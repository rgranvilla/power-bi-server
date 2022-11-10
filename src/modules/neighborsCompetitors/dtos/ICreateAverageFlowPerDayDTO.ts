interface ICreateAverageFlowPerDayDTO {
  id?: string;
  competitor_info_average_flow_id: string;
  weekday: string;
  dayPeriod: "morning" | "afternoon" | "night";
}

export { ICreateAverageFlowPerDayDTO };
