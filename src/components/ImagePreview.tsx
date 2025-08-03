import { Box } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';
import React from 'react';

function ImagePreview(props: BasePropertyProps) {
  const { record, property } = props;
  const port = process.env.PORT || 3000;

  return (
    <Box width="100%" maxWidth="400px" mx="auto">
      <img src={`http://localhost:${port}/images/${record.params.key}`} alt="preview" style={{ width: '100%' }} />
    </Box>
  );
}

export default ImagePreview;
