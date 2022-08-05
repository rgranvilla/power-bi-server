import { Category } from "../modules/products/entities/Category";

function GroupByIndentation(categories: Category[]) {
  const groupByIndentation = new Array<Category[]>();

  const lastLevel = Math.max(
    ...categories.map(({ indentation }) => indentation)
  );

  for (let i = 0; i <= lastLevel; i += 1) {
    groupByIndentation.push(
      categories.filter((category) => category.indentation === i)
    );
  }

  return groupByIndentation;
}

export { GroupByIndentation };
