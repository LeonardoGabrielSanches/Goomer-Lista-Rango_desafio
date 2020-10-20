import { differenceInMinutes, isBefore } from 'date-fns';

export default function validateDate(
  start_hour: string,
  end_hour: string,
): void {
  const [openingHour, openingMinutes] = start_hour.split(':');
  const [closingHour, closingMinutes] = end_hour.split(':');

  const parsedOpeningHour = new Date().setHours(
    Number.parseInt(openingHour, 10),
    Number.parseInt(openingMinutes, 10),
  );

  const parsedClosingHour = new Date().setHours(
    Number.parseInt(closingHour, 10),
    Number.parseInt(closingMinutes, 10),
  );

  const dateValid = isBefore(parsedOpeningHour, parsedClosingHour);

  if (!dateValid) throw new Error('O intervalo de horário deve ser válido');

  const totalMinutesOpen = differenceInMinutes(
    parsedClosingHour,
    parsedOpeningHour,
  );

  if (totalMinutesOpen < 15)
    throw new Error(
      'O intervalo entre os horários deve ser de, no mínimo, quinze minutos',
    );
}
