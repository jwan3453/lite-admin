import * as TICKET_STATUS from '../../../common/ticketStatus';

export const getEmptyTicket = () => ({
  studentId: -1,
  type: '',
  status: TICKET_STATUS.UNRESOLVED,
});

