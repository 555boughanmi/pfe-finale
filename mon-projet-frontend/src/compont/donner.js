
import React, { useState } from "react";
import { Form, Button, Card, Dropdown, Col, Row, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import folderImage from './fsi.PNG';
import kpiImage from './kpi.PNG'; 

const SearchForm = ({ userId }) => {
  const [mois, setMois] = useState("");
  const [annee, setAnnee] = useState("");
  const [donnee, setDonnee] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChangeMois = (value) => setMois(value);
  const handleChangeDonnee = (value) => setDonnee(value);
  ///////////
  const handleChangeAnnee = (value) => {
    const year = parseInt(value, 10);
    if (!isNaN(year) && year >= 2000 && year <= 2200) {
      setAnnee(year);
      setError(null); // Réinitialiser l'erreur
    } else {
      setAnnee("");
      setError("Veuillez saisir une année valide (entre 2000 et 2100).");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const urlMap = {
        "WF TT": "http://localhost:4972/searchTable",
        "CRM": "http://localhost:4972/searchTable2",
        "Dimelo": "http://localhost:4972/searchTable3",
        "CUIC": "http://localhost:4972/searchTable4"
      };

      const url = urlMap[donnee];
      if (!url) {
        setError("Type de donnée non reconnu");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(url, { userId, mois, annee });

      if (!response.data || response.data.length === 0) {
        setError("Aucune donnée trouvée pour les critères sélectionnés.");
        setResults([]);
      } else {
        setResults(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setError("Une erreur est survenue lors de la recherche. Veuillez réessayer.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlesuprimé = async (event) => {
    event.preventDefault();
    setError("");
    setIsDeleting(true);

    try {
      const urlMap = {
        "WF TT": "http://localhost:4972/searchTable",
        "CRM": "http://localhost:4972/searchTable2",
        "Dimelo": "http://localhost:4972/searchTable3",
        "CUIC": "http://localhost:4972/searchTable4"
      };

      const url = urlMap[donnee];
      if (!url) {
        setError("Type de donnée non reconnu");
        return;
      }

      await axios.delete(url, { data: { userId, mois, annee } });
      setResults([]);
      setError("Données supprimées avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      setError("Une erreur est survenue lors de la suppression. Veuillez réessayer.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReset = () => {
    setMois("");
    setDonnee("");
    setAnnee("");
    setResults([]);
    setError("");
  };

  const renderTableRows = () => {
    return results.map((result, index) => {
      switch (donnee) {
        case "WF TT":
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.RefDemande}</td>
              <td>{result.Etat}</td>
              <td>{result.DateDepot}</td>
              <td>{result.DateValidation}</td>
              <td>{result.DateConfirmation}</td>
              <td>{result.DateMES}</td>
              <td>{result.DateEtat}</td>
              <td>{result.TypeClient}</td>
              <td>{result.TypeOffre}</td>
              <td>{result.MoisDepot}</td>
              <td>{result.PwC1}</td>
              <td>{result.PwC2}</td>
            </tr>
          );
        case "CRM":
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.id_contrat}</td>
              <td>{result.date_ouverture}</td>
              <td>{result.date_cloture}</td>
              <td>{result.type_offre}</td>
              <td>{result.type_client}</td>
              <td>{result.etat_ticket}</td>
              <td>{result.sujet}</td>
              <td>{result.type_incident}</td>
              <td>{result.indisponibilite}</td>
              <td>{result.derangement}</td>
              <td>{result.facturation}</td>
              <td>{result.internet_fixe}</td>
              <td>{result.id_client}</td>
            </tr>
          );
        case "Dimelo":
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.created_at}</td>
              <td>{result.mois_pwc}</td>
              <td>{result.duree_pwc}</td>
              <td>{result.last_user_reply_at}</td>
              <td>{result.categories}</td>
              <td>{result.mapping_pwc}</td>
              <td>{result.closed}</td>
            </tr>
          );
        case "CUIC":
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.node_session_sequence}</td>
              <td>{result.call_start_time}</td>
              <td>{result.queue_time}</td>
              <td>{result.ring_time}</td>
              <td>{result.talk_time}</td>
              <td>{result.type_client}</td>
              <td>{result.type_offre}</td>
              <td>{result.mois_pwc}</td>
              <td>{result.pwc_3_4}</td>
              <td>{result.pwc_3_5}</td>
            </tr>
          );
        default:
          return null;
      }
    });
  };

  const renderTable = () => {
    if (results.length === 0) return null;

    return (
      <Table striped bordered hover size="sm" className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            {donnee === "WF TT" && (
              <>
                <th>RefDemande</th>
                <th>Etat</th>
                <th>DateDepot</th>
                <th>DateValidation</th>
                <th>DateConfirmation</th>
                <th>DateMES</th>
                <th>DateEtat</th>
                <th>TypeClient</th>
                <th>TypeOffre</th>
                <th>MoisDepot</th>
                <th>PwC1</th>
                <th>PwC2</th>
              </>
            )}
            {donnee === "CRM" && (
              <>
                <th>id_contrat</th>
                <th>date_ouverture</th>
                <th>date_cloture</th>
                <th>type_offre</th>
                <th>type_client</th>
                <th>etat_ticket</th>
                <th>sujet</th>
                <th>type_incident</th>
                <th>indisponibilite</th>
                <th>derangement</th>
                <th>facturation</th>
                <th>internet_fixe</th>
                <th>id_client</th>
              </>
            )}
            {donnee === "Dimelo" && (
              <>
                <th>created_at</th>
                <th>mois_pwc</th>
                <th>duree_pwc</th>
                <th>last_user_reply_at</th>
                <th>categories</th>
                <th>mapping_pwc</th>
                <th>closed</th>
              </>
            )}
            {donnee === "CUIC" && (
              <>
                <th>node_session_sequence</th>
                <th>call_start_time</th>
                <th>queue_time</th>
                <th>ring_time</th>
                <th>talk_time</th>
                <th>type_client</th>
                <th>type_offre</th>
                <th>mois_pwc</th>
                <th>pwc_3_4</th>
                <th>pwc_3_5</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
    );
  };

  return (
    <div style={{ marginLeft: "100px" }}>
      <Form onSubmit={handleSubmit}>
        <Row>
        <Col>
            <Card style={{ width: "22rem", marginBottom: "20px" }}>
              <Card.Img src={folderImage} alt="KPI Image" style={{ maxHeight: "150px" }} />
              <Card.ImgOverlay>
                <Card.Title>Type des données :</Card.Title>
                <Dropdown onSelect={handleChangeDonnee}>
                  <Dropdown.Toggle variant="dark">
                    {donnee ? donnee : "Sélectionner"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {["WF TT", "CRM", "Dimelo", "CUIC"].map((don) => (
                      <Dropdown.Item key={don} eventKey={don}>
                        {don}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Card.Text>Sélectionnez le type de données à afficher.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "22rem", marginBottom: "20px" }}>
              <Card.Img src={kpiImage} alt="KPI Image" style={{ maxHeight: "150px" }} />
              <Card.ImgOverlay>
                <Card.Title>Mois :</Card.Title>
                <Dropdown onSelect={handleChangeMois}>
                  <Dropdown.Toggle variant="dark">
                    {mois ? mois : "Sélectionner"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {[...Array(12).keys()].map((month) => (
                      <Dropdown.Item
                        key={month + 1}
                        eventKey={(month + 1).toString()}
                      >
                        {new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(new Date(2000, month))}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Card.Text>Sélectionnez un mois à afficher.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: "22rem", marginBottom: "20px" }}>
           
              <Card.Img  src={folderImage} alt="Folder Image" style={{ maxHeight: "150px" }} />
              <Card.ImgOverlay>
                <Card.Title>Année :</Card.Title>
                       <Form.Control
                        type="number"
                        placeholder="Saisir l'année"
                        value={annee}
                        onChange={(e) => handleChangeAnnee(e.target.value)}
                        min="2000"
                        max="2200"
                      />
                <Card.Text>Sélectionnez l'année à afficher.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        
        </Row>

        <Row className="justify-content-end">
        <Col sm={{ span: 10, offset: 2 }}>
            <Button
              type="submit"
              variant="warning"
              disabled={!mois || !annee || !donnee || isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Recherche en cours...</span>
                </>
              ) : (
                "Rechercher"
              )}
            </Button>{" "}
            <Button variant="secondary" onClick={handleReset}>
              Réinitialiser
            </Button>
            <Button
              style={{ backgroundColor: "#dd5d10", borderColor: "#fc740f" }} 

              onClick={handlesuprimé}
              disabled={!mois || !annee || !donnee || isDeleting}
            >
              {isDeleting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Suppression en cours...</span>
                </>
              ) : (
                "Supprimer"
              )}
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {renderTable()}
    </div>
  );
};

export default SearchForm; // Optimisation des performances