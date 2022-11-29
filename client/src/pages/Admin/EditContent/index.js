import { useState, useEffect } from 'react';
import { Sections } from '../../../api-calls';
import { message } from 'antd';
import { useAdminOrg } from '../../../context/admin-org';

import {
  Typography as T,
  Grid,
  ButtonsSection,
  Button,
} from '../../../components';
import { navRoutes } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const { Col, Row } = Grid;

const EditContent = () => {
  const [buttons, setButtons] = useState([]);
  const navigate = useNavigate();

  const { adminOrg } = useAdminOrg();

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const hideMessage = message.loading('Loading...');
      const { data, error } = await Sections.getSections({
        uniqueSlug: adminOrg.uniqueSlug,
        forPublic: true,
      });
      if (mounted) {
        if (error) {
          message.error('Something went wrong, please try again later');
        } else {
          setButtons(data.map((item) => ({ ...item, id: item.id.toString() })));
        }
        hideMessage();
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, [adminOrg.uniqueSlug]);

  const handleHide = (item) => {
    setButtons((old) =>
      old.map((elm) =>
        elm.id === item.id ? { ...elm, hidden: !elm?.hidden } : elm
      )
    );
  };

  const handleEdit = (item) => {
    navigate(navRoutes.ADMIN.EDIT_SECTION.replace('id', item.id));
  };

  const handleSaveChange = () => {
    // send the updates to backend (order, and hide/show status)
    const orderedItems = buttons.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
  };

  return (
    <>
      <Row mb="6">
        <Col w={[4, 12, 8]}>
          <T.H1>Add/update content</T.H1>
        </Col>
      </Row>
      <Row mb="5">
        <Col w={[4, 12, 8]}>
          <T.P color="neutralDark">
            Drag the sections to reorder the content that your clients see or
            click you can hide any sections that isn't relevant to your
            organisation.
          </T.P>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 8]}>
          <ButtonsSection
            setButtons={setButtons}
            buttons={buttons}
            handleHide={handleHide}
            handleEdit={handleEdit}
            m="2"
          />
        </Col>
      </Row>
      <Row mb="6" mt="5">
        <Col w={[4, 10, 5]}>
          <Button variant="secondary" to={navRoutes.ADMIN.ADD_NEW_SECTION}>
            Add new section
          </Button>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 10, 5]}>
          <Button handleClick={handleSaveChange}>Save changes</Button>
        </Col>
      </Row>
    </>
  );
};

export default EditContent;
