import { Category } from "@modules/products/infra/typeorm/entities/Category";

function groupByCategoryLevel(categories: Category[]) {
  const grouped = new Array<Category[]>();

  const lastLevel = Math.max(
    ...categories.map(({ category_level }) => category_level)
  );

  for (let i = 0; i <= lastLevel; i += 1) {
    grouped.push(
      categories.filter((category) => category.category_level === i)
    );
  }

  return grouped;
}

export { groupByCategoryLevel };
