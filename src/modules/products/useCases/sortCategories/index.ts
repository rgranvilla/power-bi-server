import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { GroupByIndentationController } from "./GroupByIndentation/GroupByIndentationController";
import { GroupByIndentationUseCase } from "./GroupByIndentation/GroupByIndentationUseCase";

export default (): GroupByIndentationController => {
  const categoriesRepository = new CategoriesRepository();

  const groupByIndentationUseCase = new GroupByIndentationUseCase(
    categoriesRepository
  );
  const groupByIndentationController = new GroupByIndentationController(
    groupByIndentationUseCase
  );

  return groupByIndentationController;
};
