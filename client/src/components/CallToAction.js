import FontAwesome from 'react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { LinkContainer } from 'flight-reactware';

const CallToAction = styled(({ children, className, icon, to, ...buttonProps }) => {
  return (
    <LinkContainer 
      className={className}
      to={to}
    >
      <Button
        color="success"
        size="lg"
        {...buttonProps}
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

export default CallToAction;
