import { openConnection } from "./connectionTest";
import { seedCategories, seedRootCategory } from "./seedCategories";
import { seedAdminEmployee } from "./seedEmployee";

async function createCategoriesTestConnection(): Promise<void> {
  const connection = await openConnection();

  await seedAdminEmployee(connection);

  await seedRootCategory(connection);

  await seedCategories(connection);
}

export { createCategoriesTestConnection };
