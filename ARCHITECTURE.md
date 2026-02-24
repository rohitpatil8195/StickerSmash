/\*\*

- Hexagonal Architecture Overview
-
- This project implements the Hexagonal Architecture (Ports & Adapters) pattern.
-
- LAYERS:
-
- 1.  DOMAIN LAYER (src/domain/)
- - Core business logic and entities
- - Independent of frameworks and external services
- - Contains:
-      - Entities: Business objects (e.g., Sticker)
-      - Repositories: Interface/Port definitions for data access
-      - Exceptions: Domain-specific exceptions
-
- 2.  APPLICATION LAYER (src/application/)
- - Use cases and application services
- - Orchestrates domain logic
- - Contains:
-      - UseCases: Business workflows (e.g., CreateStickerUseCase)
-      - DTOs: Data transfer objects for layer communication
-      - Mappers: Convert between domain entities and DTOs
-
- 3.  INFRASTRUCTURE LAYER (src/infrastructure/)
- - External service implementations and adapters
- - Framework-specific code
- - Contains:
-      - Repositories: Concrete implementations (MockStickerRepository, ApiStickerRepository)
-      - External services: API clients, databases, etc.
-
- 4.  PRESENTATION LAYER (src/presentation/)
- - UI logic and components
- - Contains:
-      - ViewModels: Manage UI state and coordinate with use cases
-      - Screens: React components
-      - Navigation: Screen routing configuration
-
- 5.  COMMON LAYER (src/common/)
- - Shared utilities and cross-cutting concerns
- - Contains:
-      - Constants: Application constants
-      - Utils: Utility functions
-      - Types: Shared type definitions
-      - Errors: Common error handling
-
- DEPENDENCY FLOW:
- Presentation -> Application -> Domain
- Infrastructure implements Domain interfaces
-
- BENEFITS:
- - Testability: Easy to mock dependencies
- - Maintainability: Clear separation of concerns
- - Flexibility: Easy to swap implementations
- - Scalability: Easy to add new features
- - Framework independence: Core logic not tied to React Native
    \*/

export const ARCHITECTURE_DOC = `
Hexagonal Architecture Documentation
====================================

For detailed implementation, see the architecture files:

- src/domain/entities/
- src/domain/repositories/
- src/application/usecases/
- src/infrastructure/repositories/
- src/presentation/viewmodels/
- src/common/types/container.ts (Dependency Injection)
  `;
