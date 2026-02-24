/\*\*

- Architecture Guide and Best Practices
-
- ADDING NEW FEATURES:
-
- 1.  Define Entity in Domain Layer
- Location: src/domain/entities/
- Example: UserEntity
-
- 2.  Create Repository Interface
- Location: src/domain/repositories/
- Example: IUserRepository
- This defines the contract for data access
-
- 3.  Create Use Cases
- Location: src/application/usecases/
- Example: CreateUserUseCase, GetUserUseCase
-
- 4.  Create DTOs
- Location: src/application/dtos/
- Example: UserDTO, CreateUserDTO
-
- 5.  Create Mapper
- Location: src/application/mappers/
- Example: UserMapper
- Converts between entity and DTO
-
- 6.  Implement Repository
- Location: src/infrastructure/repositories/
- Example: MockUserRepository, ApiUserRepository
-
- 7.  Create ViewModel
- Location: src/presentation/viewmodels/
- Example: UserViewModel
- Coordinates use cases and manages UI state
-
- 8.  Create Screens/Components
- Location: src/presentation/screens/
- Use the ViewModel to handle business logic
-
- 9.  Register in Container
- Location: src/common/types/container.ts
- Register repository and viewmodel
-
- EXAMPLE IMPLEMENTATION:
- See sticker-\* files for complete example
-
- TESTING:
- - Mock repository implementations in src/infrastructure/repositories/
- - Test use cases independently
- - Test viewmodels with mocked repositories
- - Test screens with mocked viewmodels
    \*/

export const GETTING_STARTED = `
Getting Started with Hexagonal Architecture
=============================================

1. Review the structure: src/domain/, src/application/, src/infrastructure/, src/presentation/
2. Study the Sticker example: Complete CRUD implementation
3. Initialize services: Call initializeServices() in your app entry point
4. Use ViewModels in screens: const viewModel = resolve<StickerViewModel>('StickerViewModel')
5. Extend with new features following the pattern
   `;
