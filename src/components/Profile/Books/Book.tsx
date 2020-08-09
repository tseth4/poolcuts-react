import React from 'react';
import { Cut } from '../../../store/types/Cut';
import { FBUserAuthResponse } from '../../../store/types/FBUser';
import { User } from '../../../store/types/User';

interface BookProps {
  bookId?: number;
  category?: string;
  cutId?: number | Cut;
  clientId?: number | User | FBUserAuthResponse;
}

type Props = BookProps;

export const BookComponent: React.FC<Props> = ({
  cutId,
  category,
  bookId,
  clientId,
}: Props) => {
  return (
    <React.Fragment>
      <tr>
        <td>{bookId}</td>
        <td>{category}</td>
        <td>{cutId}</td>
        <td>{clientId}</td>
      </tr>
    </React.Fragment>
  )
}
