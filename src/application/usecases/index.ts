/**
 * Application Use Cases
 * Orchestrate domain objects and coordinate with repositories
 */

export abstract class UseCase<Input, Output> {
  abstract execute(input: Input): Promise<Output>;
}
