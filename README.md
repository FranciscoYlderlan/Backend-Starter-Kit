<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">BACKEND-STARTER-KIT</h1>
</p>
<p align="center">
    <em>Prisma, NestJS, Zod.</em>
</p>
<p align="center">
	<!-- local repository, no metadata badges. -->
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff" alt="pnpm">
  <img src="https://img.shields.io/badge/Nest.js-%23E0234E.svg?logo=nestjs&logoColor=white" alt="NestJS">
	<img src="https://img.shields.io/badge/Vitest-6E9F18.svg?style=default&logo=Vitest&logoColor=white" alt="Vitest">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=default&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=default&logo=Prisma&logoColor=white" alt="Prisma">
	<img src="https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white" alt="Postgres">
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff" alt="Docker">
</p>

<br><!-- TABLE OF CONTENTS -->

<hr>

## Overview

The application being developed focuses on implementing core principles such as **Dependency Inversion**, **Dependency Injection**, and **Domain-Driven Design (DDD)**, along with **Clean Architecture**. Its primary goal is to deliver essential, pre-configured features to boost productivity and streamline the creation of CRUD applications.

Built on **NestJS** for the backend, the application includes foundational features like:

- **Database configuration**: Pre-built settings to quickly connect and set up databases.
- **Folder structure**: Organized layers separating the **core** and the **domain** from the **infrastructure** for a clear architectural approach.
- **Pre-established contracts**: Interfaces and contracts are defined, with pre-built methods that adhere to Clean Architecture standards.
- **Domain-Driven Design**: Separation of concerns between the domain logic and the infrastructure, ensuring that domain models remain isolated and reusable.

---

## Features

| File path                                                         | Description                                                                                                                                                                  |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/domain/users/enterprise/entities/user.ts`                    | Handles User entities for an Enterprise application, featuring properties like name, email, password, avatar, and timestamps, supporting creation and manipulation of users. |
| `src/domain/users/enterprise/entities/value-objects/unique-id.ts` | Generates unique identifiers for enterprise user records ensuring data consistency across the application.                                                                   |
| `src/domain/users/enterprise/entities/value-objects/slug.ts`      | Manages and normalizes clean URL slugs within the user management domain system of the backend starter kit project.                                                          |
| `src/domain/users/enterprise/entities/value-objects/slug.spec.ts` | Unit-tests the creation of user slugs in the Backend-Starter-Kit's application logic to ensure valid and consistent slug generation.                                         |
| `src/domain/users/application/use-cases/create-user.spec.ts`      | Unit-test for the `CreateUserUseCase` within the users domain, simulating execution and ensuring proper creation of new user instances.                                      |
| `src/domain/users/application/use-cases/create-user.ts`           | Creates new user accounts within the application by extending BaseUseCase, executing necessary logic using the UserRepository.                                               |
| `src/domain/users/application/repositories/user-repository.ts`    | Manages data persistence in users domain by utilizing the BaseRepository and providing basic structure for creating new user entities.                                       |
| `src/infra/env.ts`                                                | Defines environment variable structures using the zod library for robust handling of application configurations.                                                             |
| `src/infra/main.ts`                                               | Initializes the Backend-Starter-Kit's NestJS framework, bootstrapping it and enabling communication between connected clients.                                               |
| `src/infra/app.module.ts`                                         | Bootstraps the application by importing configuration, authentication, HTTP, and database modules in an organized manner.                                                    |
| `src/infra/http/controllers/authenticate.controller.ts`           | Handles user authentication through email and password using NestJS, Passport, Jwt, and Prisma.                                                                              |

---

## Repository Structure

```sh
└── Backend-Starter-Kit/
    ├── README.md
    ├── biome.json
    ├── docker-compose.yml
    ├── nest-cli.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── prisma
    │   ├── migrations
    │   └── schema.prisma
    ├── src
    │   ├── core
    │   ├── domain
    │   └── infra
    ├── tsconfig.build.json
    ├── tsconfig.json
    └── vitest.config.mts
