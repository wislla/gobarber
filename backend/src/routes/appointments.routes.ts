import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
// import CreateAppointmentService from '../services/CreateAppointmentService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

//appointmentsRouter.use(ensureAuthenticated);

// Rota GET
appointmentsRouter.get('/', async (request, response) => {

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

// Rota POST
appointmentsRouter.post('/', async (request, response) => {

    try {

        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
        date: parsedDate,
        provider,
        });

        return response.json(appointment);
        
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }

});

export default appointmentsRouter;