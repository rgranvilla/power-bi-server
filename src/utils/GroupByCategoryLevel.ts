import { Category } from "@modules/products/entities/Category";

function GroupByCategoryLevel(categories: Category[]) {
  const groupByCategoryLevel = new Array<Category[]>();

  const lastLevel = Math.max(
    ...categories.map(({ category_level }) => category_level)
  );

  for (let i = 0; i <= lastLevel; i += 1) {
    groupByCategoryLevel.push(
      categories.filter((category) => category.category_level === i)
    );
  }

  return groupByCategoryLevel;
}

export { GroupByCategoryLevel };
