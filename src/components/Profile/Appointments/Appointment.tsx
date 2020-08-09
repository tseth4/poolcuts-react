import React from 'react';
import { Cut } from '../../../store/types/Cut';
import { User } from '../../../store/types/User';
import { FBUserAuthResponse } from '../../../store/types/FBUser';

interface AppointmentProps {
  bookId?: number;
  category?: string;
  cutId?: number | Cut;
  clientId?: number | User | FBUserAuthResponse;
}

type Props = AppointmentProps;

export const AppointmentComponent: React.FC<Props> = ({
  bookId,
  category,
  cutId,
  clientId
}: Props) => {
  return (
    <tr>
      <td>{category}</td>
      <td>{cutId}</td>
      <td>{cutId}</td>
      <td>{clientId}</td>
    </tr>
  )
}
