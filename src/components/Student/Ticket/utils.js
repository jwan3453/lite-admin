import * as TICKET_STATUS from '../../../common/ticketStatus';

export const getEmptyTicket = () => ({
  id: -1,
  subject: '',
  user: {
    id: -1,
    nickname: '',
  },
  assignee: {
    id: '',
    nickname: '',
  },
  ctime: '',
  status: TICKET_STATUS.CREATED,
  type: null,
});

