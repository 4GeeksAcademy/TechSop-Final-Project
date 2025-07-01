import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';


const AboutUs = () => {
  return (
    <Container className="about-us my-5">
      <h1 className="text-center mb-5">Sobre TechShop</h1>
      
      <Row className="mb-5">
        <Col md={6}>
          <h2>Nuestra Historia</h2>
          <p>
            Fundada en 2015, TechZone comenzó como un pequeño local de electrónica en Barcelona. 
            Lo que empezó como una pasión por la tecnología se convirtió en uno de los e-commerce 
            líderes en electrónica en España. Hoy servimos a más de 500,000 clientes satisfechos 
            en toda Europa.
          </p>
        </Col>
        <Col md={6}>
          <img 
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03" 
            alt="Nuestra tienda original" 
            className="img-fluid rounded"
          />
        </Col>
      </Row>

      <Row className="mb-5 values-section">
        <h2 className="text-center mb-4">Nuestros Valores</h2>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 value-card">
            <Card.Body>
              <Card.Title>🔄 Innovación Constante</Card.Title>
              <Card.Text>
                Mantenemos nuestro catálogo actualizado con los últimos lanzamientos tecnológicos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 value-card">
            <Card.Body>
              <Card.Title>🤝 Transparencia</Card.Title>
              <Card.Text>
                Precios claros, especificaciones detalladas y reseñas reales de clientes.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 value-card">
            <Card.Body>
              <Card.Title>🚚 Servicio Impecable</Card.Title>
              <Card.Text>
                Envíos en 24h, garantía extendida y soporte técnico gratuito por 1 año.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="team-section">
        <h2 className="text-center mb-4">Conoce al Equipo</h2>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="team-card">
            <Card.Img variant="top" src="https://randomuser.me/api/portraits/women/45.jpg" />
            <Card.Body>
              <Card.Title>Laura Martínez</Card.Title>
              <Card.Subtitle>CEO & Fundadora</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="team-card">
            <Card.Img variant="top" src="https://randomuser.me/api/portraits/men/32.jpg" />
            <Card.Body>
              <Card.Title>Carlos Rodríguez</Card.Title>
              <Card.Subtitle>Director Tecnológico</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="team-card">
            <Card.Img variant="top" src="https://randomuser.me/api/portraits/women/68.jpg" />
            <Card.Body>
              <Card.Title>Sofía Chen</Card.Title>
              <Card.Subtitle>Jefa de Compras</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="team-card">
            <Card.Img variant="top" src="https://randomuser.me/api/portraits/men/75.jpg" />
            <Card.Body>
              <Card.Title>David González</Card.Title>
              <Card.Subtitle>Director de Atención al Cliente</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="text-center">
          <h3>¿Tienes preguntas?</h3>
          <p>Contáctanos en <a href="mailto:info@techshop.com">info@techzone.com</a> o llámanos al +34 912 345 678</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;