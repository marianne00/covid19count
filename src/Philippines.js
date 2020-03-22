import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classnames from 'classnames';

import CaseModal from './CaseModal'


export const Philippines = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [cases, setCases] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleModal = () =>  setModal(!modal);

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
  ? cases
  : cases.filter(v =>
      v.nationality.toLowerCase().includes(searchTerm.toLocaleLowerCase().trim()) ||
      v.status.toLowerCase().includes(searchTerm.toLocaleLowerCase().trim()) ||
      v.gender.toLowerCase().includes(searchTerm.toLocaleLowerCase().trim()) || 
      v.had_recent_travel_history_abroad.toLowerCase().includes(searchTerm.toLocaleLowerCase().trim()) ||
      v.hospital_admitted_to.toLowerCase().includes(searchTerm.toLocaleLowerCase().trim()) 
    )

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      const res = await axios.get("https://coronavirus-ph-api.now.sh/cases");
      setCases(res.data);
      setLoading(false);
    }

    setTimeout(() => {
      fetchCases();
    }, 1000);
  }, [])

  const HandleModal = (item) => {
    setTimeout(() => {
      setModalData(item);
      console.log(modalData);
      toggleModal();
    }, 100)

    console.log(modalData.case_no)
  }

  return (
    <div className="container">
      <h1 className="mt-5">Philippines</h1>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader>
          <div>
            Case no: PH {modalData.case_no}
          </div>
          <div
            className={classnames("status-badge", {
              "recover": modalData.status === 'Recovered',
              "died": modalData.status === 'Died',
              "admitted": modalData.status === 'Admitted',
            })}
          >{modalData.status}</div>
        
        </ModalHeader>
        <ModalBody>
          <p>Nationality: {modalData.nationality}</p>
          <p>Gender: {modalData.gender}</p>
          <p>Hospital admitted to: {modalData.hospital_admitted_to}</p>
          <p>Travel History From Abroad: {modalData.had_recent_travel_history_abroad}</p>
          <div className="other-info">
            <p>Other Info</p>
            <p>{modalData.other_information}</p>
          </div>
          <ModalFooter>
            <Button color="danger" onClick={toggleModal}>Close</Button>
          </ModalFooter>
        </ModalBody>
      </Modal> 

      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Cases
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Lockdowns
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
                className="search-bar"
              />
              {isLoading ? <p className="loading">Loading...</p> : 
              <div className="case-wrapper">
                <div className="top-row">
                  <div>Case/Age/Sex</div>
                  <div>Nationality</div>
                  <div>Status</div>
                  <div>Travel History</div>
                  {/* <div>Since</div> */}
                  <div>Actions</div>
                </div>
                { results ?
                  results.map((item, i) => {
                    return (
                      <div key={i} className="case-item">
                        <div>
                          <p> <span className="hide-desktop"> Case No: </span>Philippine {item.case_no}</p>  
                          <p><span className="hide-desktop">Gender/Age:&nbsp;
                          
                          </span>{item.gender} | {item.age} years old</p>
                        </div>
                        <div>
                          <p><span className="hide-desktop nationality">Nationality: </span> {item.nationality}</p>
                        </div>
                        <div
                          className={classnames("status-badge hide-mobile", {
                            "recover": item.status === 'Recovered',
                            "died": item.status === 'Died',
                            "admitted": item.status === 'Admitted',
                          })}
                        >
                          {item.status}
                        </div>
                        <div className={classnames('travel-history hide-mobile', {
                          "yes" : item.had_recent_travel_history_abroad === 'Yes',
                          "no": item.had_recent_travel_history_abroad === 'No'
                        })}> 
                          {item.had_recent_travel_history_abroad.toUpperCase()}
                        </div>
                        <div>
                          <Button color="primary" onClick={() => HandleModal(item)}>More Info</Button>
                        </div>
                      </div>
                    )
                  }) : ''
                }
              </div>
              }
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <h1 className="d-flex justify-content-center mt-5 mx-auto">Soon...</h1>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default Philippines