import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { markFinish, MarkTodoState, setOpenModalState } from './EventStore';
import { useAppDispatch, useAppSelector } from '@Hooks/redux.hook';
import { createTodo } from './EventAPI';

const EventModal = () => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [mark, setMark] = React.useState('');

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.todo.openAddModal);

  const onHideModal = () => {
    dispatch(setOpenModalState(false));
  };

  const onCreateTodo = () => {
    let infor = {
      title,
      description,
      mark,
    };

    createTodo(infor)
      .then((msg) => {
        setTitle('');
        setDescription('');
        setMark('');
        dispatch(markFinish());
      })
      .catch((err) => {
        console.log(err);
      });
      
    onHideModal();
  };

  return (
    <Modal show={isOpen} onHide={onHideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thêm sự kiện</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ minHeight: 300 }}>
          <Form.Group>
            <Form.Label>Tên sự kiện</Form.Label>
            <Form.Control
              id="title"
              type="input"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Loại sự kiện</Form.Label>
            <Form.Select
              id="mark"
              value={mark}
              onChange={(e) => setMark(e.target.value)}
            >
              <option value={''}>Chưa chọn</option>
              <option value={MarkTodoState.NORMAL}>Bình thường</option>
              <option value={MarkTodoState.IMPORTANT}>Quan trọng</option>
              <option value={MarkTodoState.EMERGENCY}>Khẩn cấp</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control
              id="description"
              as="textarea"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={''}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={onCreateTodo}>
          Tạo
        </Button>
        <Button variant="outline-primary" onClick={onHideModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
