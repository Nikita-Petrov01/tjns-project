import React, { useEffect } from 'react';
import SignUpAdminModal from '../../shared/ui/signUpAdminModal/SignUpAdminModal';
import { getAdmin } from '../../entities/user/model/userThunks';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { Container, Table } from 'react-bootstrap';

export default function SuperAdminPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const admins = useAppSelector((state) => state.user.admin);

  useEffect(() => {
    void dispatch(getAdmin());
  }, [dispatch]);

  return (
    <>
      <SignUpAdminModal />
      <h3>Администраторы</h3>
      <Container>
        {admins.map((admin) => (
          <li key={admin.id}>{admin.name}</li>
        ))}
      </Container>
    </>
  );
}
