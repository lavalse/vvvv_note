/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, shaderMaterial } from "@react-three/drei";

const ButtonExample = (props) => (
  <button
    {...props}
    style={{
      backgroundColor: 'white',
      border: 'solid red',
      borderRadius: 20,
      padding: 10,
      cursor: 'pointer',
      ...props.style,
    }}
  />
);

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ButtonExample,
  Canvas,
  extend,
  OrbitControls,
  shaderMaterial
};

export default ReactLiveScope;
