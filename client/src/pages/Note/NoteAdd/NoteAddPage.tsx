import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch } from '../../../shared/lib/hooks';
import { newNoteSchema } from '../../../entities/note/model/schema';
import { useNavigate, useParams } from 'react-router';
import { createNote } from '../../../entities/note/model/noteThunks';

function NoteAddPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const resultData = { ...data, notebookId: Number(id) };
    const validatedData = newNoteSchema.parse(resultData);

    void dispatch(createNote(validatedData));
    navigate(`/notebook/${validatedData.notebookId}`);
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Название</Form.Label>
        <Form.Control name="title" placeholder="title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Содержание</Form.Label>
        <Form.Control name="content" placeholder="content" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default NoteAddPage;
