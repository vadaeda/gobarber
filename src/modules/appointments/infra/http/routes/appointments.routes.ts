import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();
  const createAppointmentRepository = new CreateAppointmentService(
    appointmentsRepository,
  );
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const appointment = await createAppointmentRepository.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
