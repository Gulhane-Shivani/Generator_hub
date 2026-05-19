import React from 'react';
import * as Icons from 'react-icons/fa';

const ToolIcon = ({ name, className = '' }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    return <Icons.FaQuestionCircle className={className} />;
  }
  return <IconComponent className={className} />;
};

export default ToolIcon;
