import React from 'react';
import {
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap';
import styled from 'styled-components';
import {
  LinkContainer,
  PageHeading,
  Section,
  SectionIcon,
  makeSection,
} from 'flight-reactware';
import FontAwesome from 'react-fontawesome';

import CommunitySiteLink from '../elements/CommunitySiteLink';
// import ContextLink from '../elements/ContextLink';
import DocsSiteLink from '../elements/DocsSiteLink';

const sections = {
  whatIsIt: makeSection('What is Flight Access?', 'what-is-it', 'pink', 'question'),
  moreInfo: makeSection('Getting more information', 'more-information', 'blue', 'book'),
};

const CallToAction = styled(({ children, className, icon, to }) => {
  return (
    <LinkContainer 
      className={className}
      to={to}
    >
      <Button
        color="success"
        size="lg"
      >
        <FontAwesome
          fixedWidth
          name={icon}
        />
        {children}
      </Button>
    </LinkContainer>
  );
})`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const Home = () => {
  return (
    <div>
      <Container fluid>
        <PageHeading
          overview="This service has been developed to help you understand the
          performance characteristics of your High Performance Computing (HPC)
          clusters."
          sections={Object.values(sections)}
          title="Welcome to the Alces Flight Access."
        />
      </Container>
      <Container>
        <Section
          overview="The Alces Flight Access service allows you to view and
          compare the performance characteristics of your High Performance
          Computing (HPC) clusters."
          section={sections.whatIsIt}
          title="What is Alces Flight Access?"
        >
          <Row>
            <Col>
              <SectionIcon name="area-chart" />
              <h4>
                Which cluster is quietest?
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a
                libero sed odio fermentum fringilla ornare vel urna. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra,
                per inceptos himenaeos. Aenean bibendum gravida nunc, at
                tempus neque. Vestibulum vel purus sapien. Quisque eget elit
                efficitur, condimentum mauris id, facilisis leo. Duis aliquet
                facilisis mauris, quis imperdiet risus consequat sit amet.
                Nunc quis dolor ac urna pulvinar vestibulum sed eu dolor.
                Donec at laoreet neque. Interdum et malesuada fames ac ante
                ipsum primis in faucibus. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas.
              </p>
            </Col>
            <Col>
              <SectionIcon name="bar-chart" />
              <h4>
                Which days are quietest?
              </h4>
              <p>
                Nam odio lacus, pharetra sed nunc quis, pharetra varius elit.
                Nullam gravida eros metus, at volutpat dolor rutrum quis. Nam
                convallis velit et elit lacinia porta. Maecenas auctor
                pellentesque iaculis. Praesent commodo tempus euismod.
                Maecenas rutrum justo nibh, id accumsan leo tempor facilisis.
                Mauris rhoncus enim sit amet lorem interdum consectetur.
                Praesent sodales est facilisis, mollis sapien eu, tincidunt
                eros. Nunc ut massa tincidunt, commodo massa id, feugiat
                magna. Morbi pretium vehicula augue eu cursus. Ut non mauris
                sed est commodo tincidunt.  Nulla facilisi. Pellentesque
                rutrum porttitor feugiat. Morbi laoreet gravida varius.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <CallToAction
                icon="play-circle"
                to="/access"
              >
                View your clusters
              </CallToAction>
            </Col>
          </Row>
        </Section>
        <Section
          overview="Want to spend some time reading up on Alces Flight Compute
          prior to starting?"
          section={sections.moreInfo}
          title="Getting more information."
        >
          <p>
            We have a{' '}
            <DocsSiteLink>documentation site</DocsSiteLink> dedicated to the
            cause as well as a {' '}
            <CommunitySiteLink>Community Support Portal</CommunitySiteLink>
            {' '} available for you to join in and read through.
          </p>
          <p>
            Enjoy your flight!
          </p>
        </Section>
      </Container>
    </div>
  );
};

export default Home;
