import React, { ReactChild } from "react";

interface AccordionProps {
  children: ReactChild;
}

const Accordion: React.FC<AccordionProps> = (props: AccordionProps) => {
  return <div>{props.children}</div>;
};

export default Accordion;
