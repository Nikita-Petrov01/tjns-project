import React, { use } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { useNavigate, useParams } from 'react-router';
import { noteSchema } from '../../../entities/note/model/schema';
import { updateNote } from '../../../entities/note/model/noteThunks';

function NoteUpdate(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { notebookid, id } = useParams();
  const notes = useAppSelector((state) => state.notes.notes);
  const navigate = useNavigate();

  const note = notes.find((note) => note.id === Number(id));

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const resultData = { ...data, id: Number(id), notebookId: Number(notebookid) };
    console.log(resultData, 'resultData');
    const validatedData = noteSchema.parse(resultData);
    console.log(validatedData, 'validatedData');
    void dispatch(updateNote(validatedData));
    navigate(`/notebook/${validatedData.notebookId}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Название</Form.Label>
        <Form.Control defaultValue={note?.title} name="title" placeholder="title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Содержание</Form.Label>
        <Form.Control defaultValue={note?.content} name="content" placeholder="content" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default NoteUpdate;
