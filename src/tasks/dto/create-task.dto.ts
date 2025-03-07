import { taskStatus } from "../tasks.model";

export class CreateTaskDto {
    id:string;
    title:string;
    description: string;
    status: taskStatus;
}
