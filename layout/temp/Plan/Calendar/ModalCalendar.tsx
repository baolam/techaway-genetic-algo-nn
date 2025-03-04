import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppDispatch, useAppSelector } from '@Hooks/redux.hook';
import { PlanItem, refreshEvent, selectSlot } from './CalendarStore';
import { createEvent, deleteEvent } from './CalendarAPI';
import {
  showSpecificDays,
  convertSpecificDays,
  buildTime,
  buildDay,
} from '@Utils/time.utils';

interface EventDefinitionProps {
  id: string;
  title: string;
  description: string | undefined;
  setTitle: Function;
  setDescription: Function;
}
const EventDefinition: React.FC<EventDefinitionProps> = ({
  id,
  title,
  description,
  setTitle,
  setDescription,
}) => {
  return (
    <>
      <Form.Group className="me-auto" controlId="id">
        <Form.Label>Id sự kiện</Form.Label>
        <Form.Control type="text" disabled readOnly placeholder={id} />
      </Form.Group>
      <Form.Group className="me-auto" controlId="title">
        <Form.Label>Tiêu đề</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Text className="text-muted">Tên sự kiện của kế hoạch</Form.Text>
      </Form.Group>
      <Form.Group className="me-auto" controlId="description">
        <Form.Label>Ghi chú</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
    </>
  );
};

interface EventPropertyProps {
  timeInDay: string;
  isRepeatable: string;
  specificDays: string;
  setTimeInDay: Function;
  setIsRepeatable: Function;
  setSpecificDays: Function;
}
const EventProperty: React.FC<EventPropertyProps> = ({
  timeInDay,
  isRepeatable,
  specificDays,
  setTimeInDay,
  setIsRepeatable,
  setSpecificDays,
}) => {
  return (
    <>
      <Form.Group className="me-auto" controlId="timeInDay">
        <Form.Label>Thời gian thực thi</Form.Label>
        <Form.Control
          type="time"
          name="timeInDay"
          value={timeInDay}
          onChange={(e) => setTimeInDay(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="me-auto" controlId="isRepeatable">
        <Form.Label>Tính chất sự kiện</Form.Label>
        <Form.Select
          name="isRepeatable"
          value={isRepeatable}
          onChange={(e) => setIsRepeatable(e.target.value)}
        >
          <option value={'1'}>Lặp lại</option>
          <option value={'0'}>Một lần</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="me-auto" controlId="specificDays">
        <Form.Label>Ngày lặp lại sự kiện</Form.Label>
        <Form.Control
          type="text"
          placeholder={'Có thể bỏ trống'}
          value={specificDays}
          onChange={(e) => {
            setSpecificDays(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          Viết theo cấu trúc ngày/tháng/năm, ngày/tháng/năm
        </Form.Text>
      </Form.Group>
    </>
  );
};

const ModalCalendar = () => {
  const dispatch = useAppDispatch();
  const slotInfo = useAppSelector((state) => state.plan.slotSelected);
  const callbacks = useAppSelector((state) => state.plan.callbacks);

  const hasEvent = slotInfo?.id !== undefined;
  // Phần quản lí
  const totalPages = 2;
  const [page, setPage] = useState(1);

  const onPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const onNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Phần thông tin của sự kiện
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [timeInDay, setTimeInDay] = useState('');
  const [isRepeatable, setIsRepeatable] = useState('1');
  const [specificDays, setSpecificDays] = useState<string>('');
  const [description, setDescription] = useState<string | undefined>('');

  useEffect(() => {
    if (slotInfo === null) return;
    setId(slotInfo.id);
    setTitle(slotInfo.title === undefined ? '' : slotInfo.title);
    setTimeInDay(
      slotInfo.timeInDay === undefined
        ? buildTime(slotInfo.slots[0])
        : slotInfo.timeInDay
    );
    setIsRepeatable(slotInfo.isRepeatable ? '1' : '0');
    if (hasEvent) setSpecificDays(showSpecificDays(slotInfo.specificDays));
    else {
      let _specificDays = slotInfo.slots.map((slot) => buildDay(slot));
      _specificDays = _specificDays.filter(
        (val, idx) => _specificDays.indexOf(val) === idx
      );
      setSpecificDays(showSpecificDays(_specificDays));
    }
    setDescription(slotInfo.description);
  }, [slotInfo, hasEvent]);

  const __getInfo = (): PlanItem => {
    let _specificDays = convertSpecificDays(specificDays);
    return {
      id,
      title,
      timeInDay,
      description,
      specificDays: typeof _specificDays === 'boolean' ? [] : _specificDays,
      isRepeatable: isRepeatable === '1' ? true : false,
      callbacks: callbacks.map((callback) => callback.function_name),
    };
  };

  const onCloseModal = () => {
    setId('');
    setTitle('');
    setTimeInDay('');
    setIsRepeatable('1');
    setSpecificDays('');
    setDescription('');
    dispatch(selectSlot(null));
  };

  const onCreateEvent = () => {
    let event = __getInfo();
    createEvent(event)
      .then((msg) => {
        console.log(msg);
        onCloseModal();
        dispatch(refreshEvent());
      })
      .catch((err) => console.log(err));
  };

  const onDeleteEvent = () => {
    deleteEvent(id)
      .then((msg) => {
        console.log(msg);
        onCloseModal();
        dispatch(refreshEvent());
      })
      .catch((err) => console.log(err));
  };

  const onUpdateEvent = () => {
    let event = __getInfo();
    console.log(event);
  };

  return (
    <Modal
      show={slotInfo !== null}
      onHide={onCloseModal}
      dialogClassName="modal-90w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm/Sửa/Xóa kế hoạch</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ minHeight: 300 }}>
          {page === 1 && (
            <EventDefinition
              title={title}
              id={id}
              description={description}
              setTitle={setTitle}
              setDescription={setDescription}
            />
          )}
          {page === 2 && (
            <EventProperty
              timeInDay={timeInDay}
              isRepeatable={isRepeatable}
              specificDays={specificDays}
              setTimeInDay={setTimeInDay}
              setIsRepeatable={setIsRepeatable}
              setSpecificDays={setSpecificDays}
            />
          )}
          {/* {page === 3 && <AssignNotificationForEvent />} */}
        </Form>
        <hr />
        <Row>
          <Col xs={2} className="d-grid gap-2">
            <Button
              onClick={onPrevPage}
              variant="outline-success"
              disabled={page === 1}
            >
              {'<'}
            </Button>
          </Col>
          <Col>
            <h6 className="text-center" style={{ color: 'red' }}>
              {page}/{totalPages}
            </h6>
          </Col>
          <Col xs={2} className="d-grid gap-2">
            <Button
              onClick={onNextPage}
              variant="outline-success"
              disabled={page === totalPages}
            >
              {'>'}
            </Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-success"
          onClick={onCreateEvent}
          disabled={hasEvent}
        >
          Tạo
        </Button>
        <Button
          variant="outline-primary"
          onClick={onUpdateEvent}
          disabled={!hasEvent}
        >
          Sửa
        </Button>
        <Button
          variant="outline-warning"
          onClick={onDeleteEvent}
          disabled={!hasEvent}
        >
          Xóa
        </Button>
        <Button variant="danger" onClick={onCloseModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCalendar;
