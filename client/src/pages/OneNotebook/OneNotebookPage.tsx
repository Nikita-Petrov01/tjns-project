import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getAllNotesByNotebookId } from '../../entities/note/model/noteThunks';
import { Link, useParams } from 'react-router';
import NoteCard from '../../entities/note/ui/NoteCard/NoteCard';

function OneNotebookPage(): React.JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notes);

  useEffect(() => {
    void dispatch(getAllNotesByNotebookId(Number(id)));
  }, [dispatch]);
  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {notes.map((note) => (
          <Col key={note.id} className="d-flex">
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
      <Link to={`/notebook/${String(id)}/add`}>Страница добавления</Link>
    </Container>
  );
}

export default OneNotebookPage;
