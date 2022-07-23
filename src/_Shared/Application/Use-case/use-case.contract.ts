
export interface UseCaseContract<Input, Output> {
    
    execute(input: Input):Output | Promise<Output>;
}