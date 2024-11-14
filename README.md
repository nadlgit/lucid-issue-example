# Example project to reproduce Lucid issue

Quick example project to reproduce the issue with Lucid fixed by [this PR](https://github.com/adonisjs/lucid/pull/1065).

## Setup

1. Clone the repo and install dependencies.
2. Run migrations: `node ace migration:run`. It will create a `myschema` schema and 2 tables in this schema: `users` and `auth_access_tokens`.
3. Run seeders: `node ace db:seed`. It will create 2 users in the `users` table.

## Issues

- Run `node ace db:truncate`.

  => Although a success message is shown, the tables are not truncated.

- Run the fake test: `node ace test`. After creating a user and an access token, this test tries to truncate the tables and then drop them.

  => Either truncate or drop fails with the following errors:

```
error: TRUNCATE "auth_access_tokens"; - relation "auth_access_tokens" does not exist

error: DROP TABLE "auth_access_tokens", "users" CASCADE; - table "auth_access_tokens" does not exist
```
