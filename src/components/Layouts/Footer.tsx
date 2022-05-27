import { Row, Col } from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer bg-white">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1 text-medical"
              href=""
              rel="noopener noreferrer"
              target="_blank"
            >
             Médico Aqui
            </a>
          </div>
        </Col>
      </Row>
    </footer>
  );
}