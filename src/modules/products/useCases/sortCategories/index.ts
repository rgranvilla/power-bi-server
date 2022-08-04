import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { GroupByIndentationController } from "./GroupByIndentation/GroupByIndentationController";
import { GroupByIndentationUseCase } from "./GroupByIndentation/GroupByIndentationUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const groupByIndentationUseCase = new GroupByIndentationUseCase(
  categoriesRepository
);
const groupByIndentationController = new GroupByIndentationController(
  groupByIndentationUseCase
);

export { groupByIndentationController, groupByIndentationUseCase };
