import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const TaskRouter = Router();

TaskRouter.post('/task', async (req, res) => {
    try {
        const { email, title, description, dueDate, dueTime } = req.body;

        
        const dateObj = new Date(dueDate);

        
        const [hours, minutes] = dueTime.split(':').map(Number);
        dateObj.setHours(hours, minutes, 0, 0); 

        const task = await prisma.task.create({
            data: {
                email,
                title,
                description,
                due_date: dateObj,
                completed: false
            }
        });

        res.status(201).json({ 
            message: 'Task created successfully',
            task 
        });
    } catch (error: any) {
        res.status(500).json({  
            message: 'Error creating task',
            error: error.message 
        });
    }
});

//@ts-expect-error
TaskRouter.get('/task', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ 
                message: 'Email is required' 
            });
        }

        const tasks = await prisma.task.findMany({
            where: { email: email as string },
        });
        res.status(200).json({ 
            message: 'Tasks fetched successfully',
            tasks 
        });
        
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Error fetching tasks',
            error: error.message 
        });
    }
});

export default TaskRouter;
