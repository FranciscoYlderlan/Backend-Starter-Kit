interface UseCaseRequest {}
interface UseCaseResponse {}

export abstract class BaseUseCase<
  Request extends UseCaseRequest,
  Response extends UseCaseResponse,
> {
  public abstract execute(params: Request): Promise<Response>;
}
