import kpiImage from './fsi.PNG';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const Home = () => {
  return (
    <div>
      <Row>
        <Col className="text-center">
          <div
            style={{
              color: 'warning',
              fontSize: '40px',
              fontWeight: 'bold',
              pointerEvents: 'none',
            }}
          >
            Définitions des indicateurs administratifs de la QoS Internet
          </div>
        </Col>
      </Row>

      <Card bg="dark" >
        <Card.Header
          style={{
            color:  'white',
            fontSize: '30px',
            fontWeight: 'bold',
            pointerEvents: 'none',
          }}
        >
          1. Indicateurs de mise en service
        </Card.Header>
        <Card  style={{  marginLeft: '20px', marginRight: '20px'  }} >
        <Row className="align-items-center my-3 " >
  <Col md={9} className="text-left">
    <h3>Délai de mise en service de l'accès Internet par le FSI:</h3>
    <h4>D mise en service FSI = (Date Confirmation – Date Validation Etude) + (Date MES FSI -
      Date MES OP)</h4>
  </Col>
  <Col md={3} className="text-end">
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={kpiImage}
        alt="Indicateur KPI1_1"
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          fontSize: '30px',
          fontWeight: 'bold',
          pointerEvents: 'none',
        }}
      >
        KPI1_1
      </div>
    </div>
  </Col>
</Row>
</Card>
<Card style={{ marginTop: "3vh", marginLeft: '20px', marginRight: '20px'  }} >
<Row className="align-items-center my-3">
          <Col md={2} className="text-left">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={kpiImage}
                alt="Indicateur KPI1_2"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'black',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                }}
              >
                KPI1_2
              </div>
            </div>
          </Col>
          <Col md={10}>
    <h3> Délai de mise en service de l’accès Internet par l’opérateur: </h3>
    <h4> D mise en service Opérateur = (Date Validation Etude – Date Dépôt) + (Date MES OP –Date Confirmation)</h4>
  </Col>
          </Row>
          </Card>
        <Card style={{ marginTop: "3vh", marginLeft: '20px', marginRight: '20px' , marginBottom: "2vh" }} >
        <Row className="align-items-center my-3">
        <Col Col md={10} className="text-left">
    <h3> Indisponibilité du service :</h3>
    <h4> D Indisponibilité du service = ΣId(n) + ΣIr(n) </h4>
    <h5> - Id(n) : durée d’indisponibilité de la connexion</h5>
    <h5> - Ir(n) : durée d’interruption de la connexion </h5>
  </Col>
          <Col Col md={2}className="text-end">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={kpiImage}
                alt="Indicateur KPI1_3"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'black',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                }}
              >
                KPI1_3
              </div>
            </div>
          </Col>
          </Row>
          </Card>
      </Card>

      <Card bg="dark" style={{ marginTop: "3vh" }} >
        <Card.Header
          style={{
            color:  'white',
            fontSize: '30px',
            fontWeight: 'bold',
            pointerEvents: 'none',
          }}
        >
          2. Indicateurs de dérangement
        </Card.Header>
        <Card  style={{ marginLeft: '20px', marginRight: '20px' }} >
        <Row className="align-items-center my-3">
          <Col md={3} className="text-left">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={kpiImage}
                alt="Indicateur KPI2_1"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'black',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                }}
              >
                KPI2_1
              </div>
            </div>
          </Col>
          <Col md={9} >
          <h3> Délai de réparation d'un dérangement:  </h3>
          <h4> D Réparation dérangement = T3-T2</h4>
          
          <h5>-T2 = Heure à partir de laquelle le service a été réparé</h5>
          <h5>-T3 = Heure de report du dérangement ordinaire  </h5>
  </Col>
       
          </Row>
          </Card>
        <Card  style={{ marginTop: "3vh", marginLeft: '20px', marginRight: '20px' }} >
        <Row className="align-items-center my-3">
        <Col md={10} className="text-left">
    <h3>Vitesse de relève de dérangements en moins de 24 heures: </h3>
    <h4>V24 = N24/ NT</h4>
    <h5>N24 : nombre de dérangements signalés relevés en moins de 24h</h5>
    <h5>NT : nombre total des dérangements signalés.</h5>
  </Col>
          <Col md={2} className="text-end">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={kpiImage}
                alt="Indicateur KPI2_2"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'black',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                }}
              >
                KPI2_2
              </div>
            </div>
          </Col>
          </Row>
          </Card>
        <Card  style={{ marginTop: "3vh", marginLeft: '20px', marginRight: '20px' }} >
        <Row className="align-items-center my-3">
          <Col md={2} className="text-left">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={kpiImage}
                alt="Indicateur KPI2_3"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'black',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                }}
              >
                KPI2_3
              </div>
            </div>
          </Col>
          <Col md={10} >
          <h3>Vitesse de relève de dérangements en moins de 48 heures: </h3>
    <h4>V48 = N48/ NT</h4>
    <h5>N48 : nombre de dérangements signalés relevés entre 24h et 48h    </h5>
          </Col>
          </Row>
          </Card>
        <Card  style={{ marginTop: "3vh", marginLeft: '20px', marginRight: '20px' }} >
        <Row className="align-items-center my-3">
        <Col md={10} className="text-left">

        <h3>Vitesse de relève de dérangements en moins de 72 heures: </h3>
    <h4>V72 = N72/ NT</h4>
    <h5>N72 : nombre de dérangements signalés relevés entre 48h et 72h    </h5>
  </Col>
          <Col md={2} className="text-end">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={kpiImage}
                alt="Indicateur KPI2_4"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'black',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                }}
              >
                KPI2_4
              </div>
            </div>
          </Col>
          </Row>
          </Card>
        <Card  style={{ marginTop: "3vh", marginLeft: '20px', marginRight: '20px' }} >
        <Row className="align-items-center my-3">
          <Col md={2}className="text-left">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={kpiImage}
                alt="Indicateur KPI2_5"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'black',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                }}
              >
                KPI2_5
              </div>
            </div>
          </Col>
          <Col md={10} >
          <h3>Vitesse de relève de dérangements dans plus que 72 heures </h3>
    <h4> V72 = N72/ NT</h4>
    <h5> nombre de dérangements signalés relevés après 72h </h5>
</Col>
          </Row>
          </Card>
        <Card  style={{ marginTop: "3vh", marginLeft: '20px', marginRight: '20px' , marginBottom: "2vh"}} >
        <Row className="align-items-center my-3">
        <Col md={9} className="text-left">
    <h4>Nombre Total de dérangements:</h4>
  </Col>
          <Col md={3}  className="text-end">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={kpiImage}
                alt="Indicateur KPI2_6"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'black',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                }}
              >
                KPI2_6
              </div>
            </div>
          </Col>
          </Row>
          </Card>
      </Card>
    </div>
  );
};

export default Home;



