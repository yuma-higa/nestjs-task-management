import { Injectable } from '@nestjs/common';
import { Task,taskStatus } from './tasks.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/filter-task.dto';


@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }

    getFilteredDto(filterDto:filterTaskDto):Task[]{
        const {status,search} = filterDto;
        let tempArr:Task[] = this.getAllTasks();
        if(status){
            tempArr = this.tasks.filter((task)=> task.status === filterDto.status)
        }
        if(search){
            tempArr = this.tasks.filter((task)=> task.title.toLowerCase().includes(search)||task.description.toLowerCase().includes(search));
        }
        return tempArr;
    }
    createTask(createTaskDto:CreateTaskDto):Task{
        const {title,description} = createTaskDto;
        const tsk:Task = {
            id: uuid(),
            title,
            description,
            status:taskStatus.OPEN,
        }
        this.tasks.push(tsk);
        return tsk;
    }
    getTaskById(id:string):Task{
        return this.tasks.find((task) => task.id === id);
    }

    deleteTaskById(id:string):void{
     this.tasks = this.tasks.filter(task => task.id !== id);
    }

    changeTtlById(id:string,title:string,description:string):Task{
        
       const tskForTtldes =  this.getTaskById(id);
       tskForTtldes.title = title;
       tskForTtldes.description = description;
       return tskForTtldes;
    }

    changeStsById(id:string,status:taskStatus):Task{
        const tskForsts:Task = this.tasks.find((task)=>task.id === id);
        if(tskForsts){
            tskForsts.status = status;
        }
        return tskForsts;
    }
}
// {
//     "id": "9386b80f-3048-4283-90f5-d36fd8938307",
//     "title": {
//         "title": "anyon",
//         "description": "anyoanyo"
//     },
//     "description": {
//         "title": "anyon",
//         "description": "anyoanyo"
//     },
//     "status": "OPEN"
// }