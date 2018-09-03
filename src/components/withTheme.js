/**
 * Copyright (c) 2017
 *
 * @author Mattia Panzeri <mattia.panzeri93@gmail.com>
 * 
 */

import React, { Component } from 'react'

export default ({ primaryColor, primaryDarkColor, accentColor }) =>
  BaseComponent =>
    class WithTheme extends Component {
      constructor() {
        super()
        
        this.theme = {
          primary: primaryColor,
          primaryDark: primaryDarkColor,
          accent: accentColor
        }
      }

      render() {
        return (
          <BaseComponent theme={this.theme} />
        )
      }
    }