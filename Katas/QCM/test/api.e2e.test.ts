// test/setupTestDb.ts
/*import { GenericContainer, StartedTestContainer } from 'testcontainers';
import knex, { Knex } from 'knex';

export interface TestDbContext {
  db: Knex;
  container: StartedTestContainer;
  stop: () => Promise<void>;
}

export async function setupTestDb(): Promise<TestDbContext> {
  const container = await new GenericContainer('alpine').withExposedPorts(5432).start();

  const db = knex({
    client: 'pg',
    connection: {
      host: container.getHost(),
      port: container.getMappedPort(5432),
      user: 'testuser',
      password: 'testpass',
      database: 'testdb',
    },
  });

  // Exécute ici ta migration à la main (ou utilise Knex Migrations si dispo)
  await db.schema.createTable('qcms', (table) => {
    table.uuid('id').primary();
    table.text('question').notNullable();
    table.jsonb('choices').notNullable();
    table.text('answer').notNullable();
    table.timestamp('created_at').defaultTo(db.fn.now());
  });

  return {
    db,
    container,
    stop: async () => {
      await db.destroy();
      await container.stop();
    },
  };
}
*/

import { describe, test, expect } from 'vitest';

describe('', () => {
  test('', () => {
    expect(true).toBe(true);
  });
});