```

---

## Modules

<details closed><summary>.</summary>

| File                                       | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [tsconfig.json](tsconfig.json)             | In this TypeScript project, the `tsconfig.json` file meticulously configures the compiler to produce an ES2021 output, ensuring seamless compatibility and scalability for our back-end application. By setting up paths and types correctly, it facilitates efficient development by providing syntactic sugar like decorators and declarations. This configuration allows us to strike a balance between code readability, testability, and maintainability, creating an optimal foundation for our projects growth within the Backend-Starter-Kit ecosystem.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [docker-compose.yml](docker-compose.yml)   | Initializes PostgreSQL service within the Backend-Starter-Kit architecture, ensuring database availability for the entire system by setting up and managing the starter-kit container on port 5432. Data storage occurs in the local volume /data/postgres, maintaining persistence of the starter-kit database.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [biome.json](biome.json)                   | Configures BiomeJS development environment for the Backend-Starter-Kit repository by setting up version control systems, organizing imports, enforcing linting and formatting rules, and handling parsing and formatting for both JavaScript and JSON files in this project.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [package.json](package.json)               | This project sets up a robust backend environment using NestJS, leveraging Prisma for ORM needs and BiomeJS for a unified configuration system. Key scripts enable building, testing, formatting, and deployment, with popular dependencies like JWT, Passport, and Zod in the toolkit. A ready-to-run Docker environment is also included for smooth scaling.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [tsconfig.build.json](tsconfig.build.json) | This file (`tsconfig.build.json`) extends and customizes base settings from `tsconfig.json`, ensuring exclusion of specific directories like `node_modules`, tests, and generated `dist` folders during builds, thus facilitating efficient project scaling.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [vitest.config.mts](vitest.config.mts)     | The `vitest.config.mts` configuration file within our Backend-Starter-Kit enables robust testing for our codebase, ensuring high quality and reliability across functions. It optimizes Vites vitest integration by customizing testing configurations to seamlessly validate our backend application.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [nest-cli.json](nest-cli.json)             | This `nest-cli.json` file initiates the Backend-Starter-Kit, setting up its NestJS environment for efficient and modern microservices development. The file maps essential configuration details to trigger the projects initial creation and compilation with NestJS schematics from the root `src` folder, focusing on the infrastructure layer (`infra/main`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [pnpm-lock.yaml](pnpm-lock.yaml)           | In the Backend-Starter-Kit repository, youll find a well-structured framework for building efficient server-side applications. The code file under scrutiny is the `docker-compose.yml`, which manages and coordinates the deployment of multi-container Docker applications in a single network.This essential component orchestrates services like the web application, database, and other external dependencies (e.g., Redis caching or RabbitMQ messaging), ensuring seamless collaboration between them. By facilitating automated configuration, this file expedites deployment and simplifies maintenance in production environments, thereby providing a robust foundation for your backend projects.Moreover, it references critical artifacts such as `biome.json`-which contains configuration settings and best practices for the application-and `package.json`, which defines the projects dependencies and scripts, thus ensuring reproducibility and consistent performance across different development environments. Lastly, the file utilizes Prisma, a powerful tool for database tools (schemas, migrations, etc.) that helps maintain clean and future-proof data access layer in your backend architecture. |

</details>

<details closed><summary>prisma</summary>

| File                                  | Summary                                                                                                                                                                                                                                                                                           |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [schema.prisma](prisma/schema.prisma) | It defines data structures for User entities like ID, name, email, avatar, and password fields. Utilizes PostgreSQL as the datasource, dynamically pulling the DATABASE_URL from environment variables. Optimizes serverless/edge functions compatibility to ensure scalability and fast queries. |

</details>

<details closed><summary>prisma.migrations</summary>

| File                                                         | Summary                                                                                                                                                                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [migration_lock.toml](prisma/migrations/migration_lock.toml) | Manages database schema lock across PostgreSQL migrations. Ensures data integrity within Prismas version-control system (Git), facilitating seamless updates in the Backend-Starter-Kit repository structure. |

</details>

<details closed><summary>prisma.migrations.20240905220205_model_example</summary>

| File                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [migration.sql](prisma/migrations/20240905220205_model_example/migration.sql) | In the Backend-Starter-Kit repository, this SQL migration script (`prisma/migrations/20240905220205_model_example/migration.sql`) sets up a Users table, complete with primary key and email uniqueness, within our database schema (`prisma/schema.prisma`). This structure empowers user-centric functionality by storing essential User data like ID, name, email, avatar, password, timestamps for creation and last update, and enforces a unique email policy. |

</details>

<details closed><summary>src.core.types</summary>

| File                                      | Summary                                                                                                                                                                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [optional.ts](src/core/types/optional.ts) | In this open-source Backend-Starter-Kit project, the `optional.ts` file within the core types defines a reusable function-like type for handling optional properties in data structures across the application, promoting clean and robust coding practices. |

</details>

<details closed><summary>src.core.entities</summary>

| File                                               | Summary                                                                                                                                                                                                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [base-entity.ts](src/core/entities/base-entity.ts) | Empowers a Backend Starter Kit by defining a base entity structure across multiple application domains, promoting reusability and streamlining data persistence through abstracted unique identifiers for robust data management within the repository. |

</details>

<details closed><summary>src.core.entities.value-objects</summary>

| File                                                                         | Summary                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [base-value-object.ts](src/core/entities/value-objects/base-value-object.ts) | Implement a versatile abstraction for user-defined value objects across the Backend-Starter-Kits architecture. The `base-value-object.ts` file offers a foundation, encapsulating properties and enabling transformation via an abstract class. Subclasses are expected to implement their specific transform' methods for consistent data handling. |

</details>

<details closed><summary>src.core.use-cases</summary>

| File                                                    | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [base-use-case.ts](src/core/use-cases/base-use-case.ts) | In this Backend-Starter-Kit, a generic BaseUseCase abstract class is implemented (src/core/use-cases/base-use-case.ts) as the foundation for defining custom business logic operations, decoupling use cases from external details and promoting a clean, modular architecture. It simplifies operation execution across the application by providing a centralized structure to manage Input-Output transformations, fostering reusability and code readability. |

</details>

<details closed><summary>src.core.repositories</summary>

| File                                                           | Summary                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [base-repository.ts](src/core/repositories/base-repository.ts) | Provides a base abstract repository interface (`src/core/repositories/base-repository.ts`) to manage CRUD operations for various entities within the application. Key features include index, show, create, update, and delete methods with type definitions for input and output parameters, offering flexible data handling across repositories. |

</details>

<details closed><summary>src.domain.users.enterprise.entities</summary>

| File                                                    | Summary                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [user.ts](src/domain/users/enterprise/entities/user.ts) | Manages User entities for an Enterprise application, encompassing core properties such as name, slug (derived from the name), email, avatar, password, and timestamps. Provides methods to create and manipulate users with id support. Embodies an extensible structure to cater for future features. |

</details>

<details closed><summary>src.domain.users.enterprise.entities.value-objects</summary>

| File                                                                            | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [unique-id.ts](src/domain/users/enterprise/entities/value-objects/unique-id.ts) | Generates unique identifiers for enterprise user records, ensuring data integrity and consistency within the applications user management domain. Uses built-in `randomUUID` function to create new identifiers if none is provided or an existing one has been duplicated. Part of a modular architecture in our backend starter kit, leveraging base value object class for consistent handling of value objects across domains and services. |
| [slug.ts](src/domain/users/enterprise/entities/value-objects/slug.ts)           | In our Backend-Starter-Kit project, the `src/domain/users/enterprise/entities/value-objects/slug.ts` file introduces a utility for managing clean URL slugs within the applications user management system. By normalizing, trimming, replacing special characters and spaces with hyphens, this code ensures that generated slugs are consistent and easy to read.                                                                             |
| [slug.spec.ts](src/domain/users/enterprise/entities/value-objects/slug.spec.ts) | Manages user enterprise slug creation in Backend-Starter-Kits application logic. The provided code file ensures valid slugs are generated from text input for seamless data handling within the domain layer.                                                                                                                                                                                                                                   |

</details>

<details closed><summary>src.domain.users.application.use-cases</summary>

| File                                                                              | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [create-user.spec.ts](src/domain/users/application/use-cases/create-user.spec.ts) | This file unit-tests the `CreateUserUseCase` in the user domain, simulating its execution with mock data to create a new user instance. The test verifies that the created user object possesses a defined ID and relevant properties, including name, email, avatar, password, and slug.                                                                                                                                                                                                                                         |
| [create-user.ts](src/domain/users/application/use-cases/create-user.ts)           | In our Backend-Starter-Kit, the create-user use case is defined in src/domain/users/application/use-cases/create-user.ts. This module enables creating new user accounts within the application by extending the BaseUseCase class and implementing the execute method. The use of dependency injection ensures that the UserRepository for persistence is utilized seamlessly. This streamlined process enhances our application's ability to handle user creation effectively while keeping code structure clean and organized. |

</details>

<details closed><summary>src.domain.users.application.repositories</summary>

| File                                                                               | Summary                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [user-repository.ts](src/domain/users/application/repositories/user-repository.ts) | Manages user data persistence in the Backend-Starter-Kit application by extending an existing base repository class for efficient data interaction within the users domain. Abstract `UserRepository` provides a basic structure for creating new user entities. |

</details>

<details closed><summary>src.infra</summary>

| File                                     | Summary                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [env.ts](src/infra/env.ts)               | In the Backend-Starter-Kit repository, this Env.ts file acts as an entry point for application environment variables by defining their structures and types using the `zod` library. This facilitates robust handling of necessary configurations, including the DATABASE_URL, JWT keys, and server port.                                                                                                                |
| [main.ts](src/infra/main.ts)             | The `src/infra/main.ts` file serves as the entry point for the application in this Backend-Starter-Kit repository, setting up and bootstrapping the NestJS framework based on the provided configuration. By listening to the specified PORT, it enables communication between the backend server and connected clients, thereby making it operational within its broader architecture.                                  |
| [app.module.ts](src/infra/app.module.ts) | This code initiates the application in the Backend-Starter-Kit by setting up and organizing its modules (Auth, Http, Database, etc.). The AppModule acts as an entry point for the system, orchestrating imports of configuration, authentication, database, and HTTP functionality. The CreateUserController is integrated to manage user registration, tying together different application layers in a seamless flow. |

</details>

<details closed><summary>src.infra.auth</summary>

| File                                            | Summary                                                                                                                                                                                                        |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [auth.module.ts](src/infra/auth/auth.module.ts) | Authenticates user sessions in the Backend-Starter-Kit by integrating Passport, Jwt, and configurable authentication settings via NestJS modules, ensuring secure and flexible authentication functionalities. |

</details>

<details closed><summary>src.infra.http</summary>

| File                                            | Summary                                                                                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [http.module.ts](src/infra/http/http.module.ts) | Authenticate and CreateUser. The module relies on database integration via DatabaseModule to perform persistence operations. |

</details>

<details closed><summary>src.infra.http.controllers</summary>

| File                                                                                | Summary                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [authenticate.controller.ts](src/infra/http/controllers/authenticate.controller.ts) | Manages user authentication via email and password for application sessions. Implemented using NestJS, Bcrypt for secure comparison, JWT for token creation, and Prisma to interact with the database. It validates input data against a Zod schema, ensuring correct structure for authentication requests.                                                                                 |
| [create-user.controller.ts](src/infra/http/controllers/create-user.controller.ts)   | In this open-source Backend-Starter-Kit, a NestJS controller resides at `src/infra/http/controllers/create-user.controller.ts`. This file accepts POST requests at the endpoint /post, validates them using Zod schema, and stores the received data in a Prisma database instance. By providing an easy-to-use API endpoint for data creation, it enhances the application's interactivity. |

</details>

<details closed><summary>src.infra.http.pipes</summary>

| File                                                                  | Summary                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [zod-validation-pipe.ts](src/infra/http/pipes/zod-validation-pipe.ts) | Validates incoming HTTP requests against defined Zod schemas within the backend starter kit, ensuring data consistency across layers and preventing potential errors at the service level by catching validation issues early and returning appropriate error responses to clients. |

</details>

<details closed><summary>src.infra.database</summary>

| File                                                        | Summary                                                                                                                                                                                                      |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [database.module.ts](src/infra/database/database.module.ts) | The `DatabaseModule` in the Backend-Starter-Kits infrastructure layer enables the Prisma Service, ensuring seamless and exportable access to databases for efficient data management within the application. |

</details>

<details closed><summary>src.infra.database.prisma</summary>

| File                                                             | Summary                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [prisma.service.ts](src/infra/database/prisma/prisma.service.ts) | Connects and manages the Prisma database connection within the Backend-Starter-Kit, initializing it upon application startup and disconnecting when the module is destroyed, ensuring seamless interaction with the data storage layer in the nested architecture. |

</details>

---

### Installation

<h4>From <code>source</code></h4>

> 1. Clone the Backend-Starter-Kit repository:
>
> ```console
> $ git clone ../Backend-Starter-Kit
> ```
>
> 2. Change to the project directory:
>
> ```console
> $ cd Backend-Starter-Kit
> ```
>
> 3. Install the dependencies:
>
> ```console
> $ pnpm i
> ```

### Usage

<h4>From <code>source</code></h4>

> Run Backend-Starter-Kit using the command below:
>
> ```console
> $ pnpm start:dev
> ```

### Tests

> Run the test suite using the command below:
>
> ```console
> $ pnpm test
> ```

---

## Project Roadmap

- [x] `► BSK-2`
- [x] `► BSK-5`
- [ ] `► BSK-6`

---

## Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://local/Backend-Starter-Kit/issues)**: Submit bugs found or log feature requests for the `Backend-Starter-Kit` project.
- **[Submit Pull Requests](https://local/Backend-Starter-Kit/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://local/Backend-Starter-Kit/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your local account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone ../Backend-Starter-Kit
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to local**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://local{/Backend-Starter-Kit/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Backend-Starter-Kit">
   </a>
</p>
</details>

---

## License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-overview)

---
